import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    Alert,
    Grid,
    Stepper,
    Step,
    StepLabel
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
    ArrowBack as BackIcon,
    CheckCircle as CompletedIcon,
    RadioButtonUnchecked as PendingIcon,
    Schedule as CurrentIcon,
    Description as ResumeIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Person as PersonIcon,
    Work as WorkIcon,
    School as EducationIcon,
    LocationOn as LocationIcon,
    CalendarToday as DateIcon,
    Comment as CommentIcon
} from "@mui/icons-material";
// import AddCandidateForm from "./AddCandidateForm";
import ScheduleOnlineInterviewForm from "../Interviews/ScheduleOnlineInterviewForm";
import ScheduleOfflineInterviewForm from "../Interviews/ScheduleOfflineInterviewForm";
import MoveCandidateForm from "../jobs/MoveCandidateForm";
import { fetchCandidates } from "../utils/api";




const STAGES = ["Sourced", "Screening", "Interview", "Preboarding", "Hired", "Archived"];

const CandidatesByStage = () => {
    const { stage } = useParams();
    const navigate = useNavigate();
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
    const [showMoveForm, setShowMoveForm] = useState(false);
    const [moveCandidate, setMoveCandidate] = useState(null);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });
    const [activeStep, setActiveStep] = useState(0);
    const [filter, setFilter] = useState({
        source: "",
        experience: "",
        availableToJoin: "",
        status: "",
        search: ""
    });

    const showSnackbar = (message, severity = "success") => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    useEffect(() => {
        const loadCandidates = async () => {
            try {
                setLoading(true);
               
                const allCandidates = await fetchCandidates();
                const filteredCandidates = allCandidates.filter(c => 
                    c.stage.toLowerCase() === stage.toLowerCase()
                );
                
                const filtered = filteredCandidates.filter(candidate => {
                    return (
                        (filter.source === "" || candidate.source === filter.source) &&
                        (filter.experience === "" || candidate.experience === filter.experience) &&
                        (filter.availableToJoin === "" || candidate.availableToJoin.toString() === filter.availableToJoin) &&
                        (filter.search === "" || 
                            `${candidate.firstName} ${candidate.lastName}`.toLowerCase().includes(filter.search.toLowerCase()) ||
                            candidate.email.toLowerCase().includes(filter.search.toLowerCase()))
                    );
                });
                
                setCandidates(filtered);
                setActiveStep(STAGES.findIndex(s => s.toLowerCase() === stage.toLowerCase()));
            } catch (err) {
                setError(err.message);
                showSnackbar(err.message, "error");
            } finally {
                setLoading(false);
            }
        };
        
        if (stage) {
            loadCandidates();
        }
    }, [stage, filter]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearchChange = (e) => {
        setFilter(prev => ({
            ...prev,
            search: e.target.value
        }));
    };

    const handleResetFilters = () => {
        setFilter({
            source: "",
            experience: "",
            availableToJoin: "",
            status: "",
            search: ""
        });
    };

    const handleSelectCandidate = (id) => {
        setSelectedCandidates((prev) =>
            prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
        );
    };

    const handleSelectAllCandidates = (event) => {
        if (event.target.checked) {
            const allIds = candidates.map((c) => c._id);
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
        setSelectedCandidate(candidate);
        setOpenDetailsDialog(true);
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
            navigate(`/candidates/stage/${newStage.toLowerCase()}`);
        } catch (error) {
            console.error("Error updating candidate stage:", error);
            showSnackbar(error.message, "error");
        }
    };

    const handleAddRemarks = () => {
        console.log(`Adding remarks for candidate ${currentCandidate}`);
        handleCloseRemarksMenu();
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
        } else if (action.startsWith("move-to-")) {
            const newStage = action.replace("move-to-", "");
            try {
                for (const id of selectedCandidates) {
                    await updateCandidate(id, { stage: newStage });
                }
                setCandidates((prev) =>
                    prev.filter((c) => !selectedCandidates.includes(c._id))
                );
                setSelectedCandidates([]);
                showSnackbar(`Candidate(s) moved to ${newStage} successfully!`);
                navigate(`/candidates/stage/${newStage.toLowerCase()}`);
            } catch (error) {
                console.error("Bulk move failed:", error);
                showSnackbar(error.message, "error");
            }
        }
    };

    const getStageColor = (stage) => {
        switch ((stage || '').toLowerCase()) {
            case 'sourced': return 'primary';
            case 'screening': return 'secondary';
            case 'interview': return 'info';
            case 'preboarding': return 'warning';
            case 'hired': return 'success';
            case 'archived': return 'default';
            default: return 'primary';
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
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Button startIcon={<BackIcon />} onClick={() => navigate('/candidates')}>
                        Back
                    </Button>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        {stage.charAt(0).toUpperCase() + stage.slice(1)} Candidates
                    </Typography>
                    <Chip 
                        label={`${candidates.length} candidates`} 
                        color={getStageColor(stage)}
                        sx={{ fontWeight: 600 }}
                    />
                </Box>
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
                    <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAddCandidate}>
                        Add Candidate
                    </Button>
                </Box>
            </Box>

            {/* Stage Stepper */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {STAGES.map((label, index) => {
                            const isCompleted = index < activeStep;
                            const isCurrent = index === activeStep;
                            const stageColor = getStageColor(label);

                            return (
                                <Step key={label}>
                                    <StepLabel
                                        StepIconComponent={() => (
                                            <Box 
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: isCompleted ? `${stageColor}.main` : 'grey.200',
                                                    color: isCompleted ? '#fff' : 'grey.500',
                                                    border: isCurrent ? `3px solid ${stageColor}.main` : 'none',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        transform: 'scale(1.05)',
                                                        transition: 'transform 0.2s'
                                                    }
                                                }}
                                                onClick={() => navigate(`/candidates/stage/${label.toLowerCase()}`)}
                                            >
                                                {isCompleted ? <CompletedIcon /> : isCurrent ? <CurrentIcon /> : <PendingIcon />}
                                            </Box>
                                        )}
                                    >
                                        <Typography 
                                            variant="subtitle1" 
                                            sx={{ 
                                                fontWeight: isCurrent ? 600 : 500,
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    textDecoration: 'underline'
                                                }
                                            }}
                                            onClick={() => navigate(`/candidates/stage/${label.toLowerCase()}`)}
                                        >
                                            {label}
                                        </Typography>
                                    </StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                </CardContent>
            </Card>

            <Dialog open={openAddCandidate} onClose={handleCloseAddCandidate} maxWidth="md" fullWidth>
                <AddCandidateForm onClose={handleCloseAddCandidate} onSubmit={handleSubmitCandidate} />
            </Dialog>

            <MoveCandidateForm
                open={showMoveForm}
                onClose={() => setShowMoveForm(false)}
                candidate={candidates.find(c => c._id === currentCandidate)}
                onMove={handleStageMove}
            />

            <Card sx={{ mb: 2 }}>
                <CardContent>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, alignItems: "center" }}>
                        <FormControl size="small" sx={{ minWidth: 180 }}>
                            <InputLabel>Source</InputLabel>
                            <Select 
                                label="Source"
                                name="source"
                                value={filter.source}
                                onChange={handleFilterChange}
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
                                name="experience"
                                value={filter.experience}
                                onChange={handleFilterChange}
                            >
                                <MenuItem value="">All Experience</MenuItem>
                                <MenuItem value="0-2 years">0-2 years</MenuItem>
                                <MenuItem value="3-5 years">3-5 years</MenuItem>
                                <MenuItem value="5+ years">5+ years</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl size="small" sx={{ minWidth: 250 }}>
                            <InputLabel>Available to join (In Days)</InputLabel>
                            <Select 
                                label="Available to join(In Days)"
                                name="availableToJoin"
                                value={filter.availableToJoin}
                                onChange={handleFilterChange}
                            >
                                <MenuItem value="">Any Availability</MenuItem>
                                <MenuItem value="7">Within 7 days</MenuItem>
                                <MenuItem value="15">Within 15 days</MenuItem>
                                <MenuItem value="30">Within 30 days</MenuItem>
                                <MenuItem value="60">Within 60 days</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            size="small"
                            placeholder="Search candidates..."
                            name="search"
                            value={filter.search}
                            onChange={handleSearchChange}
                            sx={{ flexGrow: 1, maxWidth: 400 }}
                            InputProps={{
                                endAdornment: (
                                    <IconButton size="small">
                                        <FilterIcon />
                                    </IconButton>
                                ),
                            }}
                        />

                        <Button 
                            variant="outlined" 
                            onClick={handleResetFilters}
                            sx={{ ml: 'auto' }}
                        >
                            Reset Filters
                        </Button>
                    </Box>
                </CardContent>
            </Card>

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
                            <MenuItem value="email">Send email</MenuItem>
                            <MenuItem value="delete">Delete</MenuItem>
                            <MenuItem value="move-to-sourced">Move to Sourced</MenuItem>
                            <MenuItem value="move-to-screening">Move to Screening</MenuItem>
                            <MenuItem value="move-to-interview">Move to Interview</MenuItem>
                            <MenuItem value="move-to-preboarding">Move to Preboarding</MenuItem>
                            <MenuItem value="move-to-hired">Move to Hired</MenuItem>
                            <MenuItem value="move-to-archived">Move to Archived</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            )}

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
                        candidate={candidates.find(c => c._id === currentCandidate)}
                        user={{ email: localStorage.getItem("user_email") }}
                    />
                    <ScheduleOfflineInterviewForm
                        open={showInterviewModal && interviewType === "offline"}
                        onClose={() => setShowInterviewModal(false)}
                        candidate={candidates.find(c => c._id === currentCandidate)}
                        user={{ email: localStorage.getItem("user_email") }}
                    />
                </>
            )}

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

            {viewMode === "card" ? (
                <Grid container spacing={3}>
                    {candidates.map((candidate) => (
                        <Grid item xs={12} sm={6} md={4} key={candidate._id}>
                            <Card
                                sx={{
                                    borderRadius: 3,
                                    boxShadow: 3,
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    ":hover": {
                                        transform: "translateY(-8px)",
                                        boxShadow: 6,
                                    },
                                    display: "flex",
                                    flexDirection: "column",
                                    height: "100%",
                                    bgcolor: "background.paper",
                                }}
                            >
                                <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2, p: 3 }}>
                                    {/* Header: Name, Avatar, and Checkbox */}
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                                                {`${candidate.firstName} ${candidate.lastName}`}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                                {candidate.experience} | {candidate.source}
                                            </Typography>
                                        </Box>
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemarksClick(e, candidate._id);
                                            }}
                                            sx={{ color: "text.secondary" }}
                                        >
                                            <MoreIcon />
                                        </IconButton>
                                    </Box>

                                    <Chip
                                        label={candidate.stage}
                                        color={getStageColor(candidate.stage)}
                                        size="small"
                                        sx={{
                                            alignSelf: "flex-start",
                                            fontWeight: "bold",
                                            backgroundColor: (theme) => 
                                                theme.palette[getStageColor(candidate.stage)].light,
                                            color: "white",
                                            borderRadius: 20,
                                            padding: "0.5rem 1rem",
                                        }}
                                    />

                                    <Box sx={{ mt: 1 }}>
                                        <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <EmailIcon fontSize="small" color="action" />
                                            {candidate.email}
                                        </Typography>
                                        <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                                            <PhoneIcon fontSize="small" color="action" />
                                            {candidate.mobile}
                                        </Typography>
                                        <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                                            <PersonIcon fontSize="small" color="action" />
                                            {candidate.owner}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ 
                                        display: "flex", 
                                        justifyContent: "space-between", 
                                        mt: 3,
                                        '& > *': {
                                            flex: 1,
                                            mx: 0.5
                                        }
                                    }}>
                                        <Button
                                            variant="contained"
                                            startIcon={<InterviewIcon />}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleInterviewClick(e, candidate._id);
                                            }}
                                            size="small"
                                            sx={{
                                                backgroundColor: "primary.main",
                                                '&:hover': { backgroundColor: "primary.dark" }
                                            }}
                                        >
                                            Interview
                                        </Button>
                                        <Button
                                            variant="contained"
                                            startIcon={<StageIcon />}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleStageClick(e, candidate._id);
                                            }}
                                            size="small"
                                            sx={{
                                                backgroundColor: "secondary.main",
                                                '&:hover': { backgroundColor: "secondary.dark" }
                                            }}
                                        >
                                            Stage
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        onChange={handleSelectAllCandidates}
                                        checked={selectedCandidates.length === candidates.length && candidates.length > 0}
                                        indeterminate={selectedCandidates.length > 0 && selectedCandidates.length < candidates.length}
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
                            {candidates.map((candidate) => (
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
                                        {`${candidate.firstName} ${candidate.lastName}`}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={candidate.stage}
                                            color={getStageColor(candidate.stage)}
                                            size="small"
                                            sx={{
                                                fontWeight: "bold",
                                                backgroundColor: (theme) => 
                                                    theme.palette[getStageColor(candidate.stage)].light,
                                                color: "white",
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>{candidate.experience}</TableCell>
                                    <TableCell>{candidate.source}</TableCell>
                                    <TableCell>{candidate.availableToJoin} days</TableCell>
                                    <TableCell>{candidate.email}</TableCell>
                                    <TableCell>{candidate.mobile}</TableCell>
                                    <TableCell>{candidate.owner}</TableCell>
                                    <TableCell onClick={(e) => e.stopPropagation()}>
                                        <IconButton
                                            onClick={(e) => handleInterviewClick(e, candidate._id)}
                                            size="small"
                                        >
                                            <InterviewIcon color="primary" />
                                        </IconButton>
                                        <IconButton
                                            onClick={(e) => handleStageClick(e, candidate._id)}
                                            size="small"
                                        >
                                            <StageIcon color="secondary" />
                                        </IconButton>
                                        <IconButton
                                            onClick={(e) => handleRemarksClick(e, candidate._id)}
                                            size="small"
                                        >
                                            <MoreIcon color="action" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Dialog 
                open={openDetailsDialog} 
                onClose={handleCloseDetails} 
                maxWidth="md" 
                fullWidth
            >
                {selectedCandidate && (
                    <>
                        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                                {selectedCandidate.firstName.charAt(0)}
                            </Avatar>
                            <Box>
                                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                    {`${selectedCandidate.firstName} ${selectedCandidate.lastName}`}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {selectedCandidate.experience} | {selectedCandidate.source}
                                </Typography>
                            </Box>
                        </DialogTitle>
                        <Divider />
                        <DialogContent>
                            <Grid container spacing={3} sx={{ mt: 1 }}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Personal Information</Typography>
                                    <List>
                                        <ListItem>
                                            <ListItemIcon><EmailIcon /></ListItemIcon>
                                            <ListItemText 
                                                primary="Email" 
                                                secondary={selectedCandidate.email || 'N/A'} 
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon><PhoneIcon /></ListItemIcon>
                                            <ListItemText 
                                                primary="Phone" 
                                                secondary={selectedCandidate.mobile || 'N/A'} 
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon><LocationIcon /></ListItemIcon>
                                            <ListItemText 
                                                primary="Location" 
                                                secondary={selectedCandidate.currentLocation || 'N/A'} 
                                            />
                                        </ListItem>
                                    </List>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Professional Information</Typography>
                                    <List>
                                        <ListItem>
                                            <ListItemIcon><WorkIcon /></ListItemIcon>
                                            <ListItemText 
                                                primary="Experience" 
                                                secondary={selectedCandidate.experience || 'N/A'} 
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon><PersonIcon /></ListItemIcon>
                                            <ListItemText 
                                                primary="Recruiter" 
                                                secondary={selectedCandidate.owner || 'N/A'} 
                                            />
                                        </ListItem>
                                        {selectedCandidate.resume?.path && (
                                            <ListItem>
                                                <ListItemIcon><ResumeIcon /></ListItemIcon>
                                                <ListItemText 
                                                    primary="Resume" 
                                                    secondary={
                                                        <Button 
                                                            variant="text" 
                                                            onClick={() => window.open(`http://localhost:5000/${selectedCandidate.resume.path}`, '_blank')}
                                                        >
                                                            View Resume
                                                        </Button>
                                                    } 
                                                />
                                            </ListItem>
                                        )}
                                    </List>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <Divider />
                        <DialogActions>
                            <Button onClick={handleCloseDetails}>Close</Button>
                            <Button 
                                variant="contained" 
                                onClick={() => {
                                    handleCloseDetails();
                                    handleStageClick(null, selectedCandidate._id);
                                }}
                            >
                                Change Stage
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Box>
    );
};

export default CandidatesByStage;