
// import React from "react";
// import {
//     Box,
//     Avatar,
//     Typography,
//     Divider,
//     Chip,
//     Tabs,
//     Tab,
//     Button,
//     Container,
//     Stack,
//     Card,
//     CardContent,
//     TextField,
//     Grid,
//     IconButton,
//     CircularProgress,
// } from "@mui/material";
// import {
//     Email as EmailIcon,
//     Phone as PhoneIcon,
//     Work as WorkIcon,
//     School as EducationIcon,
//     LocationOn as LocationIcon,
//     CalendarToday as DateIcon,
//     Person as PersonIcon,
//     Description as NotesIcon,
//     ArrowBack as BackIcon,
//     Add as AddIcon,
//     FileDownload as DownloadIcon,
//     Schedule as ScheduleIcon,
//     MoreVert as MoreIcon,
//     Chat as MessageIcon,
//     WhatsApp as WhatsAppIcon,
//     Label as TagIcon,
//     AttachFile as AttachFileIcon,
// } from "@mui/icons-material";
// import { useParams, useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { fetchCandidateById } from "../utils/api"; // Adjust path as needed

// const CandidateDetailsPage = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [tabValue, setTabValue] = React.useState(0);
//     const [resumeTabValue, setResumeTabValue] = React.useState(0);

//     const { data: candidate, isLoading, error } = useQuery({
//         queryKey: ['candidate', id],
//         queryFn: () => fetchCandidateById(id),
//     });

//     const handleTabChange = (event, newValue) => {
//         setTabValue(newValue);
//     };

//     const handleResumeTabChange = (event, newValue) => {
//         setResumeTabValue(newValue);
//     };

//     if (isLoading) {
//         return (
//             <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
//                 <CircularProgress />
//             </Box>
//         );
//     }

//     if (error) {
//         return (
//             <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
//                 <Typography color="error">{error.message}</Typography>
//             </Box>
//         );
//     }

//     if (!candidate) return null;

//     return (
//         <Container maxWidth="xl" sx={{ py: 4, px: 0, ml: 15 }}>
//             <Button
//                 startIcon={<BackIcon />}
//                 onClick={() => navigate(-1)}
//                 sx={{ mb: 3, ml: 2 }}
//             >
//                 Back to Candidates
//             </Button>

//             <Grid container spacing={2} sx={{ px: 2 }}>
//                 <Grid item xs={12} md={8}>
//                     <Card sx={{ mb: 3 }}>
//                         <CardContent>
//                             <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
//                                 <Avatar
//                                     sx={{
//                                         width: 80,
//                                         height: 80,
//                                         bgcolor: "primary.main",
//                                         fontSize: "2rem",
//                                     }}
//                                 >
//                                     {candidate.firstName.charAt(0)}
//                                 </Avatar>
//                                 <Box>
//                                     <Typography variant="h4" fontWeight="bold">
//                                         {`${candidate.firstName} ${candidate.middleName || ""} ${candidate.lastName}`}
//                                     </Typography>
//                                     <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
//                                         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                                             <EmailIcon fontSize="small" color="primary" />
//                                             <Typography variant="body2">{candidate.email}</Typography>
//                                         </Box>
//                                         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                                             <PhoneIcon fontSize="small" color="primary" />
//                                             <Typography variant="body2">{candidate.mobile}</Typography>
//                                         </Box>
//                                     </Box>
//                                 </Box>
//                             </Box>
//                         </CardContent>
//                     </Card>

//                     <Tabs
//                         value={tabValue}
//                         onChange={handleTabChange}
//                         sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
//                     >
//                         <Tab label="Profile" />
//                         <Tab label="Messages" />
//                         <Tab label="Feedback" />
//                         <Tab label="Documents" />
//                         <Tab label="Engagement" />
//                         <Tab label="Activity" />
//                     </Tabs>

