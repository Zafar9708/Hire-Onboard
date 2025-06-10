
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
import { fetchCandidateById, fetchCandidateResume } from "../utils/api";
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

  const { data: resume, isLoading: resumeLoading } = useQuery({
    queryKey: ['resume', id],
    queryFn: () => fetchCandidateResume(id),
    enabled: !!candidate && tabValue === 1 // Only fetch when candidate is loaded and on resume tab
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDownloadResume = () => {
    if (resume?.path) {
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = `http://localhost:8000/${resume.path.replace(/\\/g, '/')}`;
      link.download = `${candidate.firstName}_${candidate.lastName}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShareResume = () => {
    if (resume?.path) {
      const resumeUrl = `http://localhost:8000/${resume.path.replace(/\\/g, '/')}`;
      
      if (navigator.share) {
        navigator.share({
          title: `${candidate.firstName} ${candidate.lastName}'s Resume`,
          text: `Check out ${candidate.firstName}'s resume`,
          url: resumeUrl,
        }).catch(console.error);
      } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(resumeUrl).then(() => {
          alert('Resume link copied to clipboard!');
        }).catch(() => {
          alert(`Resume URL: ${resumeUrl}`);
        });
      }
    }
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

  const resumeUrl = resume?.path 
    ? `http://localhost:8000/${resume.path.replace(/\\/g, '/')}`
    : null;

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
                  <Button 
                    variant="contained" 
                    startIcon={<DownloadIcon />} 
                    onClick={handleDownloadResume}
                    disabled={!resume?.path || resumeLoading}
                  >
                    {resumeLoading ? 'Loading...' : 'Download'}
                  </Button>
                </Box>

                <ResumeViewer>
                  <ResumeToolbar>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button size="small" variant="outlined" startIcon={<FileIcon />}>Original</Button>
                      <Button size="small" variant="outlined" startIcon={<PdfIcon />}>PDF</Button>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton 
                        size="small" 
                        onClick={handleDownloadResume}
                        disabled={!resume?.path || resumeLoading}
                      >
                        <DownloadIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={handleShareResume}
                        disabled={!resume?.path || resumeLoading}
                      >
                        <ShareIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </ResumeToolbar>
                  <ResumeContent>
                    {resumeLoading ? (
                      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <CircularProgress />
                      </Box>
                    ) : resumeUrl ? (
                      <iframe 
                        src={`https://docs.google.com/gview?url=${encodeURIComponent(resumeUrl)}&embedded=true`}
                        style={{ width: '100%', height: '100%', border: 'none' }}
                        title="Resume Viewer"
                      />
                    ) : (
                      <Box textAlign="center" pt={4}>
                        <Typography variant="h6" color="textSecondary">
                          No resume available for this candidate
                        </Typography>
                        <Typography variant="body2" color="textSecondary" mt={2}>
                          Upload a resume to view it here
                        </Typography>
                      </Box>
                    )}
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