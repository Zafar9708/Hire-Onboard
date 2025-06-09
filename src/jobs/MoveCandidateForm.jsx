

import React, { useState } from "react";
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

const MoveCandidateForm = ({ open, onClose, candidate, onMoveComplete }) => {
    const [newStage, setNewStage] = useState(candidate?.stage || "");
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (!candidate?._id) {
            setError("Candidate ID is missing.");
            return;
        }
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`https://hire-onboardbackend-13.onrender.com/api/stages/${candidate._id}/move`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    newStage,
                    comment,
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

                <Typography variant="subtitle2" sx={{ mb: 1 }}>From</Typography>
                <TextField
                    value={candidate.stage}
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
                        onChange={(e) => setNewStage(e.target.value)}
                        label="New Stage"
                    >
                        <MenuItem value="Sourced">Move to Sourced</MenuItem>
                        <MenuItem value="Screening">Move to Screening</MenuItem>
                        <MenuItem value="Interview">Move to Interview</MenuItem>
                        <MenuItem value="Preboarding">Move to Preboarding</MenuItem>
                        <MenuItem value="Hired">Move to Hired</MenuItem>
                        <MenuItem value="Archived">Move to Archived</MenuItem>
                    </Select>
                </FormControl>

                <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>Comment (Optional)</Typography>
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
                    disabled={!newStage || loading}
                >
                    {loading ? "Moving..." : "Move"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MoveCandidateForm;
