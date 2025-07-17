import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Typography, Card, CardContent, Paper, Avatar, CircularProgress,
  Chip, Button, IconButton, Divider, useTheme, styled, Collapse,
  List, ListItem, ListItemIcon, ListItemText, Tooltip, Badge
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  People as PeopleIcon,
  VideoCall as VideoIcon,
  Email as EmailIcon,
  MoreVert as MoreIcon,
  Notes as NotesIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  Language as LanguageIcon,
  Description as DescriptionIcon,
  EventNote as EventNoteIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import axios from 'axios';

const InterviewCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  transition: 'all 0.3s ease',
  borderLeft: `4px solid ${theme.palette.warning.main}`,
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[6],
    borderColor: theme.palette.secondary.main
  }
}));

const StatusBadge = styled(Chip)(({ theme }) => ({
  fontWeight: 600,
  backgroundColor: `${theme.palette.warning.light}20`,
  color: theme.palette.warning.dark,
}));

const PlatformIcon = ({ platform }) => {
  switch(platform) {
    case 'google_meet':
      return <VideoIcon color="error" />;
    case 'zoom':
      return <VideoIcon color="primary" />;
    case 'microsoft_teams':
      return <VideoIcon color="info" />;
    default:
      return <VideoIcon />;
  }
};

const UpcomingInterviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedInterview, setExpandedInterview] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.get('https://hire-onboardbackend-production.up.railway.app/api/interviews/upcoming');
        setInterviews(response.data.data);
      } catch (err) {
        setError('Failed to fetch upcoming interviews. Please try again.');
        console.error('Error fetching upcoming interviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleRefresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://hire-onboardbackend-production.up.railway.app/api/interviews/upcoming');
      setInterviews(response.data.data);
    } catch (err) {
      setError('Failed to refresh upcoming interviews.');
      console.error('Error refreshing upcoming interviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExpandClick = (interviewId) => {
    setExpandedInterview(expandedInterview === interviewId ? null : interviewId);
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh'
      }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        textAlign: 'center',
        p: 3
      }}>
        <Typography variant="h6" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleRefresh}
          startIcon={<RefreshIcon />}
          sx={{ borderRadius: 2, px: 4 }}
        >
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1200, margin: '0 auto' }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 4,
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Go back">
            <IconButton 
              onClick={() => navigate(-1)} 
              sx={{ 
                mr: 2,
                backgroundColor: theme.palette.action.hover,
                '&:hover': {
                  backgroundColor: theme.palette.action.selected
                }
              }}
            >
              <BackIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Upcoming Interviews
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Badge 
            badgeContent={interviews.length} 
            color="warning"
            sx={{ 
              '& .MuiBadge-badge': { 
                fontSize: '0.9rem', 
                height: 26, 
                minWidth: 26,
                borderRadius: 13,
                padding: '0 8px'
              } 
            }}
          >
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              sx={{ borderRadius: 2 }}
            >
              Refresh
            </Button>
          </Badge>
        </Box>
      </Box>

      {interviews.length === 0 ? (
        <Paper 
          elevation={0}
          sx={{ 
            p: 6, 
            textAlign: 'center',
            borderRadius: 3,
            backgroundColor: theme.palette.background.paper,
            border: `1px dashed ${theme.palette.divider}`
          }}
        >
          <Box sx={{ 
            width: 100, 
            height: 100, 
            borderRadius: '50%', 
            backgroundColor: theme.palette.action.hover,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3
          }}>
            <CalendarIcon sx={{ fontSize: 48, color: theme.palette.text.secondary }} />
          </Box>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            No Upcoming Interviews
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 500, margin: '0 auto' }}>
            You don't have any interviews scheduled for the near future.
          </Typography>
        </Paper>
      ) : (
        <Box>
          {interviews.map((interview) => (
            <InterviewCard key={interview._id} elevation={2}>
              <CardContent>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: 2,
                  mb: 2
                }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {interview.candidate.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                      <EmailIcon fontSize="small" sx={{ mr: 1 }} />
                      {interview.candidate.email}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <StatusBadge 
                      label="Upcoming" 
                      size="medium"
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleExpandClick(interview._id)}
                      sx={{
                        transition: 'transform 0.3s',
                        transform: expandedInterview === interview._id ? 'rotate(180deg)' : 'none'
                      }}
                    >
                      {expandedInterview === interview._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 3, 
                  mb: 2,
                  '& > div': {
                    display: 'flex',
                    alignItems: 'center'
                  }
                }}>
                  <Tooltip title="Interview Date">
                    <Box>
                      <CalendarIcon fontSize="small" sx={{ mr: 1, color: theme.palette.text.secondary }} />
                      <Typography variant="body2">
                        {formatDate(interview.date)}
                      </Typography>
                    </Box>
                  </Tooltip>
                  <Tooltip title="Start Time">
                    <Box>
                      <TimeIcon fontSize="small" sx={{ mr: 1, color: theme.palette.text.secondary }} />
                      <Typography variant="body2">
                        {formatTime(interview.startTime)} ({interview.timezone})
                      </Typography>
                    </Box>
                  </Tooltip>
                  <Tooltip title="Duration">
                    <Box>
                      <ScheduleIcon fontSize="small" sx={{ mr: 1, color: theme.palette.text.secondary }} />
                      <Typography variant="body2">
                        {interview.duration} minutes
                      </Typography>
                    </Box>
                  </Tooltip>
                  <Tooltip title="Platform">
                    <Box>
                      <PlatformIcon platform={interview.platform} sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        {interview.platform.replace('_', ' ')}
                      </Typography>
                    </Box>
                  </Tooltip>
                </Box>

                <Collapse in={expandedInterview === interview._id} timeout="auto" unmountOnExit>
                  <Box sx={{ mt: 2, pl: 1, pr: 1 }}>
                    <Divider sx={{ mb: 2 }} />
                    
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                      <PeopleIcon sx={{ mr: 1 }} /> Interviewers
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: 1, 
                      mb: 3 
                    }}>
                      {interview.interviewers.map((interviewer) => (
                        <Chip
                          key={interviewer._id}
                          avatar={<Avatar alt={interviewer.name} sx={{ width: 24, height: 24 }}>{interviewer.name.charAt(0)}</Avatar>}
                          label={interviewer.name}
                          variant="outlined"
                          size="medium"
                          sx={{ 
                            borderRadius: 1,
                            backgroundColor: theme.palette.action.hover
                          }}
                        />
                      ))}
                    </Box>

                    {interview.meetingLink && (
                      <>
                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                          <VideoIcon sx={{ mr: 1 }} /> Meeting Link
                        </Typography>
                        <Button
                          variant="outlined"
                          startIcon={<PlatformIcon platform={interview.platform} />}
                          href={interview.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ 
                            mb: 3,
                            borderRadius: 2,
                            textTransform: 'none'
                          }}
                        >
                          Join {interview.platform.replace('_', ' ')} Meeting
                        </Button>
                      </>
                    )}

                    {interview.notes && (
                      <>
                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                          <NotesIcon sx={{ mr: 1 }} /> Notes
                        </Typography>
                        <Paper 
                          elevation={0}
                          sx={{ 
                            p: 2,
                            mb: 3,
                            borderRadius: 2,
                            backgroundColor: theme.palette.background.default,
                            whiteSpace: 'pre-wrap'
                          }}
                        >
                          {interview.notes}
                        </Paper>
                      </>
                    )}

                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mt: 2
                    }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                        <PersonIcon fontSize="small" sx={{ mr: 0.5 }} />
                        Scheduled by: {interview.scheduledBy}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<EmailIcon />}
                          onClick={() => console.log('Resend email')}
                          sx={{ borderRadius: 2 }}
                        >
                          Reminder
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          endIcon={<MoreIcon />}
                          onClick={() => navigate(`/interviews/${interview._id}`)}
                          sx={{ borderRadius: 2 }}
                        >
                          Details
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Collapse>
              </CardContent>
            </InterviewCard>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default UpcomingInterviews;