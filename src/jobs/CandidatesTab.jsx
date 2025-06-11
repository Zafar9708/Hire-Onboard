



import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    ToggleButton,
    ToggleButtonGroup,
    Avatar,
    TextField,
    Chip,
    Dialog,
    Menu,
    ListItemIcon,
    ListItemText,
    CircularProgress,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
    Snackbar,
    Alert
} from "@mui/material";
import {
    ViewModule as CardViewIcon,
    ViewHeadline as TableViewIcon,
    Add as AddIcon,
    FilterList as FilterIcon,
    MoreVert as MoreIcon,
    AssignmentInd as InterviewIcon,
    ArrowForward as StageIcon,
    NoteAdd as RemarksIcon,
    Email as EmailIcon,
} from "@mui/icons-material";
import AddCandidateForm from "./AddCandidateForm";
import ScheduleOnlineInterviewForm from "../Interviews/ScheduleOnlineInterviewForm";
import ScheduleOfflineInterviewForm from "../Interviews/ScheduleOfflineInterviewForm";
import MoveCandidateForm from "./MoveCandidateForm";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CandidateDetailsPage from "../candidates/CandidateDetailsDialog";
import {
    fetchCandidates,
    createCandidate,
    updateCandidate,
    deleteCandidate,
    sendBulkEmails,
    fetchCandidatesByJob,
} from "../utils/api";

