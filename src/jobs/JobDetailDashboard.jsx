
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box, Typography, Card, CardContent, Divider, Button,
  TextField, Avatar, Stack, IconButton, Paper, LinearProgress,
  Chip, useTheme, styled, alpha, CircularProgress
} from "@mui/material";
import {
  AccessTime as TimeIcon,
  RecordVoiceOver as InterviewIcon,
  HowToReg as OfferIcon,
  WorkOutline as PositionIcon,
  People as CandidateIcon,
  RateReview as ReviewIcon,
  Description as JobDescIcon,
  NoteAdd as NoteIcon,
  ChevronRight as ArrowIcon,
  Add as AddIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarToday as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  Group as GroupIcon,
  Timeline as TimelineIcon,
  BarChart as BarChartIcon,
  Assignment as AssignmentIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountIcon,
  MoreVert as MoreIcon
} from "@mui/icons-material";
import { fetchCandidatesByJob } from "../utils/api";

// Custom styled components
const GlassCard = styled(Card)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.85),
  backdropFilter: 'blur(12px)',
  borderRadius: '16px',
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 12px 40px ${alpha(theme.palette.common.black, 0.15)}`,
    borderColor: alpha(theme.palette.primary.main, 0.3)
  }
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.common.white,
  fontWeight: 600,
  textTransform: 'none',
  padding: '8px 20px',
  borderRadius: '12px',
  boxShadow: 'none',
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`
  }
}));

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showNoteForm, setShowNoteForm] = useState(false);
  const { id: jobId } = useParams();
  const [job, setJob] = useState(null);
  const [appliedCandidat, setAppliedCandidat] = useState([])
  const [closedPosition, setClosedPosition] = useState(0)
  const [acceptanceRate, setAcceptanceRate] = useState(0)
  const [interviews, setInterviews] = useState({
    online: 0,
    offline: 0,
    upcoming: 0,
    upcomingInterviews: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (jobId) {
          const jobResponse = await axios.get(`https://hire-onboardbackend-13.onrender.com/api/jobs/byId/${jobId}`);
          setJob(jobResponse.data.job);
          const data = await fetchCandidatesByJob(jobId);
          setAppliedCandidat(data);
        }

        const [onlineInterviewsRes, offlineInterviewsRes, upcomingInterviewsRes] = await Promise.all([
          axios.get('https://hire-onboardbackend-13.onrender.com/api/interviews/schedule'),
          axios.get('https://hire-onboardbackend-13.onrender.com/api/offline-interviews/get'),
          axios.get('https://hire-onboardbackend-13.onrender.com/api/interviews/upcoming')
        ]);

        // Count offline interviews from the array
        const offlineInterviewsCount = offlineInterviewsRes.data.data ? offlineInterviewsRes.data.data.length : 0;

        setInterviews({
          online: onlineInterviewsRes.data.count || 0,
          offline: offlineInterviewsCount, // Use the counted value
          upcoming: upcomingInterviewsRes.data.count || 0,
          upcomingInterviews: upcomingInterviewsRes.data.data || []
        });

      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [jobId]);

  function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
  }

  useEffect(() => {
    const filterC = appliedCandidat.filter((item) => item.stage === 'Hired')
    setClosedPosition(filterC.length)
    setAcceptanceRate(percentage(filterC.length, appliedCandidat.length))
  }, [appliedCandidat])

  // Calculate total interviews safely
  const totalInterviews = (interviews.online || 0) + (interviews.offline || 0);

  // Stats data with NaN protection
  const stats = {
    upcomingInterviews: interviews.upcoming || 0,
    totalInterviews: totalInterviews,
    onlineInterviews: interviews.online || 0,
    offlineInterviews: interviews.offline || 0,
    targetHireDate: "2023-12-15",
    offerAcceptanceRate: "78%",
    offeredPositions: 0,
    openPositions: 0,
    pipeline: {
      sourced: 24,
      screening: 18,
      interviews: totalInterviews,
      preboarding: 6,
      hired: 15,
      archived: 9,
    },
    pendingReview: {
      sourced: 5,
      screening: 3,
      interviews: 2,
    },
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([
        ...notes,
        {
          id: Date.now(),
          content: newNote,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          author: "You",
        },
      ]);
      setNewNote("");
      setShowNoteForm(false);
    }
  };

  // Add this function to your Dashboard component
  const handleUpdateJobPosting = () => {
    if (job) {
      navigate(`/jobs/update/${job._id}`, { 
        state: { job } 
      });
    }
  };

  const handleCreateJobPosting = () => {
    if (job) {
      navigate('/create-job');
    }
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleViewJobCandidates = () => {
    navigate(`/candidates`);
  };

  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: alpha(theme.palette.background.default, 0.8),
        backdropFilter: 'blur(8px)'
      }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: 3,
        textAlign: 'center',
        p: 3
      }}>
        <Typography variant="h5" color="error" sx={{ fontWeight: 600 }}>
          {error}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.location.reload()}
          sx={{ borderRadius: 2, px: 4, py: 1.5 }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: theme.palette.grey[50],
        p: 0,
        overflow: 'hidden'
      }}
    >
      {/* Main Content */}
      <Box sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        gap: 3,
        p: 3,
        flex: 1,
        overflow: 'auto'
      }}>
        {/* Left Content - 70% */}
        <Box sx={{
          flex: { xs: 1, lg: 7 },
          display: "flex",
          flexDirection: "column",
          gap: 3
        }}>
          {/* Header */}
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
              {job?.jobTitle || "Job Title"}
            </Typography>
          </Box>

          {/* Stats Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: 3,
            }}
          >
            {[
              {
                title: "Total Candidate Sourced",
                value: appliedCandidat.length,
                icon: <CandidateIcon />,
                color: theme.palette.warning.main,
                onClick: handleViewJobCandidates
              },
              {
                title: "Upcoming Interviews",
                value: stats.upcomingInterviews,
                icon: <TimeIcon />,
                color: theme.palette.warning.main,
                onClick: () => navigate('/interviews/upcoming')
              },
              {
                title: "Acceptance Rate",
                value: stats.acceptanceRate,
                icon: <CheckCircleIcon />,
                color: theme.palette.success.main,
              },
              {
                title: "Positions",
                value: `${closedPosition}/${job?.jobFormId?.openings || 0}`,
                icon: <GroupIcon />,
                color: theme.palette.primary.main,
              },
            ].map((stat, index) => (
              <GlassCard
                key={index}
                onClick={stat.onClick || undefined}
                sx={{
                  cursor: stat.onClick ? 'pointer' : 'default',
                  '&:hover': {
                    transform: stat.onClick ? 'translateY(-4px)' : 'none',
                    boxShadow: stat.onClick ? `0 12px 40px ${alpha(theme.palette.common.black, 0.15)}` : 'none',
                    borderColor: stat.onClick ? alpha(theme.palette.primary.main, 0.3) : 'none'
                  }
                }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {stat.title}
                    </Typography>
                    {stat.change && (
                      <Chip
                        label={stat.change}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: '0.65rem',
                          bgcolor: stat.trend === 'up' ? `${theme.palette.success.light}80` :
                            stat.trend === 'down' ? `${theme.palette.error.light}80` :
                              `${theme.palette.grey[300]}80`,
                          color: stat.trend === 'up' ? theme.palette.success.dark :
                            stat.trend === 'down' ? theme.palette.error.dark :
                              theme.palette.text.secondary
                        }}
                      />
                    )}
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
                    {stat.value}
                  </Typography>
                  {stat.subtitle && (
                    <Typography variant="caption" color="text.secondary">
                      {stat.subtitle}
                    </Typography>
                  )}
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mt: 1
                  }}>
                    <Avatar sx={{
                      bgcolor: `${stat.color}20`,
                      color: stat.color,
                      width: 36,
                      height: 36
                    }}>
                      {stat.icon}
                    </Avatar>
                  </Box>
                </CardContent>
              </GlassCard>
            ))}
          </Box>

          {/* Upcoming Interviews List */}
          {interviews.upcoming > 0 && (
            <GlassCard>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    <CalendarIcon sx={{ mr: 1.5, color: theme.palette.primary.main }} />
                    Upcoming Interviews
                  </Typography>
                  <GradientButton
                    size="small"
                    endIcon={<ArrowIcon />}
                    onClick={() => navigate('/interviews/upcoming')}
                  >
                    View All
                  </GradientButton>
                </Box>

                <Stack spacing={2}>
                  {interviews.upcomingInterviews.slice(0, 3).map((interview) => (
                    <Paper
                      key={interview._id}
                      elevation={0}
                      sx={{
                        p: 2.5,
                        borderRadius: 2,
                        background: alpha(theme.palette.background.paper, 0.7),
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.1)}`,
                          borderColor: alpha(theme.palette.primary.main, 0.3)
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                          {interview.candidate?.name || 'No name'}
                        </Typography>
                        <Chip
                          label={interview.status || 'scheduled'}
                          size="small"
                          sx={{
                            fontWeight: 600,
                            bgcolor: interview.status === 'scheduled' ?
                              `${theme.palette.info.light}30` :
                              `${theme.palette.success.light}30`,
                            color: interview.status === 'scheduled' ?
                              theme.palette.info.dark :
                              theme.palette.success.dark
                          }}
                        />
                      </Box>

                      <Box sx={{ display: 'flex', gap: 2, mb: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CalendarIcon fontSize="small" sx={{
                            mr: 1,
                            color: theme.palette.text.secondary
                          }} />
                          <Typography variant="body2">
                            {interview.date ? new Date(interview.date).toLocaleDateString() : 'No date'}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <TimeIcon fontSize="small" sx={{
                            mr: 1,
                            color: theme.palette.text.secondary
                          }} />
                          <Typography variant="body2">
                            {interview.startTime || 'No time'} ({interview.timezone || 'UTC'})
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1.5 }}>
                        {interview.interviewers?.map((interviewer) => (
                          <Chip
                            key={interviewer._id}
                            avatar={<Avatar alt={interviewer.name} sx={{ width: 24, height: 24 }}>
                              {interviewer.name?.charAt(0) || '?'}
                            </Avatar>}
                            label={interviewer.name || 'Interviewer'}
                            size="small"
                            sx={{
                              borderRadius: 1,
                              background: alpha(theme.palette.primary.light, 0.1)
                            }}
                          />
                        ))}
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          variant="outlined"
                          size="small"
                          endIcon={<ArrowIcon />}
                          sx={{
                            textTransform: 'none',
                            borderRadius: 2,
                            px: 2,
                            py: 0.5
                          }}
                          onClick={() => navigate(`/interviews/${interview._id}`)}
                        >
                          Details
                        </Button>
                      </Box>
                    </Paper>
                  ))}
                </Stack>
              </CardContent>
            </GlassCard>
          )}

          {/* Bottom Row */}
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3
          }}>
            {/* Pending Review */}
            <GlassCard sx={{ flex: 1 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                  <ReviewIcon sx={{ mr: 1.5, color: theme.palette.warning.main }} />
                  Pending Review
                </Typography>

                <Box sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(3, 1fr)",
                  },
                  gap: 2,
                }}>
                  {Object.entries(stats.pendingReview).map(([stage, count]) => (
                    <Paper
                      key={stage}
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        background: alpha(theme.palette.background.paper, 0.7),
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.1)}`,
                          borderColor: alpha(theme.palette.primary.main, 0.3)
                        }
                      }}
                    >
                      <Typography variant="h3" sx={{
                        fontWeight: 800,
                        color: count > 0 ? theme.palette.error.main : theme.palette.success.main,
                        mb: 1
                      }}>
                        {count}
                      </Typography>
                      <Typography variant="body2" sx={{
                        color: theme.palette.text.secondary,
                        textTransform: 'capitalize',
                        mb: 1.5
                      }}>
                        {stage.replace(/([A-Z])/g, ' $1')}
                      </Typography>
                      <Button
                        variant="text"
                        size="small"
                        endIcon={<ArrowIcon fontSize="small" />}
                        sx={{
                          textTransform: 'none',
                          fontSize: '0.75rem',
                          p: 0,
                          color: theme.palette.primary.main,
                          '&:hover': {
                            background: 'none'
                          }
                        }}
                      >
                        Review now
                      </Button>
                    </Paper>
                  ))}
                </Box>
              </CardContent>
            </GlassCard>

            {/* Job Details */}
            <GlassCard sx={{ flex: 1 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                  <AssignmentIcon sx={{ mr: 1.5, color: theme.palette.secondary.main }} />
                  Job Details
                </Typography>

                {job && (
                  <Box>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Job Title
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {job.jobTitle}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                          Department
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {job.department}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                          Posted Date
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {new Date().toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Description
                      </Typography>
                      <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                        {job.jobDesc}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip
                        label="Active"
                        color="success"
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                      <Chip
                        label="Full-time"
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                      <Chip
                        label="On-site"
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                  </Box>
                )}
              </CardContent>
            </GlassCard>
          </Box>
        </Box>

        {/* Right Sidebar - 30% */}
        <Box sx={{
          flex: { xs: 1, lg: 3 },
          display: "flex",
          flexDirection: "column",
          gap: 3,
          minWidth: 320
        }}>
          {/* Notes Card */}
          <GlassCard sx={{ flex: 1, mt: 9 }}>
            <CardContent sx={{
              p: 3,
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3
              }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  <NoteIcon sx={{ mr: 1.5, color: theme.palette.info.main }} />
                  My Notes
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setShowNoteForm(true)}
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    color: theme.palette.common.white,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`
                    }
                  }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>

              {showNoteForm && (
                <Paper
                  elevation={0}
                  sx={{
                    mb: 3,
                    p: 2.5,
                    borderRadius: 2,
                    background: alpha(theme.palette.background.paper, 0.7),
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                  }}
                >
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Write your note here..."
                    variant="outlined"
                    sx={{ mb: 2 }}
                    InputProps={{
                      sx: {
                        borderRadius: 1,
                        background: theme.palette.background.paper
                      }
                    }}
                  />
                  <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5 }}>
                    <Button
                      size="small"
                      startIcon={<CloseIcon />}
                      onClick={() => setShowNoteForm(false)}
                      sx={{ textTransform: 'none' }}
                    >
                      Cancel
                    </Button>
                    <GradientButton
                      size="small"
                      startIcon={<NoteIcon />}
                      onClick={handleAddNote}
                    >
                      Save Note
                    </GradientButton>
                  </Box>
                </Paper>
              )}

              <Box sx={{
                flex: 1,
                overflowY: 'auto',
                pr: 1,
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: alpha(theme.palette.primary.main, 0.5),
                  borderRadius: '3px',
                }
              }}>
                {notes.length > 0 ? (
                  <Stack spacing={2}>
                    {notes.map((note) => (
                      <Paper
                        key={note.id}
                        elevation={0}
                        sx={{
                          p: 2.5,
                          borderRadius: 2,
                          background: alpha(theme.palette.background.paper, 0.7),
                          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.1)}`,
                            borderColor: alpha(theme.palette.primary.main, 0.3)
                          }
                        }}
                      >
                        <Typography variant="body2" sx={{ mb: 2 }}>
                          {note.content}
                        </Typography>
                        <Box sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <Box>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                              {note.author} • {note.date}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {note.time}
                            </Typography>
                          </Box>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteNote(note.id)}
                            sx={{
                              color: theme.palette.error.main,
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.error.main, 0.1)
                              }
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Paper>
                    ))}
                  </Stack>
                ) : (
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    textAlign: 'center',
                    p: 3,
                    color: 'text.secondary'
                  }}>
                    <Box sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: alpha(theme.palette.primary.main, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2
                    }}>
                      <NoteIcon sx={{
                        fontSize: 40,
                        color: theme.palette.primary.main
                      }} />
                    </Box>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                      No notes yet
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, maxWidth: '80%' }}>
                      Add notes to track important information about candidates or hiring process
                    </Typography>
                    <GradientButton
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={() => setShowNoteForm(true)}
                    >
                      Add your first note
                    </GradientButton>
                  </Box>
                )}
              </Box>
            </CardContent>
          </GlassCard>

          {/* Quick Actions */}
          <GlassCard>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Button
                  variant="outlined"
                  size="medium"
                  startIcon={<CalendarIcon />}
                  onClick={() => navigate('/interviews/schedule')}
                  sx={{
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    p: 1.5,
                    borderRadius: 2,
                    borderColor: alpha(theme.palette.divider, 0.2),
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      background: alpha(theme.palette.primary.main, 0.05)
                    }
                  }}
                >
                  Schedule Interview
                </Button>
                <Button
                  variant="outlined"
                  size="medium"
                  startIcon={<EditIcon />}
                  onClick={handleUpdateJobPosting}
                  sx={{
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    p: 1.5,
                    borderRadius: 2,
                    borderColor: alpha(theme.palette.divider, 0.2),
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      background: alpha(theme.palette.primary.main, 0.05)
                    }
                  }}
                >
                  Update Job Posting
                </Button>
                <Button
                  variant="outlined"
                  size="medium"
                  startIcon={<PositionIcon />}
                  onClick={handleCreateJobPosting}

                  sx={{
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    p: 1.5,
                    borderRadius: 2,
                    borderColor: alpha(theme.palette.divider, 0.2),
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      background: alpha(theme.palette.primary.main, 0.05)
                    }
                  }}
                >
                  Create New Position
                </Button>
              </Box>
            </CardContent>
          </GlassCard>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;