//                     {tabValue === 0 && (
//                         <Box>
//                             <Card sx={{ mb: 3 }}>
//                                 <CardContent>
//                                     <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
//                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                             <DateIcon color="primary" />
//                                             <Typography>Available to join (in Days) - {candidate.availableToJoin} days</Typography>
//                                         </Box>
//                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                             <WorkIcon color="primary" />
//                                             <Typography>Experience - {candidate.experience}</Typography>
//                                         </Box>
//                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                             <LocationIcon color="primary" />
//                                             <Typography>{candidate.currentLocation}</Typography>
//                                         </Box>
//                                     </Stack>
//                                 </CardContent>
//                             </Card>

//                             <Card sx={{ mb: 3 }}>
//                                 <CardContent>
//                                     <Stack direction="row" spacing={2}>
//                                         <Button
//                                             variant="outlined"
//                                             startIcon={<AddIcon />}
//                                             endIcon={<WorkIcon />}
//                                             fullWidth
//                                         >
//                                             Add Experience
//                                         </Button>
//                                         <Button
//                                             variant="outlined"
//                                             startIcon={<AddIcon />}
//                                             endIcon={<EducationIcon />}
//                                             fullWidth
//                                         >
//                                             Add Education
//                                         </Button>
//                                     </Stack>
//                                 </CardContent>
//                             </Card>

//                             <Card sx={{ mb: 3 }}>
//                                 <CardContent>
//                                     <Typography variant="h6" gutterBottom fontWeight="bold">
//                                         Skills
//                                     </Typography>
//                                     <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//                                         {candidate.skills?.map((skill, index) => (
//                                             <Chip
//                                                 key={index}
//                                                 label={skill}
//                                                 color="primary"
//                                                 variant="outlined"
//                                                 size="small"
//                                             />
//                                         ))}
//                                     </Box>
//                                 </CardContent>
//                             </Card>

//                             <Card sx={{ mb: 3 }}>
//                                 <CardContent>
//                                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
//                                         <TagIcon color="primary" />
//                                         <Typography variant="h6" fontWeight="bold">Tags</Typography>
//                                         <Button size="small" startIcon={<AddIcon />}>Add Tag</Button>
//                                     </Box>
//                                     <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//                                         {candidate.tags?.map((tag, index) => (
//                                             <Chip
//                                                 key={index}
//                                                 label={tag}
//                                                 color="secondary"
//                                                 size="small"
//                                                 onDelete={() => { }}
//                                             />
//                                         ))}
//                                     </Box>
//                                 </CardContent>
//                             </Card>

//                             <Card sx={{ mb: 3 }}>
//                                 <CardContent>
//                                     <Tabs
//                                         value={resumeTabValue}
//                                         onChange={handleResumeTabChange}
//                                     >
//                                         <Tab label="Resume" />
//                                         <Tab label="Application Form" />
//                                     </Tabs>
//                                     <Divider sx={{ my: 2 }} />
//                                     <Box>
//                                         {resumeTabValue === 0 && (
//                                             <Box>
//                                                 <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//                                                     <Button
//                                                         variant="outlined"
//                                                         startIcon={<DownloadIcon />}
//                                                         sx={{ mb: 2 }}
//                                                     >
//                                                         Download Resume
//                                                     </Button>
//                                                 </Box>
//                                                 <Typography variant="body1">
//                                                     {candidate.resume?.path?.split(/[/\\]/).pop()}
//                                                 </Typography>
//                                             </Box>
//                                         )}
//                                         {resumeTabValue === 1 && (
//                                             <Box>
//                                                 <Typography variant="body1">
//                                                     This is where the application form would be displayed.
//                                                 </Typography>
//                                             </Box>
//                                         )}
//                                     </Box>
//                                 </CardContent>
//                             </Card>
//                         </Box>
//                     )}

//                     {tabValue >= 1 && tabValue <= 5 && (
//                         <Card>
//                             <CardContent>
//                                 <Typography variant="h6">
//                                     {["Messages", "Feedback", "Documents", "Engagement", "Activity"][tabValue - 1]} content will go here
//                                 </Typography>
//                             </CardContent>
//                         </Card>
//                     )}
//                 </Grid>

