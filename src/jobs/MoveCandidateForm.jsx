import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Divider,
    Box,
    Avatar
} from "@mui/material";

const rejectionTypes = ["R1 Rejected", "R2 Rejected", "Client Rejected"];

const MoveCandidateForm = ({ open, onClose, candidate, onMoveComplete }) => {
    const [newStage, setNewStage] = useState("");
    const [stageOptions, setStageOptions] = useState([]);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [rejectionType, setRejectionType] = useState("");
    const [rejectionReason, setRejectionReason] = useState("");
    const [showRejectionReason, setShowRejectionReason] = useState(false);

    useEffect(() => {
        const fetchStageOptions = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/stages/options");
                if (!response.ok) {
                    throw new Error("Failed to fetch stage options");
                }
                const data = await response.json();
                setStageOptions(data);
            } catch (err) {
                console.error("Error fetching stage options:", err);
                // Fallback to default options if API fails
                setStageOptions([
                    "Sourced",
                    "Screening",
                    "Interview",
                    "Preboarding",
                    "Hired",
                    "Rejected",
                    "Archived"
                ]);
            }
        };
        fetchStageOptions();
    }, []);

    useEffect(() => {
        if (candidate) {
            setNewStage(typeof candidate.stage === 'object' ? candidate.stage._id : candidate.stage || "");
        }
    }, [candidate]);

    const handleSubmit = async () => {
        if (!candidate?._id) {
            setError("Candidate ID is missing.");
            return;
        }

        if (newStage === "Rejected" && (!rejectionType || (showRejectionReason && !rejectionReason))) {
            setError("Please select rejection type" + (showRejectionReason ? " and provide a reason" : ""));
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`http://localhost:8000/api/candidates/${candidate._id}/stage`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    stage: newStage,
                    comment,
                    ...(newStage === "Rejected" && {
                        rejectionType,
                        ...(showRejectionReason && { rejectionReason })
                    })
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to move candidate.");
            }
            const result = await response.json();

            if (onMoveComplete) {
                onMoveComplete(result.candidate);
            }

            onClose();
            // Reset form
            setRejectionType("");
            setRejectionReason("");
            setComment("");
            setShowRejectionReason(false);
        } catch (err) {
            console.error(err);
            setError("Something went wrong while moving the candidate.");
        } finally {
            setLoading(false);
        }
    };

    if (!candidate) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Move Candidate</DialogTitle>
            <DialogContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
                        {candidate.firstName?.charAt(0)}
                    </Avatar>
                    <Typography variant="h6">
                        {`${candidate.firstName} ${candidate.middleName || ''} ${candidate.lastName}`}
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" sx={{ mb: 1 }}>Current Stage</Typography>
                <TextField
                    value={typeof candidate.stage === 'object' ? candidate.stage.name : candidate.stage || "Sourced"}
                    fullWidth
                    margin="normal"
                    disabled
                    sx={{ mb: 3 }}
                />

                <Typography variant="subtitle2" sx={{ mb: 1 }}>Select New Stage</Typography>
                <FormControl fullWidth margin="normal">
                    <InputLabel>New Stage</InputLabel>
                    <Select
                        value={newStage}
                        onChange={(e) => {
                            setNewStage(e.target.value);
                            if (e.target.value !== "Rejected") {
                                setRejectionType("");
                                setRejectionReason("");
                                setShowRejectionReason(false);
                            }
                        }}
                        label="New Stage"
                    >
                        {stageOptions.map((option, index) => (
                            <MenuItem key={index} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {newStage === "Rejected" && (
                    <>
                        <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
                            Rejection Type
                        </Typography>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Rejection Type</InputLabel>
                            <Select
                                value={rejectionType}
                                onChange={(e) => setRejectionType(e.target.value)}
                                label="Rejection Type"
                            >
                                {rejectionTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {!showRejectionReason ? (
                            <Button
                                variant="outlined"
                                onClick={() => setShowRejectionReason(true)}
                                sx={{ mt: 2 }}
                            >
                                + Add Reason
                            </Button>
                        ) : (
                            <>
                                <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                                    Reason for Rejection
                                </Typography>
                                <TextField
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    fullWidth
                                    multiline
                                    rows={3}
                                    margin="normal"
                                    placeholder="Enter reason for rejection..."
                                />
                                <Button
                                    variant="text"
                                    color="error"
                                    onClick={() => {
                                        setShowRejectionReason(false);
                                        setRejectionReason("");
                                    }}
                                    sx={{
                                        mt: 1,
                                        textTransform: "none",
                                        p: "2px 8px",
                                        minWidth: 0,
                                        border: "1px solid",
                                        borderColor: "error.main",
                                        borderRadius: "4px"
                                    }}
                                >
                                    Cancel
                                </Button>


                            </>
                        )}

                    </>
                )}

                <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
                    Comment {newStage !== "Rejected" && "(Optional)"}
                </Typography>
                <TextField
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    fullWidth
                    multiline
                    rows={3}
                    margin="normal"
                    placeholder="Add comment about this stage change..."
                />

                {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={loading || !newStage ||
                        (newStage === "Rejected" && (
                            !rejectionType ||
                            (showRejectionReason && !rejectionReason)
                        ))
                    }
                >
                    {loading ? "Moving..." : "Move"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MoveCandidateForm;