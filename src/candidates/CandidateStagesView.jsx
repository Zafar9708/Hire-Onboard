// CandidateStagesView.js
import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Avatar,
    Chip,
    Divider,
    Button,
    IconButton,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Menu,
    CircularProgress,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Snackbar,
    Alert
} from "@mui/material";
import {
    ArrowBack as BackIcon,
    MoreVert as MoreIcon,
    AssignmentInd as InterviewIcon,
    ArrowForward as StageIcon,
    NoteAdd as RemarksIcon,
    FilterList as FilterIcon
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCandidates, updateCandidate } from "../utils/api";

const CandidateStagesView = () => {
    const { stage } = useParams();
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDetails, setOpenDetails] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    useEffect(() => {
        const loadCandidates = async () => {
            try {
                setLoading(true);
                const data = await fetchCandidates();
                // Filter candidates by stage if a specific stage is selected
                const filtered = stage 
                    ? data.filter(c => c.stage.toLowerCase() === stage.toLowerCase())
                    : data;
                setCandidates(filtered);
            } catch (err) {
                setError(err.message);
                showSnackbar(err.message, "error");
            } finally {
                setLoading(false);
            }
        };
        loadCandidates();
    }, [stage]);

    const showSnackbar = (message, severity = "success") => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const handleOpenMenu = (event, candidate) => {
        setSelectedCandidate(candidate);
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleOpenDetails = (candidate) => {
        setSelectedCandidate(candidate);
        setOpenDetails(true);
    };

    const handleCloseDetails = () => {
        setOpenDetails(false);
    };

    const handleMoveStage = async (newStage) => {
        try {
            const updatedCandidate = await updateCandidate(selectedCandidate._id, {
                stage: newStage
            });
            
            setCandidates(candidates.map(c => 
                c._id === selectedCandidate._id ? updatedCandidate : c
            ));
            
            showSnackbar(`Candidate moved to ${newStage} successfully!`);
            handleCloseMenu();
        } catch (error) {
            console.error("Error moving candidate:", error);
            showSnackbar(error.message, "error");
        }
    };

    const getStageColor = (stage) => {
        switch (stage.toLowerCase()) {
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
        <Box sx={{ p: 3 }}>
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
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
                    <BackIcon />
                </IconButton>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {stage ? `${stage.charAt(0).toUpperCase() + stage.slice(1)} Candidates` : "All Candidates"}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Button startIcon={<FilterIcon />} variant="outlined" sx={{ mr: 2 }}>
                    Filters
                </Button>
            </Box>

            {/* Candidate Cards */}
            <Box sx={{ 
                display: "grid", 
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr", lg: "1fr 1fr 1fr 1fr" },
                gap: 3 
            }}>
                {candidates.map((candidate) => (
                    <Card 
                        key={candidate._id}
                        sx={{ 
                            borderRadius: 2,
                            boxShadow: 3,
                            transition: "transform 0.2s",
                            ":hover": {
                                transform: "translateY(-4px)",
                                boxShadow: 6
                            }
                        }}
                    >
                        <CardContent sx={{ p: 3 }}>
                            {/* Candidate Header */}
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Avatar 
                                        sx={{ 
                                            bgcolor: "primary.main",
                                            width: 40,
                                            height: 40,
                                            mr: 2
                                        }}
                                    >
                                        {candidate.firstName.charAt(0)}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {`${candidate.firstName} ${candidate.lastName}`}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {candidate.experience} | {candidate.source}
                                        </Typography>
                                    </Box>
                                </Box>
                                <IconButton
                                    onClick={(e) => handleOpenMenu(e, candidate)}
                                    size="small"
                                >
                                    <MoreIcon />
                                </IconButton>
                            </Box>

                            {/* Stage Chip */}
                            <Chip
                                label={candidate.stage}
                                color={getStageColor(candidate.stage)}
                                size="small"
                                sx={{ 
                                    mb: 2,
                                    fontWeight: 600,
                                    textTransform: "capitalize"
                                }}
                            />

                            {/* Details */}
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    <strong>Email:</strong> {candidate.email}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    <strong>Phone:</strong> {candidate.mobile}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Owner:</strong> {candidate.owner}
                                </Typography>
                            </Box>

                            {/* Actions */}
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => handleOpenDetails(candidate)}
                                >
                                    View Details
                                </Button>
                                <Box>
                                    <IconButton size="small" sx={{ color: "primary.main" }}>
                                        <InterviewIcon />
                                    </IconButton>
                                    <IconButton size="small" sx={{ color: "secondary.main" }}>
                                        <StageIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* Candidate Details Dialog */}
            {selectedCandidate && (
                <Dialog 
                    open={openDetails} 
                    onClose={handleCloseDetails}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>
                        {`${selectedCandidate.firstName} ${selectedCandidate.lastName}`}
                        <Chip
                            label={selectedCandidate.stage}
                            color={getStageColor(selectedCandidate.stage)}
                            size="small"
                            sx={{ 
                                ml: 2,
                                fontWeight: 600,
                                textTransform: "capitalize"
                            }}
                        />
                    </DialogTitle>
                    <DialogContent dividers>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                Basic Information
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                                <Typography variant="body1">
                                    <strong>Email:</strong> {selectedCandidate.email}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Phone:</strong> {selectedCandidate.mobile}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Experience:</strong> {selectedCandidate.experience}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Source:</strong> {selectedCandidate.source}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Owner:</strong> {selectedCandidate.owner}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Available to Join:</strong> {selectedCandidate.availableToJoin} days
                                </Typography>
                            </Box>
                        </Box>

                        <Box>
                            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                Additional Information
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                <strong>Skills:</strong> {selectedCandidate.skills?.join(", ") || "N/A"}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Notes:</strong> {selectedCandidate.notes || "No notes available"}
                            </Typography>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDetails}>Close</Button>
                        <Button 
                            variant="contained" 
                            onClick={() => {
                                handleCloseDetails();
                                navigate(`/candidates/${selectedCandidate._id}`);
                            }}
                        >
                            Full Profile
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

            {/* Action Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={() => {
                    handleOpenDetails(selectedCandidate);
                    handleCloseMenu();
                }}>
                    <ListItemText>View Details</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => {
                    navigate(`/candidates/${selectedCandidate._id}`);
                    handleCloseMenu();
                }}>
                    <ListItemText>Open Full Profile</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleCloseMenu}>
                    <ListItemText>Schedule Interview</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleCloseMenu}>
                    <ListItemText>Add Notes</ListItemText>
                </MenuItem>
                
                {/* <MenuItem onClick={() => handleMoveStage("Sourced")}>
                    <ListItemText>Move to Sourced</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleMoveStage("Screening")}>
                    <ListItemText>Move to Screening</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleMoveStage("Interview")}>
                    <ListItemText>Move to Interview</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleMoveStage("Preboarding")}>
                    <ListItemText>Move to Preboarding</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleMoveStage("Hired")}>
                    <ListItemText>Move to Hired</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleMoveStage("Archived")}>
                    <ListItemText>Move to Archived</ListItemText>
                </MenuItem> */}
            </Menu>
        </Box>
    );
};

export default CandidateStagesView;


// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//     Box,
//     Typography,
//     Stepper,
//     Step,
//     StepLabel,
//     Avatar,
//     Divider,
//     Button,
//     Chip,
//     Paper,
//     List,
//     ListItem,
//     ListItemText,
//     ListItemIcon,
//     Snackbar,
//     Alert,
//     CircularProgress
// } from "@mui/material";
// import {
//     ArrowBack as BackIcon,
//     CheckCircle as CompletedIcon,
//     RadioButtonUnchecked as PendingIcon,
//     Schedule as CurrentIcon,
//     Description as ResumeIcon,
//     Email as EmailIcon,
//     Phone as PhoneIcon,
//     Person as PersonIcon,
//     Work as WorkIcon,
//     School as EducationIcon,
//     LocationOn as LocationIcon,
//     CalendarToday as DateIcon,
//     Comment as CommentIcon
// } from "@mui/icons-material";

// const STAGES = ["Sourced", "Screening", "Interview", "Preboarding", "Hired", "Archived"];

// const CandidateStagesView = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [candidate, setCandidate] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [activeStep, setActiveStep] = useState(0);
//     const [snackbar, setSnackbar] = useState({
//         open: false,
//         message: "",
//         severity: "success"
//     });

//     const showSnackbar = (message, severity = "success") => {
//         setSnackbar({ open: true, message, severity });
//     };

//     const handleCloseSnackbar = () => {
//         setSnackbar(prev => ({ ...prev, open: false }));
//     };

//     const getStageColor = (stage) => {
//         switch ((stage || '').toLowerCase()) {
//             case 'sourced': return 'primary';
//             case 'screening': return 'secondary';
//             case 'interview': return 'info';
//             case 'preboarding': return 'warning';
//             case 'hired': return 'success';
//             case 'archived': return 'default';
//             default: return 'primary';
//         }
//     };

//     const formatDate = (dateString) => {
//         if (!dateString) return "N/A";
//         try {
//             const date = new Date(dateString);
//             return date.toLocaleDateString('en-US', {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric'
//             });
//         } catch {
//             return "N/A";
//         }
//     };

//     useEffect(() => {
//         // Validate ID before making API call
//         if (!id || id === "undefined" || id.length !== 24) {
//             setError("Invalid candidate ID");
//             setLoading(false);
//             showSnackbar("Invalid candidate URL", "error");
//             return;
//         }

//         const fetchCandidateData = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);
                
//                 console.log(`Fetching candidate data for ID: ${id}`);
//                 const response = await fetch(`http://localhost:5000/api/candidates/${id}`, {
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 });
                
//                 if (!response.ok) {
//                     const errorData = await response.json().catch(() => ({}));
//                     throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//                 }
                
//                 const data = await response.json();
                
//                 if (!data || !data._id) {
//                     throw new Error('Invalid candidate data structure received');
//                 }
                
//                 setCandidate(data);
                
//                 const currentStageIndex = STAGES.findIndex(
//                     stage => stage.toLowerCase() === (data.stage || '').toLowerCase()
//                 );
//                 setActiveStep(Math.max(0, currentStageIndex));
//             } catch (err) {
//                 console.error("Error fetching candidate:", err);
//                 setError(err.message || 'Failed to fetch candidate data');
//                 showSnackbar(err.message || "Failed to load candidate data", "error");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCandidateData();
//     }, [id]);

//     if (loading) {
//         return (
//             <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//                 <CircularProgress size={60} />
//             </Box>
//         );
//     }

//     if (error) {
//         return (
//             <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" flexDirection="column">
//                 <Typography variant="h6" color="error" sx={{ mb: 2 }}>
//                     {error}
//                 </Typography>
//                 <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
//                     Candidate ID: {id || 'Not provided'}
//                 </Typography>
//                 <Button 
//                     variant="contained" 
//                     onClick={() => navigate('/candidates')}
//                     sx={{ mt: 2 }}
//                 >
//                     Back to Candidates List
//                 </Button>
//             </Box>
//         );
//     }

//     if (!candidate) {
//         return (
//             <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//                 <Typography variant="h6">Candidate data not available</Typography>
//             </Box>
//         );
//     }

//     return (
//         <Box sx={{ minHeight: '100vh', p: 4, backgroundColor: '#f5f7fa' }}>
//             {/* Header Section */}
//             <Box sx={{ maxWidth: 1200, mx: 'auto', mb: 4 }}>
//                 <Button startIcon={<BackIcon />} onClick={() => navigate(-1)}>
//                     Back
//                 </Button>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
//                     <Typography variant="h4" sx={{ fontWeight: 600 }}>
//                         {`${candidate.firstName} ${candidate.lastName}'s Journey`}
//                     </Typography>
//                     <Chip
//                         label={candidate.stage || 'Unknown Stage'}
//                         color={getStageColor(candidate.stage)}
//                         sx={{ fontWeight: 600, fontSize: '1rem', px: 2 }}
//                     />
//                 </Box>
//             </Box>

//             {/* Main Content */}
//             <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
//                 {/* Stage Timeline */}
//                 <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
//                     <Stepper activeStep={activeStep} alternativeLabel>
//                         {STAGES.map((label, index) => {
//                             const isCompleted = index < activeStep;
//                             const isCurrent = index === activeStep;
//                             const stageColor = getStageColor(label);

//                             return (
//                                 <Step key={label}>
//                                     <StepLabel
//                                         StepIconComponent={() => (
//                                             <Box sx={{
//                                                 width: 48,
//                                                 height: 48,
//                                                 borderRadius: '50%',
//                                                 display: 'flex',
//                                                 alignItems: 'center',
//                                                 justifyContent: 'center',
//                                                 backgroundColor: isCompleted ? `${stageColor}.main` : 'grey.200',
//                                                 color: isCompleted ? '#fff' : 'grey.500',
//                                                 border: isCurrent ? `3px solid ${stageColor}.main` : 'none'
//                                             }}>
//                                                 {isCompleted ? <CompletedIcon /> : isCurrent ? <CurrentIcon /> : <PendingIcon />}
//                                             </Box>
//                                         )}
//                                     >
//                                         {label}
//                                     </StepLabel>
//                                 </Step>
//                             );
//                         })}
//                     </Stepper>
//                 </Paper>

//                 {/* Candidate Details */}
//                 <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
//                         <Avatar sx={{ width: 80, height: 80, fontSize: '2rem', mr: 4 }}>
//                             {candidate.firstName?.charAt(0)}{candidate.lastName?.charAt(0)}
//                         </Avatar>
//                         <Box>
//                             <Typography variant="h4" sx={{ fontWeight: 700 }}>
//                                 {candidate.firstName} {candidate.lastName}
//                             </Typography>
//                             <Typography variant="h6" color="text.secondary">
//                                 {candidate.experience || 'No experience specified'} | {candidate.source || 'No source specified'}
//                             </Typography>
//                         </Box>
//                     </Box>

//                     <Divider sx={{ my: 3 }} />

//                     <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
//                         {/* Left Column */}
//                         <Box>
//                             <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>Personal Information</Typography>
//                             <List>
//                                 <ListItem>
//                                     <ListItemIcon><EmailIcon /></ListItemIcon>
//                                     <ListItemText primary="Email" secondary={candidate.email || 'N/A'} />
//                                 </ListItem>
//                                 <ListItem>
//                                     <ListItemIcon><PhoneIcon /></ListItemIcon>
//                                     <ListItemText primary="Phone" secondary={candidate.mobile || 'N/A'} />
//                                 </ListItem>
//                                 <ListItem>
//                                     <ListItemIcon><LocationIcon /></ListItemIcon>
//                                     <ListItemText primary="Location" secondary={candidate.currentLocation || 'N/A'} />
//                                 </ListItem>
//                             </List>
//                         </Box>

//                         {/* Right Column */}
//                         <Box>
//                             <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>Professional Information</Typography>
//                             <List>
//                                 <ListItem>
//                                     <ListItemIcon><WorkIcon /></ListItemIcon>
//                                     <ListItemText primary="Experience" secondary={candidate.experience || 'N/A'} />
//                                 </ListItem>
//                                 <ListItem>
//                                     <ListItemIcon><PersonIcon /></ListItemIcon>
//                                     <ListItemText primary="Recruiter" secondary={candidate.owner || 'N/A'} />
//                                 </ListItem>
//                                 {candidate.resume?.path && (
//                                     <ListItem>
//                                         <ListItemIcon><ResumeIcon /></ListItemIcon>
//                                         <ListItemText 
//                                             primary="Resume" 
//                                             secondary={
//                                                 <Button 
//                                                     variant="text" 
//                                                     onClick={() => window.open(`http://localhost:5000/${candidate.resume.path}`, '_blank')}
//                                                 >
//                                                     View Resume
//                                                 </Button>
//                                             } 
//                                         />
//                                     </ListItem>
//                                 )}
//                             </List>
//                         </Box>
//                     </Box>
//                 </Paper>
//             </Box>

//             <Snackbar
//                 open={snackbar.open}
//                 autoHideDuration={6000}
//                 onClose={handleCloseSnackbar}
//             >
//                 <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// };

// export default CandidateStagesView;