//                 <Grid item xs={12} md={4}>
//                     <Card sx={{ mb: 2 }}>
//                         <CardContent>
//                             <Grid container spacing={2}>
//                                 <Grid item xs={6}>
//                                     <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
//                                         Hiring Stage
//                                     </Typography>
//                                     <Stack direction="row" spacing={1}>
//                                         <Chip
//                                             label={candidate.stage}
//                                             color={
//                                                 candidate.stage === "Hired"
//                                                     ? "success"
//                                                     : candidate.stage === "Archived"
//                                                         ? "default"
//                                                         : "primary"
//                                             }
//                                             sx={{ fontWeight: "bold", minWidth: 100 }}
//                                         />
//                                         <Button variant="outlined" color="secondary" size="small">
//                                             Archive
//                                         </Button>
//                                     </Stack>
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
//                                         Interactions
//                                     </Typography>
//                                     <Stack direction="row" spacing={1} alignItems="center">
//                                         <Button variant="contained" startIcon={<ScheduleIcon />} size="small">
//                                             Schedule
//                                         </Button>
//                                         <IconButton size="small"><MessageIcon color="primary" /></IconButton>
//                                         <IconButton size="small"><WhatsAppIcon color="success" /></IconButton>
//                                         <IconButton size="small"><MoreIcon /></IconButton>
//                                     </Stack>
//                                 </Grid>
//                             </Grid>
//                         </CardContent>
//                     </Card>

//                     <Card sx={{ maxWidth: 600, margin: "auto", mt: 6, p: 3 }}>
//                         <CardContent>
//                             <Typography variant="h6" gutterBottom fontWeight="bold" align="center">
//                                 Add Note
//                             </Typography>
//                             <TextField
//                                 multiline
//                                 rows={8}
//                                 fullWidth
//                                 placeholder="Add your notes here..."
//                                 InputProps={{
//                                     startAdornment: <NotesIcon color="primary" sx={{ mr: 1 }} />,
//                                 }}
//                                 sx={{
//                                     backgroundColor: 'background.paper',
//                                     borderRadius: 1,
//                                     boxShadow: 1,
//                                     mb: 3,
//                                 }}
//                             />
//                             <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                                 <Button variant="contained" sx={{ width: "200px" }}>
//                                     Save Note
//                                 </Button>
//                             </Box>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             </Grid>

//             <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3, px: 2 }}>
//                 <Button variant="outlined" color="secondary">Archive</Button>
//                 <Button variant="contained" color="primary">Edit Profile</Button>
//             </Box>
//         </Container>
//     );
// };

// export default CandidateDetailsPage;


//------

import React from "react";
import {
  Box,
  Avatar,
  Typography,
  Divider,
  Chip,
  Tabs,
  Tab,
  Button,
  Container,
  Card,
  CardContent,
  TextField,
  Grid,
  CircularProgress,
  Badge,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Breadcrumbs,
  Link,
  Tooltip,
  Fab,
  Paper,
  IconButton
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Work as WorkIcon,
  School as EducationIcon,
  LocationOn as LocationIcon,
  CalendarToday as DateIcon,
  Person as PersonIcon,
  Description as NotesIcon,
  ArrowBack as BackIcon,
  Add as AddIcon,
  Schedule as ScheduleIcon,
  Chat as MessageIcon,
  WhatsApp as WhatsAppIcon,
  Edit as EditIcon,
  Share as ShareIcon,
  Verified as VerifiedIcon,
  MonetizationOn as SalaryIcon,
  Flag as NoticePeriodIcon,
  NoteAdd as NoteAddIcon,
  Description as DocumentIcon,
  VideoCall as VideoIcon,
  Timeline as TimelineIcon,
  BarChart as BarChartIcon,
  AccountTree as WorkflowIcon,
  CheckCircle as HiredIcon,
  Archive as ArchiveIcon,
  Delete as RejectIcon,
  Error as OnHoldIcon,
  GetApp as DownloadIcon,
  InsertDriveFile as FileIcon,
  PictureAsPdf as PdfIcon,
  ThumbUp as LikeIcon,
  Comment as CommentIcon,
  Send as SendIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCandidateById } from "../utils/api";