const CandidatesTab = () => {
     const loacation = useLocation()
    const {id}= useParams()
    const [viewMode, setViewMode] = useState("card");
    const [selectedCandidates, setSelectedCandidates] = useState([]);
    const [openAddCandidate, setOpenAddCandidate] = useState(false);
    const [interviewAnchorEl, setInterviewAnchorEl] = useState(null);
    const [stageAnchorEl, setStageAnchorEl] = useState(null);
    const [remarksAnchorEl, setRemarksAnchorEl] = useState(null);
    const [currentCandidate, setCurrentCandidate] = useState(null);
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showInterviewModal, setShowInterviewModal] = useState(false);
    const [interviewType, setInterviewType] = useState(null);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [linkOrLocation, setLinkOrLocation] = useState("");
    const [showMoveForm, setShowMoveForm] = useState(false);
    const [moveCandidate, setMoveCandidate] = useState(null);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [remarksDialogOpen, setRemarksDialogOpen] = useState(false);
    const [remarksText, setRemarksText] = useState('');
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });
    const [bulkMoveDialogOpen, setBulkMoveDialogOpen] = useState(false);
    const [newStage, setNewStage] = useState('');
    const [emailDialogOpen, setEmailDialogOpen] = useState(false);
    const [emailSubject, setEmailSubject] = useState('');
    const [emailBody, setEmailBody] = useState('');
    const [isSendingEmail, setIsSendingEmail] = useState(false);

    // Filter state
    const [filters, setFilters] = useState({
        source: '',
        experience: '',
        availableToJoin: '',
        status: '',
        searchQuery: ''
    });

    const navigate = useNavigate();

    // Fetch candidates from API
    useEffect(() => {
        const loadCandidates = async () => {
            try {
                setLoading(true);
                if (id) {
                    const data = await fetchCandidatesByJob(id);
                    setCandidates(data);
                }
                else{

                    const data = await fetchCandidates();
                    setCandidates(data);
                }
            } catch (err) {
                setError(err.message);
                showSnackbar(err.message, "error");
            } finally {
                setLoading(false);
            }
        };
        loadCandidates();
    }, []);

    // Filter candidates based on filter criteria
    const getFilteredCandidates = () => {
        return candidates.filter(candidate => {
            // Source filter
            if (filters.source && candidate.source !== filters.source) {
                return false;
            }
            
            // Experience filter
            if (filters.experience) {
                const [min, max] = filters.experience.split('-').map(Number);
                const candidateExp = parseFloat(candidate.experience);
                
                if (filters.experience === '5+' && candidateExp < 5) {
                    return false;
                }
                if (max && (candidateExp < min || candidateExp > max)) {
                    return false;
                }
            }
            
            // Available to join filter
            if (filters.availableToJoin && candidate.availableToJoin > parseInt(filters.availableToJoin)) {
                return false;
            }
            
            // Status filter
            if (filters.status && candidate.stage.toLowerCase() !== filters.status.toLowerCase()) {
                return false;
            }
            
            // Search query filter
            if (filters.searchQuery) {
                const query = filters.searchQuery.toLowerCase();
                const candidateText = [
                    candidate.firstName,
                    candidate.middleName,
                    candidate.lastName,
                    candidate.email,
                    candidate.mobile,
                    candidate.skills
                ].join(' ').toLowerCase();
                
                if (!candidateText.includes(query)) {
                    return false;
                }
            }
            
            return true;
        });
    };

    const handleFilterChange = (filterName) => (event) => {
        setFilters({
            ...filters,
            [filterName]: event.target.value
        });
    };

    const handleAddRemarks = () => {
        handleCloseRemarksMenu();
        setRemarksDialogOpen(true);
    };

    const handleSubmitRemarks = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/remarks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: remarksText,
                    // Add other necessary fields
                }),
            });

            if (!response.ok) throw new Error('Failed to save remarks');
            
            const data = await response.json();
            console.log('Remarks saved:', data);
            
            setRemarksDialogOpen(false);
            setRemarksText('');
            
        } catch (error) {
            console.error('Error saving remarks:', error);
        }
    };

    const showSnackbar = (message, severity = "success") => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    // Calculate candidate stages count for filtered candidates
    const candidateStages = getFilteredCandidates().reduce((acc, candidate) => {
        const stage = candidate.stage.toLowerCase();
        acc[stage] = (acc[stage] || 0) + 1;
        return acc;
    }, {
        sourced: 0,
        screening: 0,
        interview: 0,
        preboarding: 0,
        hired: 0,
        archived: 0,
    });

    const handleSelectCandidate = (id) => {
        setSelectedCandidates((prev) =>
            prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
        );
    };

    const handleSelectAllCandidates = (event) => {
        if (event.target.checked) {
            const allIds = getFilteredCandidates().map((c) => c._id);
            setSelectedCandidates(allIds);
        } else {
            setSelectedCandidates([]);
        }
    };

    const handleOpenAddCandidate = () => {
        setOpenAddCandidate(true);
    };

    const handleCloseAddCandidate = () => {
        setOpenAddCandidate(false);
    };

    const handleOpenDetails = (candidate) => {
        navigate(`/dashboard/candidates/${candidate._id}`);
    };

    const handleCloseDetails = () => {
        setOpenDetailsDialog(false);
    };

    const handleSubmitCandidate = async (formData) => {
        try {
            const newCandidate = await createCandidate(formData);
            setCandidates([...candidates, newCandidate]);
            showSnackbar("Candidate added successfully!");
            handleCloseAddCandidate();
        } catch (error) {
            console.error("Error adding candidate:", error);
            showSnackbar(error.message, "error");
        }
    };

    const handleInterviewClick = (event, candidateId) => {
        setCurrentCandidate(candidateId);
        setInterviewAnchorEl(event.currentTarget);
    };

    const handleStageClick = (event, candidateId) => {
        setCurrentCandidate(candidateId);
        setStageAnchorEl(event.currentTarget);
    };

    const handleRemarksClick = (event, candidateId) => {
        setCurrentCandidate(candidateId);
        setRemarksAnchorEl(event.currentTarget);
    };

    const handleCloseInterviewMenu = () => {
        setInterviewAnchorEl(null);
    };

    const handleCloseStageMenu = () => {
        setStageAnchorEl(null);
    };

    const handleCloseRemarksMenu = () => {
        setRemarksAnchorEl(null);
    };

    const handleInterviewOption = (option, candidateId) => {
        setInterviewType(option);
        setCurrentCandidate(candidates.find(c => c._id === candidateId));
        setShowInterviewModal(true);
        handleCloseInterviewMenu();
    };

    const handleInterviewSchedule = async () => {
        try {
            const loggedInEmail = localStorage.getItem("user_email");
            await scheduleInterview({
                candidateId: currentCandidate,
                type: interviewType,
                date,
                time,
                linkOrLocation,
                scheduledBy: loggedInEmail,
            });
            
            showSnackbar("Interview scheduled successfully!");
            setShowInterviewModal(false);
            setDate("");
            setTime("");
            setLinkOrLocation("");
        } catch (error) {
            console.error("Schedule Error:", error);
            showSnackbar(error.message, "error");
        }
    };

    const handleStageMove = async ({ newStage, comment }) => {
        try {
            const updatedCandidate = await updateCandidate(currentCandidate, {
                stage: newStage,
            });
    
            setCandidates(
                candidates.map(candidate =>
                    candidate._id === currentCandidate
                        ? updatedCandidate
                        : candidate
                ) 
            );
    
            showSnackbar("Candidate stage updated successfully!");
            setShowMoveForm(false);
        } catch (error) {
            console.error("Error updating candidate stage:", error);
            showSnackbar(error.message, "error");
        }
    };

    const handleBulkStageMove = async () => {
        try {
            // Update all selected candidates
            const updatePromises = selectedCandidates.map(candidateId => 
                updateCandidate(candidateId, { stage: newStage })
            );
            
            await Promise.all(updatePromises);
            
            // Refresh the candidates list
            const data = await fetchCandidates();
            setCandidates(data);
            
            setSelectedCandidates([]);
            setBulkMoveDialogOpen(false);
            showSnackbar("Candidates moved successfully!");
        } catch (error) {
            console.error("Error moving candidates:", error);
            showSnackbar(error.message, "error");
        }
    };

    const handleBulkEmail = async () => {
        setEmailDialogOpen(true);
    };

    const handleSendBulkEmail = async () => {
        if (!emailSubject || !emailBody) {
            showSnackbar("Please enter both subject and body", "error");
            return;
        }

        try {
            setIsSendingEmail(true);
            const selectedCandidateEmails = candidates
                .filter(c => selectedCandidates.includes(c._id))
                .map(c => c.email);

            if (selectedCandidateEmails.length === 0) {
                showSnackbar("No candidates selected", "error");
                return;
            }

            const response = await sendBulkEmails({
                recipients: selectedCandidateEmails,
                subject: emailSubject,
                body: emailBody
            });

            if (response.success) {
                showSnackbar(`Email sent to ${selectedCandidateEmails.length} candidates`, "success");
                setEmailDialogOpen(false);
                setEmailSubject('');
                setEmailBody('');
            } else {
                throw new Error(response.message || "Failed to send emails");
            }
        } catch (error) {
            console.error("Error sending bulk email:", error);
            showSnackbar(error.message, "error");
        } finally {
            setIsSendingEmail(false);
        }
    };

    const handleBulkAction = async (action) => {
        if (action === "delete") {
            try {
                if (selectedCandidates.length === 1) {
                    await deleteCandidate(selectedCandidates[0]);
                    setCandidates((prev) => prev.filter((c) => c._id !== selectedCandidates[0]));
                } else if (selectedCandidates.length > 1) {
                    for (const id of selectedCandidates) {
                        await deleteCandidate(id);
                    }
                    setCandidates((prev) =>
                        prev.filter((c) => !selectedCandidates.includes(c._id))
                    );
                }

                setSelectedCandidates([]);
                showSnackbar("Candidate(s) deleted successfully!");
            } catch (error) {
                console.error("Bulk delete failed:", error);
                showSnackbar(error.message, "error");
            }
        } else if (action === "email") {
            handleBulkEmail();
        } else if (action === "move-to-sourced") {
            setBulkMoveDialogOpen(true);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 0 }}>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
            
            {/* Header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    All Candidates
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <ToggleButtonGroup
                        value={viewMode}
                        exclusive
                        onChange={(e, newMode) => newMode && setViewMode(newMode)}
                        size="small"
                    >
                        <ToggleButton value="card">
                            <CardViewIcon />
                        </ToggleButton>
                        <ToggleButton value="table">
                            <TableViewIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                   { location.pathname!=='/dashboard/candidates' &&<Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAddCandidate}>
                        Add Candidate
                    </Button>}
                </Box>
            </Box>

            {/* Add Candidate Dialog */}
            <Dialog open={openAddCandidate} onClose={handleCloseAddCandidate} maxWidth="md" fullWidth>
                <AddCandidateForm onClose={handleCloseAddCandidate} onSubmit={handleSubmitCandidate} />
            </Dialog>

            {/* Move Candidate Form */}
            <MoveCandidateForm
                open={showMoveForm}
                onClose={() => setShowMoveForm(false)}
                candidate={candidates.find(c => c._id === currentCandidate)}
                onMove={handleStageMove}
            />

            {/* Bulk Move Dialog */}
            <Dialog open={bulkMoveDialogOpen} onClose={() => setBulkMoveDialogOpen(false)}>
                <DialogTitle>Move Selected Candidates to Another Stage</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>New Stage</InputLabel>
                        <Select
                            value={newStage}
                            onChange={(e) => setNewStage(e.target.value)}
                            label="New Stage"
                        >
                            <MenuItem value="Sourced">Sourced</MenuItem>
                            <MenuItem value="Screening">Screening</MenuItem>
                            <MenuItem value="Interview">Interview</MenuItem>
                            <MenuItem value="Preboarding">Preboarding</MenuItem>
                            <MenuItem value="Hired">Hired</MenuItem>
                            <MenuItem value="Archived">Archived</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setBulkMoveDialogOpen(false)}>Cancel</Button>
                    <Button 
                        onClick={handleBulkStageMove} 
                        variant="contained"
                        disabled={!newStage}
                    >
                        Move Candidates
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Bulk Email Dialog */}
            <Dialog open={emailDialogOpen} onClose={() => setEmailDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>Send Email to Selected Candidates</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Subject"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        sx={{ mb: 3 }}
                    />
                    <TextField
                        margin="dense"
                        label="Email Body"
                        type="text"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={10}
                        value={emailBody}
                        onChange={(e) => setEmailBody(e.target.value)}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        This email will be sent from Zafarekhlaque9708@gmail.com to {selectedCandidates.length} selected candidates.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEmailDialogOpen(false)}>Cancel</Button>
                    <Button 
                        onClick={handleSendBulkEmail} 
                        variant="contained"
                        disabled={isSendingEmail || !emailSubject || !emailBody}
                        startIcon={isSendingEmail ? <CircularProgress size={20} /> : null}
                    >
                        {isSendingEmail ? 'Sending...' : 'Send Email'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Stages Summary */}
            <Card sx={{ mb: 2, overflow: "hidden" }}>
                <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, overflowX: "auto", py: 2 }}>
                        {Object.entries(candidateStages).map(([stage, count]) => (
                            <Card
                                key={stage}
                                onClick={() => navigate(`/candidates/stage/${stage}`)}
                                sx={{
                                    backgroundColor: "#f5f5f5",
                                    width: "150px",
                                    textAlign: "center",
                                    borderRadius: 2,
                                    p: 2,
                                    boxShadow: 2,
                                    flexShrink: 0,
                                    cursor: "pointer",
                                    transition: "transform 0.2s",
                                    ":hover": {
                                        transform: "translateY(-4px)",
                                        boxShadow: 4,
                                    }
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    {stage==='sourced'?candidates.length:count}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {stage.charAt(0).toUpperCase() + stage.slice(1)}
                                </Typography>
                            </Card>
                        ))}
                    </Box>
                </CardContent>
            </Card>
            
            {/* Filters */}
            <Card sx={{ mb: 2 }}>
                <CardContent>
                    <Typography variant="subtitle1" fontWeight={600} mb={2}>
                        Sourced
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        <FormControl size="small" sx={{ minWidth: 180 }}>
                            <InputLabel>Source</InputLabel>
                            <Select 
                                label="Source"
                                value={filters.source}
                                onChange={handleFilterChange('source')}
                            >
                                <MenuItem value="">All Sources</MenuItem>
                                <MenuItem value="linkedin">LinkedIn</MenuItem>
                                <MenuItem value="referral">Referral</MenuItem>
                                <MenuItem value="job-board">Job Board</MenuItem>
                                <MenuItem value="naukari">Naukari</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl size="small" sx={{ minWidth: 180 }}>
                            <InputLabel>Experience</InputLabel>
                            <Select 
                                label="Experience"
                                value={filters.experience}
                                onChange={handleFilterChange('experience')}
                            >
                                <MenuItem value="">All Experience</MenuItem>
                                <MenuItem value="0-2">0-2 years</MenuItem>
                                <MenuItem value="3-5">3-5 years</MenuItem>
                                <MenuItem value="5+">5+ years</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl size="small" sx={{ minWidth: 250 }}>
                            <InputLabel>Available to join (In Days)</InputLabel>
                            <Select 
                                label="Available to join(In Days)"
                                value={filters.availableToJoin}
                                onChange={handleFilterChange('availableToJoin')}
                            >
                                <MenuItem value="">Any Availability</MenuItem>
                                <MenuItem value="7">Within 7 days</MenuItem>
                                <MenuItem value="15">Within 15 days</MenuItem>
                                <MenuItem value="30">Within 30 days</MenuItem>
                                <MenuItem value="60">Within 60 days</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl size="small" sx={{ minWidth: 150 }}>
                            <InputLabel>Status</InputLabel>
                            <Select 
                                label="Status"
                                value={filters.status}
                                onChange={handleFilterChange('status')}
                            >
                                <MenuItem value="">All Statuses</MenuItem>
                                <MenuItem value="rejected">Rejected</MenuItem>
                                <MenuItem value="on-hold">On Hold</MenuItem>
                                <MenuItem value="closed">Closed Own</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            size="small"
                            placeholder="Search candidates..."
                            value={filters.searchQuery}
                            onChange={handleFilterChange('searchQuery')}
                            sx={{ flexGrow: 1, maxWidth: 400 }}
                            InputProps={{
                                endAdornment: (
                                    <IconButton size="small">
                                        <FilterIcon />
                                    </IconButton>
                                ),
                            }}
                        />
                    </Box>
                </CardContent>
            </Card>

            {/* Bulk Actions */}
            {selectedCandidates.length > 0 && (
                <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography variant="body2">{selectedCandidates.length} selected</Typography>
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>Bulk Actions</InputLabel>
                        <Select
                            label="Bulk Actions"
                            defaultValue=""
                            onChange={(e) => handleBulkAction(e.target.value)}
                        >
                            <MenuItem value="email">
                                <ListItemIcon>
                                    <EmailIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Send email</ListItemText>
                            </MenuItem>
                            <MenuItem value="delete">Delete</MenuItem>
                            <MenuItem value="move-to-sourced">
                                <ListItemIcon>
                                    <StageIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Move to another Stage</ListItemText>
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            )}

            {/* Interview Menu */}
            <Dialog open={showInterviewModal} onClose={() => setShowInterviewModal(false)}>
                <DialogTitle>Schedule {interviewType === "online" ? "Online" : "Offline"} Interview</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Time"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label={interviewType === "online" ? "Meeting Link" : "Location"}
                        value={linkOrLocation}
                        onChange={(e) => setLinkOrLocation(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowInterviewModal(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleInterviewSchedule}>
                        Schedule
                    </Button>
                </DialogActions>
            </Dialog>
            <Menu
                anchorEl={interviewAnchorEl}
                open={Boolean(interviewAnchorEl)}
                onClose={handleCloseInterviewMenu}
            >
                <MenuItem onClick={() => handleInterviewOption("online", currentCandidate)}>
                    <ListItemText>Schedule Online Interview</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleInterviewOption("offline", currentCandidate)}>
                    <ListItemText>Schedule Offline Interview</ListItemText>
                </MenuItem>
            </Menu>

            {currentCandidate && (
                <>
                    <ScheduleOnlineInterviewForm
                        open={showInterviewModal && interviewType === "online"}
                        onClose={() => setShowInterviewModal(false)}
                        candidate={currentCandidate}
                        user={{ email: localStorage.getItem("user_email") }}
                    />
                    <ScheduleOfflineInterviewForm
                        open={showInterviewModal && interviewType === "offline"}
                        onClose={() => setShowInterviewModal(false)}
                        candidate={currentCandidate}
                        user={{ email: localStorage.getItem("user_email") }}
                    />
                </>
            )}

            {/* Stage Menu */}
            <Menu
                anchorEl={stageAnchorEl}
                open={Boolean(stageAnchorEl)}
                onClose={handleCloseStageMenu}
            >
                <MenuItem onClick={() => {
                    setMoveCandidate(candidates.find(c => c._id === currentCandidate));
                    setShowMoveForm(true);
                    handleCloseStageMenu();
                }}>
                    <ListItemText>Move to Another Stage</ListItemText>
                </MenuItem>
            </Menu>

            {/* Remarks Menu */}
            <Menu
                anchorEl={remarksAnchorEl}
                open={Boolean(remarksAnchorEl)}
                onClose={handleCloseRemarksMenu}
            >
                <MenuItem onClick={handleAddRemarks}>
                    <ListItemIcon>
                        <RemarksIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Add Remarks</ListItemText>
                </MenuItem>
            </Menu>

            <Dialog open={remarksDialogOpen} onClose={() => setRemarksDialogOpen(false)}>
                <DialogTitle>Add Remarks</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="remarks"
                        label="Remarks"
                        type="text"
                        fullWidth
                        variant="standard"
                        multiline
                        rows={4}
                        value={remarksText}
                        onChange={(e) => setRemarksText(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setRemarksDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmitRemarks}>Save</Button>
                </DialogActions>
            </Dialog>

            {/* Candidate Views */}
            {viewMode === "table" ? (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
                        gap: 2,
                        padding: 3,
                    }}
                >
                    {getFilteredCandidates().map((candidate) => (
                        <Card
                            key={candidate._id}
                            sx={{
                                borderRadius: 3,
                                boxShadow: 6,
                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                ":hover": {
                                    transform: "translateY(-8px)",
                                    boxShadow: 12,
                                },
                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                                bgcolor: "background.paper",
                            }}
                            onClick={() => handleOpenDetails(candidate)}
                        >
                            <CardContent
                                sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 3 }}
                                onClick={(e) => {
                                    if (!e.target.closest('.action-button')) {
                                        handleOpenDetails(candidate);
                                    }
                                }}
                            >
                                {/* Header: Name, Avatar, and Checkbox */}
                                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                                    <Checkbox
                                        checked={selectedCandidates.includes(candidate._id)}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            handleSelectCandidate(candidate._id);
                                        }}
                                        color="primary"
                                        sx={{ padding: 0 }}
                                    />
                                    <Avatar
                                        sx={{
                                            bgcolor: "primary.main",
                                            fontSize: "1.4rem",
                                            fontWeight: "bold",
                                            width: 48,
                                            height: 48,
                                        }}
                                    >
                                        {candidate.firstName.charAt(0)}
                                    </Avatar>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
                                            {`${candidate.firstName} ${candidate.middleName || ''} ${candidate.lastName}`}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                            {candidate.experience} | {candidate.source}
                                        </Typography>
                                    </Box>
                                    <IconButton
                                        className="action-button"
                                        sx={{ color: "text.secondary" }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemarksClick(e, candidate._id);
                                        }}
                                    >
                                        <MoreIcon />
                                    </IconButton>
                                </Box>

                                {/* Status Chip */}
                                <Chip
                                    label={candidate.stage}
                                    color={
                                        candidate.stage === "Hired" ? "success" :
                                            candidate.stage === "Archived" ? "default" : "primary"
                                    }
                                    size="small"
                                    sx={{
                                        alignSelf: "flex-start",
                                        fontWeight: "bold",
                                        backgroundColor:
                                            candidate.stage === "Hired" ? "success.light" :
                                                candidate.stage === "Archived" ? "grey.500" : "primary.light",
                                        color: "white",
                                        borderRadius: 20,
                                        padding: "0.5rem 1rem",
                                        mb: 2,
                                    }}
                                />

                                {/* Contact Info */}
                                <Typography variant="body2" sx={{ color: "text.primary", fontWeight: "500" }}>
                                    <strong>Email:</strong> {candidate.email}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "text.primary", fontWeight: "500" }}>
                                    <strong>Phone:</strong> {candidate.mobile}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "text.primary", fontWeight: "500" }}>
                                    <strong>Owner:</strong> {candidate.owner}
                                </Typography>

                                {/* Action Buttons */}
                                <Box
                                    sx={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <IconButton
                                        className="action-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleInterviewClick(e, candidate._id);
                                        }}
                                        sx={{
                                            backgroundColor: "primary.main",
                                            color: "white",
                                            borderRadius: "50%",
                                            padding: 2,
                                            ":hover": { backgroundColor: "primary.dark" },
                                            transition: "background-color 0.2s ease",
                                        }}
                                    >
                                        <InterviewIcon />
                                    </IconButton>
                                    <IconButton
                                        className="action-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleStageClick(e, candidate._id);
                                        }}
                                        sx={{
                                            backgroundColor: "secondary.main",
                                            color: "white",
                                            borderRadius: "50%",
                                            padding: 2,
                                            ":hover": { backgroundColor: "secondary.dark" },
                                            transition: "background-color 0.2s ease",
                                        }}
                                    >
                                        <StageIcon />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        onChange={handleSelectAllCandidates}
                                        checked={selectedCandidates.length === getFilteredCandidates().length}
                                        sx={{ color: '#3f51b5' }}
                                    />
                                </TableCell>

                                {[
                                    "Name",
                                    "Status",
                                    "Experience",
                                    "Source",
                                    "Available to join",
                                    "Email",
                                    "Phone",
                                    "Candidate Owner",
                                    "Actions"
                                ].map((label, index) => (
                                    <TableCell
                                        key={index}
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: '0.85rem',
                                            color: '#333',
                                            borderBottom: '2px solid #e0e0e0'
                                        }}
                                    >
                                        {label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {getFilteredCandidates().map((candidate) => (
                                <TableRow
                                    key={candidate._id}
                                    hover
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => handleOpenDetails(candidate)}
                                >
                                    <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                                        <Checkbox
                                            checked={selectedCandidates.includes(candidate._id)}
                                            onChange={() => handleSelectCandidate(candidate._id)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {`${candidate.firstName} ${candidate.middleName || ''} ${candidate.lastName}`}
                                    </TableCell>
                                    <TableCell>{candidate.stage}</TableCell>
                                    <TableCell>{candidate.experience}</TableCell>
                                    <TableCell>{candidate.source}</TableCell>
                                    <TableCell>{candidate.availableToJoin} days</TableCell>
                                    <TableCell>
                                        <Box>
                                            <div>{candidate.email}</div>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{candidate.mobile}</TableCell>
                                    <TableCell>{candidate.owner}</TableCell>
                                    <TableCell onClick={(e) => e.stopPropagation()}>
                                        <IconButton
                                            className="action-button"
                                            onClick={(e) => handleInterviewClick(e, candidate._id)}
                                        >
                                            <InterviewIcon />
                                        </IconButton>
                                        <IconButton
                                            className="action-button"
                                            onClick={(e) => handleStageClick(e, candidate._id)}
                                        >
                                            <StageIcon />
                                        </IconButton>
                                        <IconButton
                                            className="action-button"
                                            onClick={(e) => handleRemarksClick(e, candidate._id)}
                                        >
                                            <MoreIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {openDetailsDialog&&<CandidateDetailsPage
                open={openDetailsDialog}
                onClose={handleCloseDetails}
                candidate={selectedCandidate}
            />}
        </Box>
    );
};

export default CandidatesTab;







//-------------------it will show first all content of candidates tab then fetch data from api 


// import React, { useState, useEffect } from "react";
// import {
//     Box,
//     Typography,
//     Card,
//     CardContent,
//     Button,
//     IconButton,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Checkbox,
//     MenuItem,
//     FormControl,
//     InputLabel,
//     Select,
//     ToggleButton,
//     ToggleButtonGroup,
//     Avatar,
//     TextField,
//     Chip,
//     Dialog,
//     CircularProgress,
//     Snackbar,
//     Alert,
//     Menu,
//     ListItemIcon,
//     ListItemText
// } from "@mui/material";
// import {
//     ViewModule as CardViewIcon,
//     ViewHeadline as TableViewIcon,
//     Add as AddIcon,
//     FilterList as FilterIcon,
//     MoreVert as MoreIcon,
//     AssignmentInd as InterviewIcon,
//     ArrowForward as StageIcon,
//     NoteAdd as RemarksIcon
// } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import AddCandidateForm from "./AddCandidateForm";
// import ScheduleOnlineInterviewForm from "../Interviews/ScheduleOnlineInterviewForm";
// import ScheduleOfflineInterviewForm from "../Interviews/ScheduleOfflineInterviewForm";
// import MoveCandidateForm from "./MoveCandidateForm";
// import { fetchCandidates, createCandidate, deleteCandidate, updateCandidate } from "../utils/api";

// const CandidatesTab = () => {
//     const [viewMode, setViewMode] = useState("card");
//     const [selectedCandidates, setSelectedCandidates] = useState([]);
//     const [openAddCandidate, setOpenAddCandidate] = useState(false);
//     const [candidates, setCandidates] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [snackbar, setSnackbar] = useState({
//         open: false,
//         message: "",
//         severity: "success"
//     });
//     const [interviewAnchorEl, setInterviewAnchorEl] = useState(null);
//     const [stageAnchorEl, setStageAnchorEl] = useState(null);
//     const [remarksAnchorEl, setRemarksAnchorEl] = useState(null);
//     const [currentCandidate, setCurrentCandidate] = useState(null);
//     const [showInterviewModal, setShowInterviewModal] = useState(false);
//     const [interviewType, setInterviewType] = useState(null);
//     const [showMoveForm, setShowMoveForm] = useState(false);
//     const navigate = useNavigate();

//     // Calculate candidate stages count
//     const candidateStages = {
//         sourced: candidates.filter(c => c.stage === "Sourced").length,
//         screening: candidates.filter(c => c.stage === "Screening").length,
//         interview: candidates.filter(c => c.stage === "Interview").length,
//         preboarding: candidates.filter(c => c.stage === "Preboarding").length,
//         hired: candidates.filter(c => c.stage === "Hired").length,
//         archived: candidates.filter(c => c.stage === "Archived").length,
//     };

//     // Fetch candidates from API
//     useEffect(() => {
//         const loadCandidates = async () => {
//             try {
//                 setLoading(true);
//                 const data = await fetchCandidates();
//                 setCandidates(data || []);
//                 setError(null);
//             } catch (err) {
//                 setError(err.message);
//                 showSnackbar(err.message, "error");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         loadCandidates();
//     }, []);

//     const showSnackbar = (message, severity = "success") => {
//         setSnackbar({ open: true, message, severity });
//     };

//     const handleCloseSnackbar = () => {
//         setSnackbar(prev => ({ ...prev, open: false }));
//     };

//     const handleOpenAddCandidate = () => setOpenAddCandidate(true);
//     const handleCloseAddCandidate = () => setOpenAddCandidate(false);

//     const handleSubmitCandidate = async (formData) => {
//         try {
//             const newCandidate = await createCandidate(formData);
//             setCandidates([...candidates, newCandidate]);
//             showSnackbar("Candidate added successfully!");
//             handleCloseAddCandidate();
//         } catch (error) {
//             console.error("Error adding candidate:", error);
//             showSnackbar(error.message, "error");
//         }
//     };

//     const handleSelectCandidate = (id) => {
//         setSelectedCandidates(prev =>
//             prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
//         );
//     };

//     const handleSelectAllCandidates = (event) => {
//         setSelectedCandidates(event.target.checked ? candidates.map(c => c._id) : []);
//     };

//     const handleOpenDetails = (candidate) => {
//         navigate(`/candidates/${candidate._id}`);
//     };

//     // Interview functions
//     const handleInterviewClick = (event, candidate) => {
//         setCurrentCandidate(candidate);
//         setInterviewAnchorEl(event.currentTarget);
//     };

//     const handleCloseInterviewMenu = () => {
//         setInterviewAnchorEl(null);
//     };

//     const handleInterviewOption = (type) => {
//         setInterviewType(type);
//         setShowInterviewModal(true);
//         handleCloseInterviewMenu();
//     };

//     const handleCloseInterviewModal = () => {
//         setShowInterviewModal(false);
//     };

//     const handleSubmitInterview = async (interviewData) => {
//         try {
//             // Implement your interview scheduling API call here
//             showSnackbar(`${interviewType} interview scheduled successfully!`);
//             handleCloseInterviewModal();
//         } catch (error) {
//             console.error("Error scheduling interview:", error);
//             showSnackbar(error.message, "error");
//         }
//     };

//     // Stage movement functions
//     const handleStageClick = (event, candidate) => {
//         setCurrentCandidate(candidate);
//         setStageAnchorEl(event.currentTarget);
//     };

//     const handleCloseStageMenu = () => {
//         setStageAnchorEl(null);
//     };

//     const handleMoveStage = () => {
//         setShowMoveForm(true);
//         handleCloseStageMenu();
//     };

//     const handleCloseMoveForm = () => {
//         setShowMoveForm(false);
//     };

//     const handleSubmitMoveStage = async ({ newStage, comment }) => {
//         try {
//             const updatedCandidate = await updateCandidate(currentCandidate._id, { 
//                 stage: newStage,
//                 comments: [...(currentCandidate.comments || []), {
//                     text: comment,
//                     date: new Date().toISOString(),
//                     type: 'stage-change'
//                 }]
//             });
//             setCandidates(candidates.map(c => 
//                 c._id === currentCandidate._id ? updatedCandidate : c
//             ));
//             showSnackbar("Candidate stage updated successfully!");
//             handleCloseMoveForm();
//         } catch (error) {
//             console.error("Error moving stage:", error);
//             showSnackbar(error.message, "error");
//         }
//     };

//     // Remarks functions
//     const handleRemarksClick = (event, candidate) => {
//         setCurrentCandidate(candidate);
//         setRemarksAnchorEl(event.currentTarget);
//     };

//     const handleCloseRemarksMenu = () => {
//         setRemarksAnchorEl(null);
//     };

//     const handleAddRemarks = async (remarks) => {
//         try {
//             const updatedCandidate = await updateCandidate(currentCandidate._id, {
//                 comments: [...(currentCandidate.comments || []), {
//                     text: remarks,
//                     date: new Date().toISOString(),
//                     type: 'remark'
//                 }]
//             });
//             setCandidates(candidates.map(c => 
//                 c._id === currentCandidate._id ? updatedCandidate : c
//             ));
//             showSnackbar("Remarks added successfully!");
//             handleCloseRemarksMenu();
//         } catch (error) {
//             console.error("Error adding remarks:", error);
//             showSnackbar(error.message, "error");
//         }
//     };

//     // Bulk actions
//     const handleBulkDelete = async () => {
//         try {
//             await Promise.all(selectedCandidates.map(id => deleteCandidate(id)));
//             setCandidates(candidates.filter(c => !selectedCandidates.includes(c._id)));
//             setSelectedCandidates([]);
//             showSnackbar("Candidates deleted successfully!");
//         } catch (error) {
//             console.error("Bulk delete failed:", error);
//             showSnackbar("Failed to delete candidates", "error");
//         }
//     };

//     return (
//         <Box sx={{ p: 0 }}>
//             {/* Snackbar for notifications */}
//             <Snackbar
//                 open={snackbar.open}
//                 autoHideDuration={6000}
//                 onClose={handleCloseSnackbar}
//                 anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//             >
//                 <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>

//             {/* Header - Always visible */}
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
//                 <Typography variant="h5" sx={{ fontWeight: 600 }}>
//                     All Candidates
//                 </Typography>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                     <ToggleButtonGroup
//                         value={viewMode}
//                         exclusive
//                         onChange={(e, newMode) => newMode && setViewMode(newMode)}
//                         size="small"
//                     >
//                         <ToggleButton value="card">
//                             <CardViewIcon />
//                         </ToggleButton>
//                         <ToggleButton value="table">
//                             <TableViewIcon />
//                         </ToggleButton>
//                     </ToggleButtonGroup>
//                     <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAddCandidate}>
//                         Add Candidate
//                     </Button>
//                 </Box>
//             </Box>

//             {/* Add Candidate Dialog */}
//             <Dialog open={openAddCandidate} onClose={handleCloseAddCandidate} maxWidth="md" fullWidth>
//                 <AddCandidateForm onClose={handleCloseAddCandidate} onSubmit={handleSubmitCandidate} />
//             </Dialog>

//             {/* Stages Summary - Always visible showing counts (including 0) */}
//             <Card sx={{ mb: 2, overflow: "hidden" }}>
//                 <CardContent sx={{ p: 2 }}>
//                     <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, overflowX: "auto", py: 2 }}>
//                         {Object.entries(candidateStages).map(([stage, count]) => (
//                             <Card
//                                 key={stage}
//                                 sx={{
//                                     backgroundColor: "#f5f5f5",
//                                     width: "150px",
//                                     textAlign: "center",
//                                     borderRadius: 2,
//                                     p: 2,
//                                     boxShadow: 2,
//                                     flexShrink: 0,
//                                 }}
//                             >
//                                 <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                                     {count}
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     {stage.charAt(0).toUpperCase() + stage.slice(1)}
//                                 </Typography>
//                             </Card>
//                         ))}
//                     </Box>
//                 </CardContent>
//             </Card>

//             {/* Filters - Always visible */}
//             <Card sx={{ mb: 2 }}>
//                 <CardContent>
//                     <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
//                         <FormControl size="small" sx={{ minWidth: 180 }}>
//                             <InputLabel>Source</InputLabel>
//                             <Select label="Source">
//                                 <MenuItem value="linkedin">LinkedIn</MenuItem>
//                                 <MenuItem value="referral">Referral</MenuItem>
//                                 <MenuItem value="job-board">Job Board</MenuItem>
//                             </Select>
//                         </FormControl>

//                         <FormControl size="small" sx={{ minWidth: 180 }}>
//                             <InputLabel>Experience</InputLabel>
//                             <Select label="Experience">
//                                 <MenuItem value="0-2">0-2 years</MenuItem>
//                                 <MenuItem value="3-5">3-5 years</MenuItem>
//                                 <MenuItem value="5+">5+ years</MenuItem>
//                             </Select>
//                         </FormControl>

//                         <TextField
//                             size="small"
//                             placeholder="Search candidates..."
//                             sx={{ flexGrow: 1, maxWidth: 400 }}
//                             InputProps={{
//                                 endAdornment: (
//                                     <IconButton size="small">
//                                         <FilterIcon />
//                                     </IconButton>
//                                 ),
//                             }}
//                         />
//                     </Box>
//                 </CardContent>
//             </Card>

//             {/* Bulk Actions */}
//             {selectedCandidates.length > 0 && (
//                 <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
//                     <Typography variant="body2">{selectedCandidates.length} selected</Typography>
//                     <Button
//                         variant="outlined"
//                         color="error"
//                         onClick={handleBulkDelete}
//                     >
//                         Delete Selected
//                     </Button>
//                 </Box>
//             )}

//             {/* Main Content Area */}
//             {loading ? (
//                 <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
//                     <CircularProgress />
//                 </Box>
//             ) : error ? (
//                 <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
//                     <Typography color="error">{error}</Typography>
//                 </Box>
//             ) : candidates.length === 0 ? (
//                 <Card sx={{ p: 4, textAlign: 'center' }}>
//                     <Typography variant="h6" gutterBottom>
//                         No Candidates Found
//                     </Typography>
//                     <Typography variant="body1" color="text.secondary">
//                         You haven't added any candidates yet. Click the "Add Candidate" button to get started.
//                     </Typography>
//                 </Card>
//             ) : viewMode === "table" ? (
//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead>
//                             <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
//                                 <TableCell padding="checkbox">
//                                     <Checkbox
//                                         onChange={handleSelectAllCandidates}
//                                         checked={selectedCandidates.length === candidates.length}
//                                     />
//                                 </TableCell>
//                                 <TableCell>Name</TableCell>
//                                 <TableCell>Status</TableCell>
//                                 <TableCell>Experience</TableCell>
//                                 <TableCell>Source</TableCell>
//                                 <TableCell>Email</TableCell>
//                                 <TableCell>Phone</TableCell>
//                                 <TableCell>Actions</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {candidates.map((candidate) => (
//                                 <TableRow
//                                     key={candidate._id}
//                                     hover
//                                     sx={{ cursor: "pointer" }}
//                                 >
//                                     <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
//                                         <Checkbox
//                                             checked={selectedCandidates.includes(candidate._id)}
//                                             onChange={() => handleSelectCandidate(candidate._id)}
//                                         />
//                                     </TableCell>
//                                     <TableCell onClick={() => handleOpenDetails(candidate)}>
//                                         {`${candidate.firstName} ${candidate.lastName}`}
//                                     </TableCell>
//                                     <TableCell onClick={() => handleOpenDetails(candidate)}>
//                                         <Chip
//                                             label={candidate.stage}
//                                             size="small"
//                                             color={
//                                                 candidate.stage === "Hired" ? "success" :
//                                                 candidate.stage === "Archived" ? "default" : "primary"
//                                             }
//                                         />
//                                     </TableCell>
//                                     <TableCell onClick={() => handleOpenDetails(candidate)}>
//                                         {candidate.experience}
//                                     </TableCell>
//                                     <TableCell onClick={() => handleOpenDetails(candidate)}>
//                                         {candidate.source}
//                                     </TableCell>
//                                     <TableCell onClick={() => handleOpenDetails(candidate)}>
//                                         {candidate.email}
//                                     </TableCell>
//                                     <TableCell onClick={() => handleOpenDetails(candidate)}>
//                                         {candidate.mobile}
//                                     </TableCell>
//                                     <TableCell>
//                                         <Box sx={{ display: 'flex', gap: 1 }}>
//                                             <IconButton 
//                                                 onClick={(e) => {
//                                                     e.stopPropagation();
//                                                     handleInterviewClick(e, candidate);
//                                                 }}
//                                             >
//                                                 <InterviewIcon />
//                                             </IconButton>
//                                             <IconButton 
//                                                 onClick={(e) => {
//                                                     e.stopPropagation();
//                                                     handleStageClick(e, candidate);
//                                                 }}
//                                             >
//                                                 <StageIcon />
//                                             </IconButton>
//                                             <IconButton 
//                                                 onClick={(e) => {
//                                                     e.stopPropagation();
//                                                     handleRemarksClick(e, candidate);
//                                                 }}
//                                             >
//                                                 <MoreIcon />
//                                             </IconButton>
//                                         </Box>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             ) : (
//                 <Box
//                     sx={{
//                         display: "grid",
//                         gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
//                         gap: 2,
//                         padding: 3,
//                     }}
//                 >
//                     {candidates.map((candidate) => (
//                         <Card
//                             key={candidate._id}
//                             sx={{
//                                 borderRadius: 3,
//                                 boxShadow: 6,
//                                 transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                                 ":hover": {
//                                     transform: "translateY(-8px)",
//                                     boxShadow: 12,
//                                 },
//                             }}
//                         >
//                             <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//                                 <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                                     <Checkbox
//                                         checked={selectedCandidates.includes(candidate._id)}
//                                         onChange={() => handleSelectCandidate(candidate._id)}
//                                         sx={{ mr: 1 }}
//                                     />
//                                     <Avatar
//                                         sx={{
//                                             bgcolor: "primary.main",
//                                             width: 40,
//                                             height: 40,
//                                         }}
//                                         onClick={() => handleOpenDetails(candidate)}
//                                     >
//                                         {candidate.firstName.charAt(0)}
//                                     </Avatar>
//                                     <Box onClick={() => handleOpenDetails(candidate)}>
//                                         <Typography variant="subtitle1" fontWeight="bold">
//                                             {candidate.firstName} {candidate.lastName}
//                                         </Typography>
//                                         <Typography variant="body2" color="text.secondary">
//                                             {candidate.email}
//                                         </Typography>
//                                     </Box>
//                                 </Box>
//                                 <Chip
//                                     label={candidate.stage}
//                                     color={
//                                         candidate.stage === "Hired" ? "success" :
//                                         candidate.stage === "Archived" ? "default" : "primary"
//                                     }
//                                     size="small"
//                                     sx={{ alignSelf: 'flex-start' }}
//                                     onClick={() => handleOpenDetails(candidate)}
//                                 />
//                                 <Typography variant="body2" onClick={() => handleOpenDetails(candidate)}>
//                                     <strong>Experience:</strong> {candidate.experience}
//                                 </Typography>
//                                 <Typography variant="body2" onClick={() => handleOpenDetails(candidate)}>
//                                     <strong>Source:</strong> {candidate.source}
//                                 </Typography>
//                                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//                                     <IconButton 
//                                         onClick={(e) => {
//                                             e.stopPropagation();
//                                             handleInterviewClick(e, candidate);
//                                         }}
//                                     >
//                                         <InterviewIcon />
//                                     </IconButton>
//                                     <IconButton 
//                                         onClick={(e) => {
//                                             e.stopPropagation();
//                                             handleStageClick(e, candidate);
//                                         }}
//                                     >
//                                         <StageIcon />
//                                     </IconButton>
//                                     <IconButton 
//                                         onClick={(e) => {
//                                             e.stopPropagation();
//                                             handleRemarksClick(e, candidate);
//                                         }}
//                                     >
//                                         <MoreIcon />
//                                     </IconButton>
//                                 </Box>
//                             </CardContent>
//                         </Card>
//                     ))}
//                 </Box>
//             )}

//             {/* Interview Menu */}
//             <Menu
//                 anchorEl={interviewAnchorEl}
//                 open={Boolean(interviewAnchorEl)}
//                 onClose={handleCloseInterviewMenu}
//             >
//                 <MenuItem onClick={() => handleInterviewOption("online")}>
//                     <ListItemText>Schedule Online Interview</ListItemText>
//                 </MenuItem>
//                 <MenuItem onClick={() => handleInterviewOption("offline")}>
//                     <ListItemText>Schedule Offline Interview</ListItemText>
//                 </MenuItem>
//             </Menu>

//             {/* Stage Menu */}
//             <Menu
//                 anchorEl={stageAnchorEl}
//                 open={Boolean(stageAnchorEl)}
//                 onClose={handleCloseStageMenu}
//             >
//                 <MenuItem onClick={handleMoveStage}>
//                     <ListItemIcon>
//                         <StageIcon fontSize="small" />
//                     </ListItemIcon>
//                     <ListItemText>Move to Another Stage</ListItemText>
//                 </MenuItem>
//             </Menu>

//             {/* Remarks Menu */}
//             <Menu
//                 anchorEl={remarksAnchorEl}
//                 open={Boolean(remarksAnchorEl)}
//                 onClose={handleCloseRemarksMenu}
//             >
//                 <MenuItem onClick={() => {
//                     const remarks = prompt("Enter your remarks:");
//                     if (remarks) handleAddRemarks(remarks);
//                 }}>
//                     <ListItemIcon>
//                         <RemarksIcon fontSize="small" />
//                     </ListItemIcon>
//                     <ListItemText>Add Remarks</ListItemText>
//                 </MenuItem>
//             </Menu>

//             {/* Interview Dialogs */}
//             {showInterviewModal && interviewType === "online" && (
//                 <ScheduleOnlineInterviewForm
//                     open={true}
//                     onClose={handleCloseInterviewModal}
//                     onSubmit={handleSubmitInterview}
//                     candidate={currentCandidate}
//                 />
//             )}
//             {showInterviewModal && interviewType === "offline" && (
//                 <ScheduleOfflineInterviewForm
//                     open={true}
//                     onClose={handleCloseInterviewModal}
//                     onSubmit={handleSubmitInterview}
//                     candidate={currentCandidate}
//                 />
//             )}

//             {/* Move Stage Dialog */}
//             <MoveCandidateForm
//                 open={showMoveForm}
//                 onClose={handleCloseMoveForm}
//                 onSubmit={handleSubmitMoveStage}
//                 currentStage={currentCandidate?.stage}
//             />
//         </Box>
//     );
// };

// export default CandidatesTab;