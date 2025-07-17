

import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, CardHeader, Avatar,
  IconButton, Divider, LinearProgress, Paper, Stack, Button, useTheme, Chip, Menu, MenuItem, Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Link
} from '@mui/material';
import {
  People as PeopleIcon,
  Work as WorkIcon,
  Schedule as ScheduleIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  Today as TodayIcon,
  CalendarViewWeek as WeekIcon,
  CalendarViewMonth as MonthIcon
} from '@mui/icons-material';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { fetchAlljobsByStatus, fetchCandidates } from '../utils/api';
import { useNavigate } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const labels = ['Sourced', 'Screening', 'Interview', 'Preboarding', 'Hired','Rejected', 'Archived'];

const MenuDashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [allCandidates, setAllCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [allJobsActive, setAllJobsActive] = useState([]);
  const [filteredJobsActive, setFilteredJobsActive] = useState([]);
  const [pipeData, setPipeData] = useState([]);
  const [interviewsTodayCount, setInterviewsTodayCount] = useState(0);
  // Add this to your state
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [timeFilter, setTimeFilter] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTimeFilterChange = (filter) => {
    setTimeFilter(filter);
    handleClose();
  };

  const fetchData = async () => {
    const allCandidates = await fetchCandidates();
    const allJobsActive = await fetchAlljobsByStatus('Active');
    setAllCandidates(allCandidates);
    setFilteredCandidates(allCandidates);
    setAllJobsActive(allJobsActive);
    setFilteredJobsActive(allJobsActive);

    try {
      const response = await fetch('https://hire-onboardbackend-key.up.railway.app/api/interviews/upcoming');
      const data = await response.json();
      if (data.success) {
        const today = new Date().toISOString().split('T')[0];
        const todayInterviews = data.data.filter(interview => {
          const interviewDate = new Date(interview.date).toISOString().split('T')[0];
          return interviewDate === today;
        });
        setInterviewsTodayCount(todayInterviews.length);

        // Get interviews for next 3 days
        const nextThreeDays = new Date();
        nextThreeDays.setDate(nextThreeDays.getDate() + 3);
        const upcoming = data.data.filter(interview => {
          const interviewDate = new Date(interview.date);
          return interviewDate <= nextThreeDays && interviewDate >= new Date(today);
        });
        setUpcomingInterviews(upcoming.slice(0, 2)); // Show max 2 interviews
      }
    } catch (error) {
      console.error('Error fetching interviews:', error);
    }
  };

  const pipelineDataSet = (candidates) => {
    const stageCounts = new Array(labels.length).fill(0);

    candidates.forEach(candidate => {
      const stageName = typeof candidate.stage === 'string'
        ? candidate.stage
        : candidate.stage?.name;

      const stageIndex = labels.indexOf(stageName);
      if (stageIndex !== -1) {
        stageCounts[stageIndex]++;
      }
    });

    return stageCounts;
  };

  const filterDataByTime = () => {
    const now = new Date();
    let startDate;

    switch (timeFilter) {
      case 'day':
        startDate = new Date(now.setDate(now.getDate() - 1));
        break;
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      default:
        // 'all' - no filtering needed
        setFilteredCandidates(allCandidates);
        setFilteredJobsActive(allJobsActive);
        return;
    }

    // Filter candidates
    const filteredCands = allCandidates.filter(candidate => {
      const candidateDate = new Date(candidate.createdAt);
      return candidateDate >= startDate;
    });
    setFilteredCandidates(filteredCands);

    // Filter jobs
    const filteredJobs = allJobsActive.filter(job => {
      const jobDate = new Date(job.createdAt);
      return jobDate >= startDate;
    });
    setFilteredJobsActive(filteredJobs);

    // Update interviews count for today only (if day filter is selected)
    if (timeFilter === 'day') {
      setInterviewsTodayCount(prev => {
        // You might want to fetch fresh data here for more accuracy
        return prev; // Keeping existing count for demo
      });
    }
  };

  useEffect(() => {
    filterDataByTime();
  }, [timeFilter, allCandidates, allJobsActive]);

  useEffect(() => {
    const res = pipelineDataSet(filteredCandidates);
    setPipeData(res);
  }, [filteredCandidates]);

  useEffect(() => {
    fetchData();
  }, []);

  const stats = [
    {
      title: 'Total Candidates',
      value: filteredCandidates.length,
      icon: <PeopleIcon />,
      color: 'primary.main',
      navigate: '/dashboard/candidates'
    },
    {
      title: 'Active Jobs',
      value: filteredJobsActive.length,
      icon: <WorkIcon />,
      color: 'secondary.main',
      navigate: '/dashboard/jobs'
    },
    {
      title: 'Interviews Today',
      value: interviewsTodayCount,
      icon: <ScheduleIcon />,
      color: 'warning.main',
      navigate: '/dashboard/interviews'
    }
  ];

  const pipelineData = {
    labels: labels,
    datasets: [
      {
        data: pipeData,
        backgroundColor: [
          theme.palette.primary.light,
          theme.palette.info.light,
          theme.palette.warning.light,
          theme.palette.secondary.light,
          theme.palette.success.light,
          
          theme.palette.error.dark
        ],
        borderWidth: 0,
      },
    ],
  };

  const handleCardClick = (stat) => {
    navigate(stat.navigate);
  };

  function createAvatarInitials(first, second) {
    const firstInitial = first ? first[0].toUpperCase() : '';
    const lastInitial = second ? second[0].toUpperCase() : '';
    return `${firstInitial}${lastInitial}`;
  }

  function getTimeDifference(createdAt, type) {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const differenceInMilliseconds = type === 'past'
      ? currentDate - createdDate
      : createdDate - currentDate;
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);

    if (differenceInDays > 0) return `${differenceInDays} day${differenceInDays !== 1 ? 's' : ''}`;
    if (differenceInHours > 0) return `${differenceInHours} hour${differenceInHours !== 1 ? 's' : ''}`;
    if (differenceInMinutes > 0) return `${differenceInMinutes} minute${differenceInMinutes !== 1 ? 's' : ''}`;
    return `${differenceInSeconds} second${differenceInSeconds !== 1 ? 's' : ''}`;
  }

  const getFilterIcon = () => {
    switch (timeFilter) {
      case 'day': return <TodayIcon />;
      case 'week': return <WeekIcon />;
      case 'month': return <MonthIcon />;
      default: return <FilterIcon />;
    }
  };

  const getFilterText = () => {
    switch (timeFilter) {
      case 'all': return 'All Time';
      case 'day': return 'Last 24 Hours';
      case 'week': return 'Last Week';
      case 'month': return 'Last Month';
      default: return 'Filter';
    }
  };

  const handleViewInterview = (interview) => {
    setSelectedInterview(interview);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/dashboard/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <Box component="section" sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">Recruitment Dashboard</Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={getFilterIcon()}
            sx={{ textTransform: 'none' }}
            onClick={handleClick}
            aria-controls={open ? 'time-filter-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {getFilterText()}
          </Button>
          <Menu
            id="time-filter-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'time-filter-button',
            }}
          >
            <MenuItem onClick={() => handleTimeFilterChange('all')}>
              <TodayIcon sx={{ mr: 1 }} /> All Time
            </MenuItem>
            <MenuItem onClick={() => handleTimeFilterChange('day')}>
              <TodayIcon sx={{ mr: 1 }} /> Last 24 Hours
            </MenuItem>
            <MenuItem onClick={() => handleTimeFilterChange('week')}>
              <WeekIcon sx={{ mr: 1 }} /> Last Week
            </MenuItem>
            <MenuItem onClick={() => handleTimeFilterChange('month')}>
              <MonthIcon sx={{ mr: 1 }} /> Last Month
            </MenuItem>
          </Menu>
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            sx={{ textTransform: 'none' }}
            onClick={handleSearch}
          >
            Quick Search
          </Button>        </Stack>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Card key={index} sx={{
            height: '100%', width: '29.3%', borderRadius: 2, boxShadow: 1,
            transition: 'all 0.3s ease',
            '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 }
          }}>
            <CardContent onClick={() => handleCardClick(stat)}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Avatar sx={{ bgcolor: stat.color, color: 'common.white', width: 44, height: 44 }}>{stat.icon}</Avatar>
                <IconButton size="small"><MoreVertIcon /></IconButton>
              </Box>
              <Typography variant="subtitle2" color="text.secondary">{stat.title}</Typography>
              <Typography variant="h5" fontWeight="bold" sx={{ my: 1 }}>{stat.value}</Typography>
            </CardContent>
          </Card>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 1 }}>
            <CardHeader
              title="Candidate Pipeline"
              subheader={`Current distribution by stage (${getFilterText()})`}
              action={<IconButton><MoreVertIcon /></IconButton>}
            />
            <CardContent>
              <Box sx={{ height: 250, mb: 2 }}>
                <Doughnut
                  data={pipelineData}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: { usePointStyle: true, padding: 20 }
                      }
                    },
                    cutout: '70%'
                  }}
                />
              </Box>
              <Button fullWidth variant="outlined" sx={{ textTransform: 'none' }}>
                View Pipeline Report
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card sx={{ borderRadius: 2, boxShadow: 1,width:335 }}>
            <CardHeader
              title="Recent Candidates"
              subheader={`Latest additions (${getFilterText()})`}
              action={<IconButton><MoreVertIcon /></IconButton>}
            />
            <CardContent>
              <Stack spacing={2}>
                {filteredCandidates.slice(0, 3).map((candidate, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      p: 2, borderRadius: 1, display: 'flex', alignItems: 'center',
                      border: `1px solid ${theme.palette.divider}`,
                      '&:hover': { backgroundColor: 'action.hover' }
                    }}
                    onClick={() => navigate(`/dashboard/candidates/${candidate._id}`)}
                  >
                    <Avatar sx={{
                      bgcolor: 'primary.light',
                      color: 'primary.dark',
                      mr: 2, width: 40, height: 40
                    }}>
                      {createAvatarInitials(candidate.firstName, candidate.lastName)}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1" fontWeight="medium">
                        {candidate.firstName} {candidate.lastName}
                      </Typography>
                     
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Chip
                        label={candidate.stage?.name || 'N/A'}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ mb: 0.5 }}
                      />
                    </Box>
                  </Paper>
                ))}
              </Stack>
              <Button
                fullWidth
                variant="text"
                sx={{ mt: 2, textTransform: 'none' }}
                startIcon={<VisibilityIcon />}
                onClick={() => navigate('/dashboard/candidates')}
              >
                See All Candidates
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2, boxShadow: 1 ,width:340}}>
            <CardHeader
              title="Upcoming Interviews"
              subheader="Next 3 days schedule"
              action={<IconButton><MoreVertIcon /></IconButton>}
            />
            <CardContent>
              <Stack spacing={2}>
                {upcomingInterviews.length > 0 ? (
                  upcomingInterviews.map((interview) => (
                    <Paper
                      key={interview._id}
                      sx={{
                        p: 2,
                        borderRadius: 1,
                        border: `1px solid ${theme.palette.divider}`
                      }}
                    >
                      <Typography variant="subtitle2" fontWeight="medium">
                        {interview.jobId?.jobTitle || 'Interview'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {interview.candidate.name}
                      </Typography>
                      <Divider sx={{ my: 1.5 }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2">
                          {new Date(interview.date).toLocaleDateString()}, {interview.startTime}
                        </Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{
                            textTransform: 'none',
                            minWidth: 0,
                            p: '2px 8px'
                          }}
                          onClick={() => handleViewInterview(interview)}
                        >
                          View
                        </Button>
                      </Box>
                    </Paper>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                    No upcoming interviews in next 3 days
                  </Typography>
                )}
              </Stack>
              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 2, textTransform: 'none' }}
                startIcon={<ScheduleIcon />}
                onClick={() => navigate('/dashboard/interviews')}
              >
                View Full Calendar
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item width={'100%'} xs={12} md={8}>
          <Card sx={{
            borderRadius: 2,
            boxShadow: 1
          }}>
            <CardHeader
              title="Active Job Openings"
              subheader={`Priority positions (${getFilterText()})`}
              action={
                <Button
                  variant="contained"
                  size="small"
                  sx={{ textTransform: 'none' }}
                  onClick={() => navigate('/dashboard/jobs/createJob')}
                >
                  Post New Job
                </Button>
              }
            />
            <CardContent>
              <Grid container spacing={2}>
                {filteredJobsActive.map((job, index) => (
                  <Grid item xs={12} width={'23%'} sm={6} md={4} key={index} onClick={() => navigate(`/dashboard/jobs/${job._id}`)}>
                    <Paper sx={{
                      p: 2,
                      height: '100%',
                      borderRadius: 1,
                      border: `1px solid ${theme.palette.divider}`,
                      '&:hover': {
                        borderColor: 'primary.main'
                      }
                    }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography variant="subtitle1" fontWeight="medium">
                            {job.jobTitle}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            {job.department}
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="subtitle2" color="primary" fontWeight="bold">
                            {job.jobName}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: 1.5,
                        alignItems: 'center'
                      }}>
                        {/* <Typography variant="body2">
                          2 applicants
                        </Typography> */}
                        <Chip
                          label={job.status}
                          size="small"
                          color={job.status === 'Active' ? 'success' : 'warning'}
                          variant="outlined"
                        />
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(25 / 30) * 100}
                        sx={{
                          mt: 2,
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: theme.palette.grey[200],
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 3
                          }
                        }}
                      />
                      {/* <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                        {job?.jobFormId?.targetHireDate
                          ? `Open for ${getTimeDifference(job.jobFormId.targetHireDate, 'future')}`
                          : 'Target date not set'}
                      </Typography> */}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
              <Stack >
                <Button
                  variant="text"
                  sx={{ mt: 2, textTransform: 'none' }}
                  startIcon={<VisibilityIcon />}
                  onClick={() => navigate('/dashboard/jobs')}
                >
                  See All Jobs
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {selectedInterview && (
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>Interview Details</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Candidate</Typography>
                <Typography variant="body1">{selectedInterview.candidate.name}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Job Position</Typography>
                <Typography variant="body1">{selectedInterview.jobId?.jobTitle || 'N/A'}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Date & Time</Typography>
                <Typography variant="body1">
                  {new Date(selectedInterview.date).toLocaleDateString()} at {selectedInterview.startTime}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Interviewers</Typography>
                {selectedInterview.interviewers.map((interviewer, i) => (
                  <Typography key={i} variant="body1">{interviewer.name}</Typography>
                ))}
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Platform</Typography>
                <Typography variant="body1">{selectedInterview.platform}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Meeting Link</Typography>
                <Link href={selectedInterview.meetingLink} target="_blank" rel="noopener">
                  {selectedInterview.meetingLink}
                </Link>
              </Box>
              {selectedInterview.notes && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Notes</Typography>
                  <Typography variant="body1">{selectedInterview.notes}</Typography>
                </Box>
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default MenuDashboard;