import { styled } from '@mui/material/styles';

// Custom styled components
const GradientCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[6],
}));

const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: theme.shape.borderRadius * 2,
}));

const StyledTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    height: 4,
    borderRadius: 2,
  },
});

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: theme.palette.text.secondary,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const StatusChip = styled(Chip)(({ theme, status }) => {
  let color;
  switch (status) {
    case 'Hired': color = theme.palette.success.main; break;
    case 'Interview': color = theme.palette.info.main; break;
    case 'Rejected': color = theme.palette.error.main; break;
    case 'On Hold': color = theme.palette.warning.main; break;
    case 'Archived': color = theme.palette.text.disabled; break;
    default: color = theme.palette.primary.main;
  }
  return {
    backgroundColor: color,
    color: theme.palette.common.white,
    fontWeight: 'bold',
    borderRadius: theme.shape.borderRadius,
  };
});

const ResumeViewer = styled(Box)({
  height: '500px',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column'
});

const ResumeToolbar = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1),
  backgroundColor: theme.palette.grey[100],
  borderBottom: '1px solid #e0e0e0'
}));

const ResumeContent = styled(Box)({
  flex: 1,
  overflow: 'auto',
  padding: '20px',
  backgroundColor: '#fff',
  backgroundImage: 'linear-gradient(#f5f5f5 1px, transparent 1px), linear-gradient(90deg, #f5f5f5 1px, transparent 1px)',
  backgroundSize: '20px 20px'
});

const CandidateDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = React.useState(0);

  const { data: candidate, isLoading, error } = useQuery({
    queryKey: ['candidate', id],
    queryFn: () => fetchCandidateById(id),
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDownloadResume = () => {
    console.log("Downloading resume...");
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error" variant="h5">
          {error.message}
        </Typography>
      </Box>
    );
  }

  if (!candidate) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 3, px: { xs: 2, sm: 3 } }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link color="inherit" onClick={() => navigate('/')}>Dashboard</Link>
        <Link color="inherit" onClick={() => navigate('/candidates')}>Candidates</Link>
        <Typography color="text.primary">{candidate.firstName} {candidate.lastName}</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button startIcon={<BackIcon />} onClick={() => navigate(-1)} variant="outlined">
          Back
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Profile Header */}
          <GradientCard sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: "flex", flexDirection: { xs: 'column', sm: 'row' }, alignItems: "center", gap: 3 }}>
                <Badge
                  overlap="circular"
                  badgeContent={
                    <Tooltip title="Verified profile">
                      <VerifiedIcon color="primary" sx={{ bgcolor: 'white', borderRadius: '50%' }} />
                    </Tooltip>
                  }
                >
                  <Avatar sx={{ width: 80, height: 80, fontSize: "2rem", border: '3px solid white' }}>
                    {candidate.firstName.charAt(0)}{candidate.lastName.charAt(0)}
                  </Avatar>
                </Badge>
                <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                  <Typography variant="h4" fontWeight="bold" sx={{ color: 'white' }}>
                    {candidate.firstName} {candidate.lastName}
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
                    {candidate.currentJobTitle} at {candidate.currentCompany}
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: 'wrap', gap: 2, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <EmailIcon fontSize="small" sx={{ color: 'rgba(255,255,255,0.8)' }} />
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                        {candidate.email}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <PhoneIcon fontSize="small" sx={{ color: 'rgba(255,255,255,0.8)' }} />
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                        {candidate.mobile}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </GradientCard>

          {/* Tabs */}
          <StyledTabs value={tabValue} onChange={handleTabChange} variant="scrollable" sx={{ mb: 2 }}>
            <StyledTab label="Profile" icon={<PersonIcon />} iconPosition="start" />
            <StyledTab label="Resume" icon={<DocumentIcon />} iconPosition="start" />
            <StyledTab label="Messages" icon={<MessageIcon />} iconPosition="start" />
            <StyledTab label="Activity" icon={<TimelineIcon />} iconPosition="start" />
          </StyledTabs>

          {/* Tab Content */}
          {tabValue === 0 && (
            <Box>
              {/* Personal Details */}
              <GlassCard sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon color="primary" /> Personal Details
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <List dense>
                        <ListItem>
                          <ListItemIcon><DateIcon color="primary" /></ListItemIcon>
                          <ListItemText
                            primary="Date of Birth"
                            secondary={
                              candidate.dob
                                ? new Date(candidate.dob).toLocaleDateString(undefined, {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })
                                : 'Not specified'
                            }
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><LocationIcon color="primary" /></ListItemIcon>
                          <ListItemText primary="Location" secondary={candidate.currentLocation} />
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <List dense>
                        <ListItem>
                          <ListItemIcon><NoticePeriodIcon color="primary" /></ListItemIcon>
                          <ListItemText primary="Notice Period" secondary={`${candidate.availableToJoin} days`} />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><SalaryIcon color="primary" /></ListItemIcon>
                          <ListItemText primary="Current Salary" secondary={candidate.currentSalary || 'Not specified'} />
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </CardContent>
              </GlassCard>

              {/* Skills */}
              <GlassCard sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BarChartIcon color="primary" /> Skills & Expertise
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {candidate.skills?.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        color={index % 2 === 0 ? "primary" : "secondary"}
                        variant={index % 3 === 0 ? "filled" : "outlined"}
                        sx={{ borderRadius: 1 }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </GlassCard>
            </Box>

          )}

          {tabValue === 1 && (
            <GlassCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold">Resume</Typography>
                  <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleDownloadResume}>
                    Download
                  </Button>
                </Box>

                <ResumeViewer>
                  <ResumeToolbar>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button size="small" variant="outlined" startIcon={<FileIcon />}>Original</Button>
                      <Button size="small" variant="outlined" startIcon={<PdfIcon />}>PDF</Button>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small"><DownloadIcon fontSize="small" /></IconButton>
                      <IconButton size="small"><ShareIcon fontSize="small" /></IconButton>
                    </Box>
                  </ResumeToolbar>
                  <ResumeContent>
                    <Typography variant="h4" gutterBottom>{candidate.firstName} {candidate.lastName}</Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      {candidate.currentJobTitle} | {candidate.currentCompany}
                    </Typography>

                    <Box sx={{ my: 3 }}>
                      <Typography variant="h5" gutterBottom>Professional Summary</Typography>
                      <Typography variant="body1">
                        {candidate.summary || "Experienced professional with expertise in relevant technologies..."}
                      </Typography>
                    </Box>

                    <Box sx={{ my: 3 }}>
                      <Typography variant="h5" gutterBottom>Work Experience</Typography>
                      {candidate.experienceHistory?.map((exp, i) => (
                        <Box key={i} sx={{ mb: 2 }}>
                          <Typography variant="h6">{exp.jobTitle}</Typography>
                          <Typography variant="subtitle1" color="text.secondary">
                            {exp.company} | {exp.startDate} - {exp.endDate || 'Present'}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>{exp.description}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </ResumeContent>
                </ResumeViewer>
              </CardContent>
            </GlassCard>
          )}

          {tabValue === 2 && (
            <GlassCard>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>Messages</Typography>
                <List>
                  {[
                    { sender: 'You', message: 'Hi, when are you available?', time: '10:30 AM', icon: <MessageIcon color="primary" /> },
                    { sender: candidate.firstName, message: 'I can do Monday or Wednesday', time: '10:45 AM', icon: <MessageIcon color="secondary" /> }
                  ].map((msg, i) => (
                    <ListItem key={i} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>{msg.icon}</ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography fontWeight="bold">{msg.sender}</Typography>
                            <Typography variant="caption" color="text.secondary">{msg.time}</Typography>
                          </Box>
                        }
                        secondary={msg.message}
                      />
                    </ListItem>
                  ))}
                </List>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type your message..."
                  sx={{ mt: 2 }}
                  InputProps={{
                    endAdornment: (
                      <IconButton color="primary"><SendIcon /></IconButton>
                    )
                  }}
                />
              </CardContent>
            </GlassCard>
          )}

          {tabValue === 3 && (
            <GlassCard>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>Activity Timeline</Typography>
                <Box sx={{ position: 'relative', pl: 3 }}>
                  <Box sx={{
                    position: 'absolute',
                    left: 20,
                    top: 0,
                    bottom: 0,
                    width: 2,
                    bgcolor: 'primary.main',
                    borderRadius: 1,
                  }} />
                  {[
                    { icon: <MessageIcon color="primary" />, title: 'Message sent', time: 'Today, 10:30 AM' },
                    { icon: <ScheduleIcon color="secondary" />, title: 'Interview scheduled', time: 'Yesterday, 3:45 PM' }
                  ].map((item, i) => (
                    <Box key={i} sx={{ position: 'relative', mb: 3, pl: 4 }}>
                      <Box sx={{
                        position: 'absolute',
                        left: 12,
                        top: 4,
                        width: 16,
                        height: 16,
                        bgcolor: 'background.paper',
                        border: '2px solid',
                        borderColor: 'primary.main',
                        borderRadius: '50%',
                        zIndex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        {item.icon}
                      </Box>
                      <Box>
                        <Typography fontWeight="bold">{item.title}</Typography>
                        <Typography variant="caption" color="text.secondary">{item.time}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </GlassCard>
          )}
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Status Card */}
          <Card sx={{ mb: 3, borderLeft: '4px solid', borderLeftColor: 'primary.main' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">Hiring Status</Typography>
                <StatusChip label={candidate.stage} status={candidate.stage} />
              </Box>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                <Button variant="contained" color="success" startIcon={<HiredIcon />} size="small">Hire</Button>
                <Button variant="contained" color="error" startIcon={<RejectIcon />} size="small">Reject</Button>
                <Button variant="contained" color="warning" startIcon={<OnHoldIcon />} size="small">Hold</Button>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                Current Stage: {candidate.stage}
              </Typography>
              <Box sx={{ width: '100%', height: 8, bgcolor: 'grey.200', borderRadius: 4, overflow: 'hidden', mb: 1 }}>
                <Box sx={{ width: '60%', height: '100%', bgcolor: 'primary.main' }} />
              </Box>
              <Typography variant="caption" color="text.secondary">3 of 5 stages completed</Typography>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Quick Actions</Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Button variant="outlined" startIcon={<ScheduleIcon />} fullWidth sx={{ py: 1.5 }}>Schedule</Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="outlined" startIcon={<MessageIcon />} fullWidth sx={{ py: 1.5 }}>Message</Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="outlined" startIcon={<VideoIcon />} fullWidth sx={{ py: 1.5 }}>Video Call</Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="outlined" startIcon={<WhatsAppIcon />} fullWidth sx={{ py: 1.5 }}>WhatsApp</Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">Notes</Typography>
                <Button size="small" startIcon={<NoteAddIcon />}>Add</Button>
              </Box>
              <TextField
                multiline
                rows={4}
                fullWidth
                placeholder="Add your notes..."
                variant="outlined"
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: <NotesIcon color="primary" sx={{ mr: 1 }} />,
                }}
              />
              <Button variant="contained" fullWidth>Save Note</Button>
              <List sx={{ mt: 2 }}>
                {[
                  { text: 'Candidate seems interested', author: 'John Smith', date: '2 hours ago' },
                ].map((note, i) => (
                  <ListItem key={i} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}><NotesIcon color="primary" fontSize="small" /></ListItemIcon>
                    <ListItemText
                      primary={note.text}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {note.author}
                          </Typography>
                          {` — ${note.date}`}
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Floating Actions */}
      <Fab color="primary" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <EditIcon />
      </Fab>
    </Container>
  );
};

export default CandidateDetailsPage;