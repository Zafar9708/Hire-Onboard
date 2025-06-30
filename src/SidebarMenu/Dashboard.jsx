// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardHeader,
//   Avatar,
//   IconButton,
//   Divider,
//   LinearProgress,
//   Paper,
//   Stack,
//   Button,
//   useTheme,
//   Chip
// } from '@mui/material';
// import {
//   People as PeopleIcon,
//   Work as WorkIcon,
//   Assignment as AssignmentIcon,
//   Schedule as ScheduleIcon,
//   ArrowUpward as ArrowUpwardIcon,
//   ArrowDownward as ArrowDownwardIcon,
//   Search as SearchIcon,
//   FilterList as FilterIcon,
//   Email as EmailIcon,
//   MoreVert as MoreVertIcon,
//   Visibility as VisibilityIcon
// } from '@mui/icons-material';
// import { Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { fetchAlljobsByStatus, fetchCandidates } from '../utils/api';
// import { useNavigate } from 'react-router-dom';

// ChartJS.register(ArcElement, Tooltip, Legend);


// const labels = ['Sourced', 'Screening', 'Interview', 'Preboarding', 'Hired', 'Archived']

// const MenuDashboard = () => {

//   const navigate = useNavigate();

//   const [allCandidates, setallCandidates] = useState([])
//   const [allJobsActive, setAllJobsActive] = useState([])
//   const [pipeData,setPipeData]=useState([])

//   const fetchData = async () => {
//     const allCandidates = await fetchCandidates();
//     const allJobsActive = await fetchAlljobsByStatus('Active')
//     setallCandidates(allCandidates)
//     setAllJobsActive(allJobsActive)
//   }

//   const pipelineDataSet = (allCandidates) => {
//     const stageCounts = new Array(labels.length).fill(0);

//     // Iterate over the candidate list and count the stages
//     allCandidates.forEach(candidate => {
//       const stageIndex = labels.indexOf(candidate.stage);
//       if (stageIndex !== -1) {
//         stageCounts[stageIndex]++;
//       }
//     });
//     return stageCounts
//   }
//   useEffect(() => {
//    const res = pipelineDataSet(allCandidates)
//    setPipeData(res)
//   }, [allCandidates])


//   useEffect(() => {
//     fetchData()
//   }, [])

//   const theme = useTheme();



//   // ATS Statistics
//   const stats = [
//     {
//       title: 'Total Candidates',
//       value: allCandidates.length,
//       // change: '+5.2%', 
//       // isUp: true,
//       icon: <PeopleIcon />,
//       color: 'primary.main',
//       navigate: '/dashboard/candidates'
//     },
//     {
//       title: 'Active Jobs',
//       value: allJobsActive.length,
//       // change: '+3.1%', 
//       // isUp: true,
//       icon: <WorkIcon />,
//       color: 'secondary.main',
//       navigate: '/dashboard/jobs'
//     },
//     {
//       title: 'Interviews Today',
//       value: '8',
//       // change: '-2', 
//       // isUp: false,
//       icon: <ScheduleIcon />,
//       color: 'warning.main',
//       navigate: '/dashboard/interviews'
//     }
//   ];

//   // Candidate Pipeline
//   const pipelineData = {
//     labels: labels,
//     datasets: [
//       {
//         data: pipeData,
//         backgroundColor: [
//           theme.palette.primary.light,
//           theme.palette.info.light,
//           theme.palette.warning.light,
//           theme.palette.secondary.light,
//           theme.palette.success.light,
//           theme.palette.error.dark
//         ],
//         borderWidth: 0,
//       },
//     ],
//   };

//   const handleCardClick = (stat) => {
//     navigate(stat.navigate)
//   }
//   function createAvatarInitials(first, second) {

//     // Extract the first letter of the first name and the first letter of the last name
//     const firstInitial = first ? first[0].toUpperCase() : '';
//     const lastInitial = second ? second[0].toUpperCase() : '';

//     // Combine the initials to form the avatar string
//     return `${firstInitial}${lastInitial}`;
//   }

//   function getTimeDifference(createdAt, type) {
//     const createdDate = new Date(createdAt);
//     const currentDate = new Date();


//     let differenceInMilliseconds;
//     // Calculate the difference in milliseconds
//     if (type === 'past') {
//       differenceInMilliseconds = currentDate - createdDate;
//     }
//     else {
//       differenceInMilliseconds = createdDate - currentDate;
//     }
//     // const differenceInMilliseconds = currentDate - createdDate;

//     // Convert milliseconds to seconds, minutes, hours, and days
//     const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
//     const differenceInMinutes = Math.floor(differenceInSeconds / 60);
//     const differenceInHours = Math.floor(differenceInMinutes / 60);
//     const differenceInDays = Math.floor(differenceInHours / 24);

