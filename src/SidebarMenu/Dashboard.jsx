import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  Button,
  useTheme,
  Chip
} from '@mui/material';
import {
  People as PeopleIcon,
  Work as WorkIcon,
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Email as EmailIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const MenuDashboard = () => {
  const theme = useTheme();

  // ATS Statistics
  const stats = [
    { 
      title: 'Total Candidates', 
      value: '1,254', 
      change: '+5.2%', 
      isUp: true,
      icon: <PeopleIcon />,
      color: 'primary.main'
    },
    { 
      title: 'Active Jobs', 
      value: '24', 
      change: '+3.1%', 
      isUp: true,
      icon: <WorkIcon />,
      color: 'secondary.main'
    },
    { 
      title: 'Interviews Today', 
      value: '8', 
      change: '-2', 
      isUp: false,
      icon: <ScheduleIcon />,
      color: 'warning.main'
    },
    { 
      title: 'Applications', 
      value: '187', 
      change: '+15%', 
      isUp: true,
      icon: <AssignmentIcon />,
      color: 'success.main'
    }
  ];

  // Candidate Pipeline
  const pipelineData = {
    labels: ['Sourced', 'Screening', 'Interview', 'Offer', 'Hired'],
    datasets: [
      {
        data: [120, 80, 45, 15, 8],
        backgroundColor: [
          theme.palette.primary.light,
          theme.palette.info.light,
          theme.palette.warning.light,
          theme.palette.secondary.light,
          theme.palette.success.light
        ],
        borderWidth: 0,
      },
    ],
  };

  // Recent Candidates
  const recentCandidates = [
    { 
      name: 'Sarah Johnson', 
      position: 'Senior UX Designer', 
      status: 'Technical Review',
      time: '15 mins ago',
      avatar: 'SJ'
    },
    { 
      name: 'Michael Chen', 
      position: 'Frontend Developer', 
      status: 'Interview Scheduled',
      time: '2 hours ago',
      avatar: 'MC'
    },
    { 
      name: 'David Wilson', 
      position: 'Product Manager', 
      status: 'Offer Sent',
      time: '1 day ago',
      avatar: 'DW'
    }
  ];

  // Job Openings
  const jobOpenings = [
    { 
      title: 'Senior React Developer', 
      department: 'Engineering', 
      applicants: 24,
      daysOpen: 5,
      priority: 'High'
    },
    { 
      title: 'UX Researcher', 
      department: 'Design', 
      applicants: 18,
      daysOpen: 12,
      priority: 'Medium'
    },
    { 
      title: 'Technical Recruiter', 
      department: 'HR', 
      applicants: 9,
      daysOpen: 8,
      priority: 'High'
    }
  ];

  return (
    <Box component="section" sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4
      }}>
        <Typography variant="h4" fontWeight="bold">
          Recruitment Dashboard
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button 
            variant="outlined" 
            startIcon={<FilterIcon />}
            sx={{ textTransform: 'none' }}
          >
            Filters
          </Button>
          <Button 
            variant="contained" 
            startIcon={<SearchIcon />}
            sx={{ textTransform: 'none' }}
          >
            Quick Search
          </Button>
        </Stack>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ 
              height: '100%',
              borderRadius: 2,
              boxShadow: 1,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 3
              }
            }}>
              <CardContent>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  mb: 2
                }}>
                  <Avatar sx={{ 
                    bgcolor: stat.color,
                    color: 'common.white',
                    width: 44,
                    height: 44
                  }}>
                    {stat.icon}
                  </Avatar>
                  <IconButton size="small">
                    <MoreVertIcon />
                  </IconButton>
                </Box>
                <Typography variant="subtitle2" color="text.secondary">
                  {stat.title}
                </Typography>
                <Typography variant="h5" fontWeight="bold" sx={{ my: 1 }}>
                  {stat.value}
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  color: stat.isUp ? 'success.main' : 'error.main'
                }}>
                  {stat.isUp ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
                  <Typography variant="body2" sx={{ ml: 0.5 }}>
                    {stat.change} this week
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Candidate Pipeline */}
        <Grid item xs={12} md={5}>
          <Card sx={{ 
            height: '100%',
            borderRadius: 2,
            boxShadow: 1
          }}>
            <CardHeader
              title="Candidate Pipeline"
              subheader="Current distribution by stage"
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
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
                        labels: {
                          usePointStyle: true,
                          padding: 20
                        }
                      }
                    },
                    cutout: '70%'
                  }} 
                />
              </Box>
              <Button 
                fullWidth 
                variant="outlined" 
                sx={{ textTransform: 'none' }}
              >
                View Pipeline Report
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Candidates */}
        <Grid item xs={12} md={7}>
          <Card sx={{ 
            borderRadius: 2,
            boxShadow: 1
          }}>
            <CardHeader
              title="Recent Candidates"
              subheader="Latest additions to your pipeline"
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CardContent>
              <Stack spacing={2}>
                {recentCandidates.map((candidate, index) => (
                  <Paper 
                    key={index} 
                    elevation={0}
                    sx={{ 
                      p: 2,
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      border: `1px solid ${theme.palette.divider}`,
                      '&:hover': {
                        backgroundColor: 'action.hover'
                      }
                    }}
                  >
                    <Avatar sx={{ 
                      bgcolor: 'primary.light', 
                      color: 'primary.dark',
                      mr: 2,
                      width: 40,
                      height: 40
                    }}>
                      {candidate.avatar}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1" fontWeight="medium">
                        {candidate.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {candidate.position}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Chip 
                        label={candidate.status} 
                        size="small" 
                        color="primary"
                        variant="outlined"
                        sx={{ mb: 0.5 }}
                      />
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                        {candidate.time}
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </Stack>
              <Button 
                fullWidth 
                variant="text" 
                sx={{ mt: 2, textTransform: 'none' }}
                startIcon={<EmailIcon />}
              >
                Email All Candidates
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Job Openings */}
        <Grid item xs={12} md={8}>
          <Card sx={{ 
            borderRadius: 2,
            boxShadow: 1
          }}>
            <CardHeader
              title="Active Job Openings"
              subheader="Priority positions needing attention"
              action={
                <Button 
                  variant="contained" 
                  size="small"
                  sx={{ textTransform: 'none' }}
                >
                  Post New Job
                </Button>
              }
            />
            <CardContent>
              <Grid container spacing={2}>
                {jobOpenings.map((job, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Paper sx={{ 
                      p: 2, 
                      height: '100%',
                      borderRadius: 1,
                      border: `1px solid ${theme.palette.divider}`,
                      '&:hover': {
                        borderColor: 'primary.main'
                      }
                    }}>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {job.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {job.department}
                      </Typography>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        mt: 1.5,
                        alignItems: 'center'
                      }}>
                        <Typography variant="body2">
                          {job.applicants} applicants
                        </Typography>
                        <Chip 
                          label={job.priority} 
                          size="small" 
                          color={job.priority === 'High' ? 'error' : 'warning'}
                          variant="outlined"
                        />
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={(job.applicants / 30) * 100} 
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
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                        Open for {job.daysOpen} days
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Interviews */}
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            borderRadius: 2,
            boxShadow: 1
          }}>
            <CardHeader
              title="Upcoming Interviews"
              subheader="Next 3 days schedule"
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CardContent>
              <Stack spacing={2}>
                {[1, 2].map((item) => (
                  <Paper 
                    key={item} 
                    sx={{ 
                      p: 2,
                      borderRadius: 1,
                      border: `1px solid ${theme.palette.divider}`
                    }}
                  >
                    <Typography variant="subtitle2" fontWeight="medium">
                      {item === 1 ? 'Technical Screening' : 'Final Round'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item === 1 ? 'React Developer' : 'Product Designer'}
                    </Typography>
                    <Divider sx={{ my: 1.5 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2">
                        {item === 1 ? 'Tomorrow, 10:00 AM' : 'Wed, 2:00 PM'}
                      </Typography>
                      <Button 
                        variant="outlined" 
                        size="small"
                        sx={{ 
                          textTransform: 'none',
                          minWidth: 0,
                          p: '2px 8px'
                        }}
                      >
                        View
                      </Button>
                    </Box>
                  </Paper>
                ))}
              </Stack>
              <Button 
                fullWidth 
                variant="outlined" 
                sx={{ mt: 2, textTransform: 'none' }}
                startIcon={<ScheduleIcon />}
              >
                View Full Calendar
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MenuDashboard;