//     // Return the largest non-zero unit
//     if (differenceInDays > 0) {
//       return `${differenceInDays} day${differenceInDays !== 1 ? 's' : ''}`;
//     } else if (differenceInHours > 0) {
//       return `${differenceInHours} hour${differenceInHours !== 1 ? 's' : ''}`;
//     } else if (differenceInMinutes > 0) {
//       return `${differenceInMinutes} minute${differenceInMinutes !== 1 ? 's' : ''}`;
//     } else {
//       return `${differenceInSeconds} second${differenceInSeconds !== 1 ? 's' : ''}`;
//     }
//   }

//   return (
//     <Box component="section" sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
//       {/* Header */}
//       <Box sx={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         mb: 4
//       }}>
//         <Typography variant="h4" fontWeight="bold">
//           Recruitment Dashboard
//         </Typography>
//         <Stack direction="row" spacing={2}>
//           <Button
//             variant="outlined"
//             startIcon={<FilterIcon />}
//             sx={{ textTransform: 'none' }}
//           >
//             Filters
//           </Button>
//           <Button
//             variant="contained"
//             startIcon={<SearchIcon />}
//             sx={{ textTransform: 'none' }}
//           >
//             Quick Search
//           </Button>
//         </Stack>
//       </Box>

//       {/* Stats Cards */}
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         {stats.map((stat, index) => (
//           // <Grid item xs={12} sm={6} md={3} key={index}>
//           <Card sx={{
//             height: '100%',
//             width: '29.3%',
//             borderRadius: 2,
//             boxShadow: 1,
//             transition: 'all 0.3s ease',
//             '&:hover': {
//               transform: 'translateY(-2px)',
//               boxShadow: 3
//             }
//           }}>
//             <CardContent onClick={() => handleCardClick(stat)}>
//               <Box sx={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 mb: 2
//               }}>
//                 <Avatar sx={{
//                   bgcolor: stat.color,
//                   color: 'common.white',
//                   width: 44,
//                   height: 44
//                 }}>
//                   {stat.icon}
//                 </Avatar>
//                 <IconButton size="small">
//                   <MoreVertIcon />
//                 </IconButton>
//               </Box>
//               <Typography variant="subtitle2" color="text.secondary">
//                 {stat.title}
//               </Typography>
//               <Typography variant="h5" fontWeight="bold" sx={{ my: 1 }}>
//                 {stat.value}
//               </Typography>
//               {/* <Box sx={{ 
//                   display: 'flex', 
//                   alignItems: 'center',
//                   color: stat.isUp ? 'success.main' : 'error.main'
//                 }}>
//                   {stat.isUp ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
//                   <Typography variant="body2" sx={{ ml: 0.5 }}>
//                     {stat.change} this week
//                   </Typography>
//                 </Box> */}
//             </CardContent>
//           </Card>
//           // </Grid>
//         ))}
//       </Grid>

//       {/* Main Content */}
//       <Grid container spacing={3}>
//         {/* Candidate Pipeline */}
//         <Grid item xs={12} md={5}>
//           <Card sx={{
//             height: '100%',
//             borderRadius: 2,
//             boxShadow: 1
//           }}>
//             <CardHeader
//               title="Candidate Pipeline"
//               subheader="Current distribution by stage"
//               action={
//                 <IconButton>
//                   <MoreVertIcon />
//                 </IconButton>
//               }
//             />
//             <CardContent>
//               <Box sx={{ height: 250, mb: 2 }}>
//                 <Doughnut
//                   data={pipelineData}
//                   options={{
//                     maintainAspectRatio: false,
//                     plugins: {
//                       legend: {
//                         position: 'bottom',
//                         labels: {
//                           usePointStyle: true,
//                           padding: 20
//                         }
//                       }
//                     },
//                     cutout: '70%'
//                   }}
//                 />
//               </Box>
//               <Button
//                 fullWidth
//                 variant="outlined"
//                 sx={{ textTransform: 'none' }}
//               >
//                 View Pipeline Report
//               </Button>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Recent Candidates */}
//         <Grid item xs={12} md={7}>
//           <Card sx={{
//             borderRadius: 2,
//             boxShadow: 1
//           }}>
//             <CardHeader
//               title="Recent Candidates"
//               subheader="Latest additions to your pipeline"
//               action={
//                 <IconButton>
//                   <MoreVertIcon />
//                 </IconButton>
//               }
//             />
//             <CardContent>
//               <Stack spacing={2}>
//                 {allCandidates.slice(0, 3).map((candidate, index) => (
//                   <Paper
//                     key={index}
//                     elevation={0}
//                     sx={{
//                       p: 2,
//                       borderRadius: 1,
//                       display: 'flex',
//                       alignItems: 'center',
//                       border: `1px solid ${theme.palette.divider}`,
//                       '&:hover': {
//                         backgroundColor: 'action.hover'
//                       }
//                     }}
//                     onClick={() => navigate(`/dashboard/candidates/${candidate._id}`)}
//                   >
//                     <Avatar sx={{
//                       bgcolor: 'primary.light',
//                       color: 'primary.dark',
//                       mr: 2,
//                       width: 40,
//                       height: 40
//                     }}>
//                       {createAvatarInitials(candidate.firstName, candidate.lastName)}
//                     </Avatar>
//                     <Box sx={{ flexGrow: 1 }}>
//                       <Typography variant="body1" fontWeight="medium">
//                         {candidate.firstName} {candidate.lastName}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         {'FrontEnd Engineer'}
//                       </Typography>
//                     </Box>
//                     <Box sx={{ textAlign: 'right' }}>
//                       <Chip
//                         label={candidate.stage}
//                         size="small"
//                         color="primary"
//                         variant="outlined"
//                         sx={{ mb: 0.5 }}
//                       />
//                       <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
//                         {getTimeDifference(candidate.createdAt, 'past')}
//                       </Typography>
//                     </Box>
//                   </Paper>
//                 ))}
//               </Stack>
//               <Button
//                 fullWidth
//                 variant="text"
//                 sx={{ mt: 2, textTransform: 'none' }}
//                 startIcon={<VisibilityIcon />}
//                 onClick={() => navigate('/dashboard/candidates')}
//               >
//                 See All Candidates
//               </Button>
//             </CardContent>
//           </Card>
//         </Grid>



//         {/* Upcoming Interviews */}
//         <Grid item xs={12} md={4}>
//           <Card sx={{
//             borderRadius: 2,
//             boxShadow: 1
//           }}>
//             <CardHeader
//               title="Upcoming Interviews"
//               subheader="Next 3 days schedule"
//               action={
//                 <IconButton>
//                   <MoreVertIcon />
//                 </IconButton>
//               }
//             />
//             <CardContent>
//               <Stack spacing={2}>
//                 {[1, 2].map((item) => (
//                   <Paper
//                     key={item}
//                     sx={{
//                       p: 2,
//                       borderRadius: 1,
//                       border: `1px solid ${theme.palette.divider}`
//                     }}
//                   >
//                     <Typography variant="subtitle2" fontWeight="medium">
//                       {item === 1 ? 'Technical Screening' : 'Final Round'}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       {item === 1 ? 'React Developer' : 'Product Designer'}
//                     </Typography>
//                     <Divider sx={{ my: 1.5 }} />
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                       <Typography variant="body2">
//                         {item === 1 ? 'Tomorrow, 10:00 AM' : 'Wed, 2:00 PM'}
//                       </Typography>
//                       <Button
//                         variant="outlined"
//                         size="small"
//                         sx={{
//                           textTransform: 'none',
//                           minWidth: 0,
//                           p: '2px 8px'
//                         }}
//                       >
//                         View
//                       </Button>
//                     </Box>
//                   </Paper>
//                 ))}
//               </Stack>
//               <Button
//                 fullWidth
//                 variant="outlined"
//                 sx={{ mt: 2, textTransform: 'none' }}
//                 startIcon={<ScheduleIcon />}
//                 onClick={()=>navigate('/dashboard/interviews')}
//               >
//                 View Full Calendar
//               </Button>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Job Openings */}
//         <Grid item width={'100%'} xs={12} md={8}>
//           <Card sx={{
//             borderRadius: 2,
//             boxShadow: 1
//           }}>
//             <CardHeader
//               title="Active Job Openings"
//               subheader="Priority positions needing attention"
//               action={
//                 <Button
//                   variant="contained"
//                   size="small"
//                   sx={{ textTransform: 'none' }}
//                   onClick={() => navigate('/dashboard/jobs/createJob')}
//                 >
//                   Post New Job
//                 </Button>
//               }
//             />
//             <CardContent>
//               <Grid container spacing={2}>
//                 {allJobsActive.map((job, index) => (
//                   <Grid item xs={12} width={'23%'} sm={6} md={4} key={index} onClick={() => navigate(`/dashboard/jobs/${job._id}`)}>
//                     <Paper sx={{
//                       // width:'24%',
//                       p: 2,
//                       height: '100%',
//                       borderRadius: 1,
//                       border: `1px solid ${theme.palette.divider}`,
//                       '&:hover': {
//                         borderColor: 'primary.main'
//                       }
//                     }}>
//                       <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                         <Box>
//                           <Typography variant="subtitle1" fontWeight="medium">
//                             {job.jobTitle}
//                           </Typography>
//                           <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
//                             {job.department}
//                           </Typography>
//                         </Box>
//                         <Box sx={{ textAlign: 'right' }}>
//                           <Typography variant="subtitle2" color="primary" fontWeight="bold">
//                             {job.jobName}
//                           </Typography>
//                         </Box>
//                       </Box>

//                       <Box sx={{
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                         mt: 1.5,
//                         alignItems: 'center'
//                       }}>
//                         <Typography variant="body2">
//                           2 applicants
//                         </Typography>
//                         <Chip
//                           label={job.status}
//                           size="small"
//                           color={job.status === 'Active' ? 'success' : 'warning'}
//                           variant="outlined"
//                         />
//                       </Box>
//                       <LinearProgress
//                         variant="determinate"
//                         value={(25 / 30) * 100}
//                         sx={{
//                           mt: 2,
//                           height: 6,
//                           borderRadius: 3,
//                           backgroundColor: theme.palette.grey[200],
//                           '& .MuiLinearProgress-bar': {
//                             borderRadius: 3
//                           }
//                         }}
//                       />
//                       <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
//                         Open for {getTimeDifference(job.jobFormId.targetHireDate, 'future')}
//                       </Typography>
//                     </Paper>
//                   </Grid>
//                 ))}
//               </Grid>
//               <Stack >
//                 <Button

//                   variant="text"
//                   sx={{ mt: 2, textTransform: 'none' }}
//                   startIcon={<VisibilityIcon />}
//                   onClick={() => navigate('/dashboard/jobs')}
//                 >
//                   See All Jobs
//                 </Button>
//               </Stack>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default MenuDashboard;


//-------

import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, CardHeader, Avatar,
  IconButton, Divider, LinearProgress, Paper, Stack, Button, useTheme, Chip
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
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { fetchAlljobsByStatus, fetchCandidates } from '../utils/api';
import { useNavigate } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const labels = ['Sourced', 'Screening', 'Interview', 'Preboarding', 'Hired', 'Archived'];

const MenuDashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [allCandidates, setallCandidates] = useState([]);
  const [allJobsActive, setAllJobsActive] = useState([]);
  const [pipeData, setPipeData] = useState([]);

  const fetchData = async () => {
    const allCandidates = await fetchCandidates();
    const allJobsActive = await fetchAlljobsByStatus('Active');
    setallCandidates(allCandidates);
    setAllJobsActive(allJobsActive);
  };

  const pipelineDataSet = (allCandidates) => {
    const stageCounts = new Array(labels.length).fill(0);
  
    allCandidates.forEach(candidate => {
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
  

  useEffect(() => {
    const res = pipelineDataSet(allCandidates);
    setPipeData(res);
  }, [allCandidates]);

  useEffect(() => {
    fetchData();
  }, []);

  const stats = [
    {
      title: 'Total Candidates',
      value: allCandidates.length,
      icon: <PeopleIcon />,
      color: 'primary.main',
      navigate: '/dashboard/candidates'
    },
    {
      title: 'Active Jobs',
      value: allJobsActive.length,
      icon: <WorkIcon />,
      color: 'secondary.main',
      navigate: '/dashboard/jobs'
    },
    {
      title: 'Interviews Today',
      value: '8',
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

  return (
    <Box component="section" sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">Recruitment Dashboard</Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<FilterIcon />} sx={{ textTransform: 'none' }}>Filters</Button>
          <Button variant="contained" startIcon={<SearchIcon />} sx={{ textTransform: 'none' }}>Quick Search</Button>
        </Stack>
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
              subheader="Current distribution by stage"
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
          <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
            <CardHeader
              title="Recent Candidates"
              subheader="Latest additions to your pipeline"
              action={<IconButton><MoreVertIcon /></IconButton>}
            />
            <CardContent>
              <Stack spacing={2}>
                {allCandidates.slice(0, 3).map((candidate, index) => (
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
                      <Typography variant="body2" color="text.secondary">
                        FrontEnd Engineer
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

        {/* The rest (Upcoming Interviews, Job Openings, etc.) remains unchanged */}
        {/* You already had those working fine — no changes needed there */}

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
                onClick={() => navigate('/dashboard/interviews')}
              >
                View Full Calendar
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Job Openings */}
        <Grid item width={'100%'} xs={12} md={8}>
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
                  onClick={() => navigate('/dashboard/jobs/createJob')}
                >
                  Post New Job
                </Button>
              }
            />
            <CardContent>
              <Grid container spacing={2}>
                {allJobsActive.map((job, index) => (
                  <Grid item xs={12} width={'23%'} sm={6} md={4} key={index} onClick={() => navigate(`/dashboard/jobs/${job._id}`)}>
                    <Paper sx={{
                      // width:'24%',
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
                        <Typography variant="body2">
                          2 applicants
                        </Typography>
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
                     <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
  {job?.jobFormId?.targetHireDate
    ? `Open for ${getTimeDifference(job.jobFormId.targetHireDate, 'future')}`
    : 'Target date not set'}
</Typography>

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
    </Box>
  );
};

export default MenuDashboard;
