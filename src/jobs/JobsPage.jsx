

// import React, { useState, useEffect } from "react";
// import { 
//   Typography, 
//   IconButton, 
//   Card, 
//   CardContent, 
//   Chip,
//   Box,
//   Divider,
//   Stack,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   Switch,
//   Button,
//   Menu,
//   MenuItem,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   InputBase,
//   Container
// } from "@mui/material";
// import {
//   Star as StarIcon,
//   Person as PersonIcon,
//   CheckCircle as CheckCircleIcon,
//   CalendarToday as CalendarTodayIcon,
//   Work as WorkIcon,
//   LocationOn as LocationIcon,
//   AttachMoney as MoneyIcon,
//   AccessTime as TimeIcon,
//   Group as GroupIcon,
//   ViewModule as ViewModuleIcon,
//   TableRows as TableRowsIcon,
//   ArrowDropDown as ArrowDropDownIcon,
//   FilterList as FilterListIcon,
//   MoreVert as MoreVertIcon
// } from "@mui/icons-material";
// import { parseISO, format } from "date-fns";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/api";

// // Status options
// const statusOptions = {
//   'Active': ['Closed Own', 'Closed Lost', 'On Hold'],
//   'On Hold': ['Active', 'Closed Own', 'Closed Lost'],
//   'Closed Own': ['Active', 'On Hold'],
//   'Closed Lost': ['Active', 'On Hold'],
//   'Default': ['Active', 'Closed Own', 'Closed Lost', 'On Hold']
// };

// // Dropdown options per filter
// const filterOptions = {
//   status: ["Active", "On Hold", "Closed Own", "Closed Lost"],
//   businessUnit: ["Internal", "External"],
//   department: ["Developer", "Tester", "QA", "UI/UX", "DevOps", "Support"],
//   hiringManager: ["Aseem Gupta", "Himanshu Patel", "Preeti Kashyap"],
//   recruiter: ["Himanshu Patel", "Preeti Kashyap", "Richa Kumari"],
//   location: ["Mumbai", "Gurgaon", "Delhi", "Bengaluru", "Pune"],
// };

// // Filter fields config
// const filtersConfig = [
//   { label: "Status", id: "status" },
//   { label: "Business Unit", id: "businessUnit" },
//   { label: "Department", id: "department" },
//   { label: "Hiring Manager", id: "hiringManager" },
//   { label: "Recruiter", id: "recruiter" },
//   { label: "Location", id: "location" },
// ];

// const JobsPage = () => {
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [view, setView] = useState("card");
//   const [showPriority, setShowPriority] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState({});
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [statusMenuAnchorEl, setStatusMenuAnchorEl] = useState(null);
//   const [currentJobId, setCurrentJobId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await api.get('/jobs');
//         setJobs(response.data.jobs);
//         setLoading(false);
//       } catch (error) {
//         console.error('Failed to fetch jobs:', error);
//         if (error.response?.status === 401) {
//           localStorage.removeItem('token');
//           navigate('/login');
//         }
//         setLoading(false);
//       }
//     };
    
//     fetchJobs();
//   }, []);

//   useEffect(() => {
//     let result = jobs;
    
//     // Apply priority filter if needed
//     if (showPriority) {
//       result = result.filter(job => job.jobFormId?.markPriority);
//     }
    
//     // Apply search term filter
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       result = result.filter(job => 
//         (job.jobTitle && job.jobTitle.toLowerCase().includes(term)) ||
//         (job.jobName && job.jobName.toLowerCase().includes(term)) ||
//         (job.jobFormId?.location && job.jobFormId.location.toLowerCase().includes(term)) ||
//         (job.department && job.department.toLowerCase().includes(term)) ||
//         (job.jobFormId?.Client && job.jobFormId.Client.toLowerCase().includes(term))
//       );
//     }
    
//     // Apply other filters
//     Object.entries(filters).forEach(([key, value]) => {
//       if (value) {
//         result = result.filter(job => {
//           switch (key) {
//             case 'status':
//               // Check both explicit status and target hire date
//               const targetDate = job.jobFormId?.targetHireDate ? parseISO(job.jobFormId.targetHireDate) : null;
//               const isExpired = targetDate && new Date() > targetDate;
//               if (value === 'Active') {
//                 return (job.status === 'Active' || !job.status) && !isExpired;
//               } else if (value === 'Closed Lost') {
//                 return job.status === 'Closed Lost' || isExpired;
//               }
//               return job.status === value;
//             case 'businessUnit':
//               return job.jobFormId?.BusinessUnit === value.toLowerCase();
//             case 'department':
//               return job.department === value;
//             case 'hiringManager':
//               return job.hiringManager === value;
//             case 'recruiter':
//               return job.recruiter === value;
//             case 'location':
//               return job.jobFormId?.location === value;
//             default:
//               return true;
//           }
//         });
//       }
//     });
    
//     setFilteredJobs(result);
//   }, [jobs, showPriority, searchTerm, filters]);

//   // Calculate active jobs count based on status and target hire date
//   const activeJobsCount = jobs.filter(job => {
//     const targetDate = job.jobFormId?.targetHireDate ? parseISO(job.jobFormId.targetHireDate) : null;
//     const isExpired = targetDate && new Date() > targetDate;
//     return (job.status === 'Active' || !job.status) && !isExpired;
//   }).length;

//   const handleCreateJobClick = () => {
//     navigate("/create-job");
//   };

//   const handleMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleFilterChange = (filterId, value) => {
//     setFilters(prev => ({
//       ...prev,
//       [filterId]: value
//     }));
//   };

//   const handleStatusMenuClick = (event, jobId) => {
//     event.stopPropagation();
//     setStatusMenuAnchorEl(event.currentTarget);
//     setCurrentJobId(jobId);
//   };

//   const handleStatusMenuClose = () => {
//     setStatusMenuAnchorEl(null);
//     setCurrentJobId(null);
//   };

//   const handleStatusChange = async (newStatus) => {
//     try {
//       await api.patch(`/jobs/${currentJobId}`, { status: newStatus });
//       setJobs(jobs.map(job => 
//         job._id === currentJobId ? { ...job, status: newStatus } : job
//       ));
//       handleStatusMenuClose();
//     } catch (error) {
//       console.error('Failed to update job status:', error);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Active': return 'success';
//       case 'On Hold': return 'warning';
//       case 'Closed Own': return 'primary';
//       case 'Closed Lost': return 'error';
//       default: return 'default';
//     }
//   };

//   const getAvailableStatusChanges = (currentStatus) => {
//     return statusOptions[currentStatus] || statusOptions['Default'];
//   };

//   const getJobStatus = (job) => {
//     const targetDate = job.jobFormId?.targetHireDate ? parseISO(job.jobFormId.targetHireDate) : null;
//     const isExpired = targetDate && new Date() > targetDate;
    
//     if (job.status) {
//       return job.status;
//     }
//     return isExpired ? 'Closed Lost' : 'Active';
//   };

//   const handleJobCardClick = (jobId) => {
//     navigate(`/jobs/${jobId}`);
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Container maxWidth="xl" sx={{ py: 1 }}>
//       {/* Header Section */}
//       <Paper elevation={0} sx={{
//         display: "flex",
//         flexWrap: "wrap",
//         alignItems: "center",
//         justifyContent: "space-between",
//         gap: 2,
//         p: 2,
//         mb: 2
//       }}>
//         <Box sx={{ flex: 1 }}>
//           <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
//             Active Jobs ({activeJobsCount})
//           </Typography>
//           <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//             Here you can find all the jobs of this organisation.
//           </Typography>
//         </Box>

//         <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <Switch
//               checked={showPriority}
//               onChange={(e) => setShowPriority(e.target.checked)}
//               color="primary"
//             />
//             <Typography variant="body2">Priority Only</Typography>
//           </Box>

//           <Box sx={{ display: "flex", gap: 1 }}>
//             <IconButton
//               onClick={() => setView("card")}
//               color={view === "card" ? "primary" : "default"}
//               size="small"
//             >
//               <ViewModuleIcon />
//             </IconButton>
//             <IconButton
//               onClick={() => setView("table")}
//               color={view === "table" ? "primary" : "default"}
//               size="small"
//             >
//               <TableRowsIcon />
//             </IconButton>
//           </Box>

//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleCreateJobClick}
//               size="small"
//               sx={{
//                 borderTopRightRadius: 0,
//                 borderBottomRightRadius: 0,
//                 height: '36px'
//               }}
//             >
//               Create Job
//             </Button>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleMenuClick}
//               size="small"
//               sx={{
//                 borderTopLeftRadius: 0,
//                 borderBottomLeftRadius: 0,
//                 minWidth: '36px',
//                 height: '36px'
//               }}
//             >
//               <ArrowDropDownIcon fontSize="small" />
//             </Button>
//             <Menu
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={handleMenuClose}
//             >
//               <MenuItem onClick={handleMenuClose}>Import Jobs</MenuItem>
//               <MenuItem onClick={handleMenuClose}>Duplicate Job</MenuItem>
//               <MenuItem onClick={handleMenuClose}>Closed Own</MenuItem>
//               <MenuItem onClick={handleMenuClose}>On Hold</MenuItem>
//               <MenuItem onClick={handleMenuClose}>Archived</MenuItem>
//             </Menu>
//           </Box>
//         </Box>
//       </Paper>

//       {/* Filters Section */}
//       <Paper sx={{ p: 2, mb: 2 }}>
//         <Grid container spacing={2}>
//           {filtersConfig.map((filter) => (
//             <Grid item xs={6} sm={4} md={2} key={filter.id}>
//               <FormControl fullWidth size="small" sx={{ minWidth: 195 }}>
//                 <InputLabel>{filter.label}</InputLabel>
//                 <Select
//                   value={filters[filter.id] || ""}
//                   onChange={(e) => handleFilterChange(filter.id, e.target.value)}
//                   label={filter.label}
//                 >
//                   {filterOptions[filter.id]?.map((option) => (
//                     <MenuItem key={option} value={option}>
//                       {option}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Search Input Section */}
//         <Box sx={{ mt: 2, display: 'flex', maxWidth: '100%' }}>
//           <InputBase
//             fullWidth
//             value={searchTerm}
//             onChange={handleSearchChange}
//             placeholder="Search jobs by title, job name, location, department or client..."
//             sx={{
//               p: '8px 12px',
//               border: '1px solid #ddd',
//               borderRadius: '4px',
//               fontSize: '14px',
//             }}
//             startAdornment={
//               <IconButton size="small" sx={{ mr: 1 }}>
//                 <FilterListIcon fontSize="small" />
//               </IconButton>
//             }
//           />
//         </Box>
//       </Paper>

//       {/* Job List Section */}
//       {filteredJobs.length === 0 ? (
//         <Box display="flex" justifyContent="center" mt={4}>
//           <Typography variant="h6">No jobs match your criteria</Typography>
//         </Box>
//       ) : view === "table" ? (
//         <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 'none', border: '1px solid #eee' }}>
//           <Table sx={{ minWidth: 650 }} size="small">
//             <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 'bold' }}>SI.NO</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>Job Name</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>Job Title</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>Department</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>Business Unit</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>Client</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>Openings</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>Hire Date</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>Priority</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredJobs.map((job, index) => {
//                 const jobForm = job.jobFormId || {};
//                 const targetDate = jobForm.targetHireDate ? parseISO(jobForm.targetHireDate) : null;
//                 const status = getJobStatus(job);

//                 return (
//                   <TableRow 
//                     key={job._id} 
//                     hover 
//                     onClick={() => handleJobCardClick(job._id)}
//                     sx={{ 
//                       cursor: 'pointer',
//                       '&:nth-of-type(even)': { backgroundColor: '#fafafa' }
//                     }}
//                   >
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell sx={{ fontWeight: 500 }}>{job.jobName}</TableCell>
//                     <TableCell>{job.jobTitle}</TableCell>
//                     <TableCell>{job.department}</TableCell>
//                     <TableCell>{jobForm.location || "Remote"}</TableCell>
//                     <TableCell>{jobForm.BusinessUnit ? jobForm.BusinessUnit.charAt(0).toUpperCase() + jobForm.BusinessUnit.slice(1) : "-"}</TableCell>
//                     <TableCell>{jobForm.Client ? `Client: ${jobForm.Client}` : "-"}</TableCell>
//                     <TableCell align="center">{jobForm.openings || 0}</TableCell>
//                     <TableCell>
//                       {targetDate ? format(targetDate, 'MMM dd') : "-"}
//                     </TableCell>
//                     <TableCell>
//                       <Chip 
//                         label={status} 
//                         size="small" 
//                         color={getStatusColor(status)} 
//                         variant="outlined"
//                         sx={{ borderRadius: 1 }}
//                       />
//                     </TableCell>
//                     <TableCell align="center">
//                       {jobForm.markPriority ? (
//                         <StarIcon color="primary" fontSize="small" />
//                       ) : (
//                         "-"
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       ) : (
//         <Box sx={{ 
//           display: 'grid',
//           gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
//           gap: 3,
//           p: 1
//         }}>
//           {filteredJobs.map((job) => {
//             const jobForm = job.jobFormId || {};
//             const postedDate = parseISO(job.createdAt);
//             const targetDate = jobForm.targetHireDate ? parseISO(jobForm.targetHireDate) : null;
//             const status = getJobStatus(job);
//             const availableStatusChanges = getAvailableStatusChanges(status);

//             return (
//               <Card 
//                 key={job._id}
//                 onClick={() => handleJobCardClick(job._id)}
//                 sx={{ 
//                   cursor: 'pointer',
//                   height: '100%',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   borderLeft: jobForm.markPriority ? '4px solid #FFD700' : 'none',
//                   boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
//                   transition: 'all 0.3s ease',
//                   '&:hover': {
//                     transform: 'translateY(-2px)',
//                     boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
//                   }
//                 }}
//               >
//                 <CardContent sx={{ flexGrow: 1, p: 2 }}>
//                   <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
//                     <Box>
//                       <Typography variant="subtitle2" color="primary" fontWeight="bold">
//                         {job.jobName}
//                       </Typography>
//                       <Typography variant="subtitle1" fontWeight="bold" noWrap>
//                         {job.jobTitle}
//                       </Typography>
//                     </Box>
//                     <Box display="flex" alignItems="center">
//                       {jobForm.markPriority && (
//                         <StarIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
//                       )}
//                       <IconButton
//                         size="small"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleStatusMenuClick(e, job._id);
//                         }}
//                       >
//                         <MoreVertIcon fontSize="small" />
//                       </IconButton>
//                     </Box>
//                   </Box>

//                   <Box display="flex" alignItems="center" mb={1} gap={1}>
//                     <WorkIcon color="action" fontSize="small" />
//                     <Typography variant="body2" color="text.secondary" noWrap>
//                       {job.department}
//                     </Typography>
//                     <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
//                     <LocationIcon color="action" fontSize="small" />
//                     <Typography variant="body2" color="text.secondary" noWrap>
//                       {jobForm.location || "Remote"}
//                     </Typography>
//                   </Box>

//                   <Stack direction="row" spacing={1} mb={1} flexWrap="wrap" useFlexGap>
//                     <Chip 
//                       icon={<GroupIcon fontSize="small" />}
//                       label={`${jobForm.openings || 0} openings`}
//                       size="small"
//                       variant="outlined"
//                     />
//                     <Chip 
//                       icon={<MoneyIcon fontSize="small" />}
//                       label={`${jobForm.currency || 'USD'} ${jobForm.amount || '0'}`}
//                       size="small"
//                       variant="outlined"
//                     />
//                     <Chip 
//                       icon={<TimeIcon fontSize="small" />}
//                       label={jobForm.jobType || 'Full-time'}
//                       size="small"
//                       variant="outlined"
//                     />
//                   </Stack>

//                   <Divider sx={{ my: 1 }} />

//                   <Box display="flex" justifyContent="space-between" alignItems="center">
//                     <Box display="flex" alignItems="center" gap={1}>
//                       <CalendarTodayIcon color="action" fontSize="small" />
//                       <Box>
//                         <Typography variant="caption" color="text.secondary">
//                           Hire Date
//                         </Typography>
//                         <Typography variant="body2" fontWeight={500}>
//                           {targetDate ? format(targetDate, 'MMM dd') : "Not set"}
//                         </Typography>
//                       </Box>
//                     </Box>
//                     <Chip 
//                       label={status}
//                       size="small"
//                       color={getStatusColor(status)}
//                       variant="outlined"
//                     />
//                   </Box>

//                   <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
//                     <Box display="flex" alignItems="center" gap={1}>
//                       <PersonIcon color="action" fontSize="small" />
//                       <Typography variant="body2" color="text.secondary">
//                         New Candidates
//                       </Typography>
//                     </Box>
//                     <Box display="flex" flexDirection="column" alignItems="flex-end">
//                       <Typography variant="caption" color="text.secondary">
//                         {jobForm.BusinessUnit === 'external' ? 'External' : 'Internal'}
//                       </Typography>
//                       {jobForm.BusinessUnit === 'external' && jobForm.Client && (
//                         <Typography variant="caption" fontWeight={600}>
//                           Client: {jobForm.Client}
//                         </Typography>
//                       )}
//                     </Box>
//                   </Box>
//                 </CardContent>

//                 {/* Status change menu */}
//                 <Menu
//                   anchorEl={statusMenuAnchorEl}
//                   open={Boolean(statusMenuAnchorEl && currentJobId === job._id)}
//                   onClose={handleStatusMenuClose}
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   <Typography variant="subtitle2" sx={{ px: 2, py: 1 }}>
//                     Change {status} to:
//                   </Typography>
//                   {availableStatusChanges.map(status => (
//                     <MenuItem 
//                       key={status} 
//                       onClick={() => handleStatusChange(status)}
//                       sx={{ minWidth: 150 }}
//                     >
//                       <CheckCircleIcon 
//                         color={getStatusColor(status)} 
//                         sx={{ mr: 1, fontSize: '1rem' }} 
//                       />
//                       {status}
//                     </MenuItem>
//                   ))}
//                 </Menu>
//               </Card>
//             );
//           })}
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default JobsPage;

//--------------


import React, { useState, useEffect } from "react";
import { 
  Typography, 
  IconButton, 
  Card, 
  CardContent, 
  Chip,
  Box,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Switch,
  Button,
  Menu,
  MenuItem,
  Grid,
  FormControl,
  InputLabel,
  Select,
  InputBase,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import {
  Star as StarIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  CalendarToday as CalendarTodayIcon,
  Work as WorkIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  AccessTime as TimeIcon,
  Group as GroupIcon,
  ViewModule as ViewModuleIcon,
  TableRows as TableRowsIcon,
  ArrowDropDown as ArrowDropDownIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  Archive as ArchiveIcon
} from "@mui/icons-material";
import { parseISO, format } from "date-fns";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const statusOptions = {
  'Active': ['Closed Own', 'Closed Lost', 'On Hold', 'Archived'],
  'On Hold': ['Active', 'Closed Own', 'Closed Lost', 'Archived'],
  'Closed Own': ['Active', 'On Hold', 'Archived'],
  'Closed Lost': ['Active', 'On Hold', 'Archived'],
  'Default': ['Active', 'Closed Own', 'Closed Lost', 'On Hold', 'Archived']
};

const filterOptions = {
  status: ["Active", "On Hold", "Closed Own", "Closed Lost"],
  businessUnit: ["Internal", "External"],
  department: ["Developer", "Tester", "QA", "UI/UX", "DevOps", "Support"],
  hiringManager: ["Aseem Gupta", "Himanshu Patel", "Preeti Kashyap"],
  recruiter: ["Himanshu Patel", "Preeti Kashyap", "Richa Kumari"],
  location: ["Mumbai", "Gurgaon", "Delhi", "Bengaluru", "Pune"],
};

const filtersConfig = [
  { label: "Status", id: "status" },
  { label: "Business Unit", id: "businessUnit" },
  { label: "Department", id: "department" },
  { label: "Hiring Manager", id: "hiringManager" },
  { label: "Recruiter", id: "recruiter" },
  { label: "Location", id: "location" },
];

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [archivedJobs, setArchivedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("card");
  const [showPriority, setShowPriority] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [statusMenuAnchorEl, setStatusMenuAnchorEl] = useState(null);
  const [currentJobId, setCurrentJobId] = useState(null);
  const [showArchived, setShowArchived] = useState(false);
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);
  const [jobToArchive, setJobToArchive] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/jobs');
        const allJobs = response.data.jobs;
        
        // Separate active and archived jobs
        const activeJobs = allJobs.filter(job => job.status !== 'Archived');
        const archived = allJobs.filter(job => job.status === 'Archived');
        
        setJobs(activeJobs);
        setArchivedJobs(archived);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, []);

  useEffect(() => {
    const jobsToFilter = showArchived ? archivedJobs : jobs;
    let result = jobsToFilter;
    
    // Apply priority filter if needed
    if (showPriority && !showArchived) {
      result = result.filter(job => job.jobFormId?.markPriority);
    }
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(job => 
        (job.jobTitle && job.jobTitle.toLowerCase().includes(term)) ||
        (job.jobName && job.jobName.toLowerCase().includes(term)) ||
        (job.jobFormId?.location && job.jobFormId.location.toLowerCase().includes(term)) ||
        (job.department && job.department.toLowerCase().includes(term)) ||
        (job.jobFormId?.Client && job.jobFormId.Client.toLowerCase().includes(term))
      );
    }
    
    // Apply other filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter(job => {
          switch (key) {
            case 'status':
              // Check both explicit status and target hire date
              const targetDate = job.jobFormId?.targetHireDate ? parseISO(job.jobFormId.targetHireDate) : null;
              const isExpired = targetDate && new Date() > targetDate;
              if (value === 'Active') {
                return (job.status === 'Active' || !job.status) && !isExpired;
              } else if (value === 'Closed Lost') {
                return job.status === 'Closed Lost' || isExpired;
              }
              return job.status === value;
            case 'businessUnit':
              return job.jobFormId?.BusinessUnit === value.toLowerCase();
            case 'department':
              return job.department === value;
            case 'hiringManager':
              return job.hiringManager === value;
            case 'recruiter':
              return job.recruiter === value;
            case 'location':
              return job.jobFormId?.location === value;
            default:
              return true;
          }
        });
      }
    });
    
    setFilteredJobs(result);
  }, [jobs, archivedJobs, showArchived, showPriority, searchTerm, filters]);

  // Calculate active jobs count based on status and target hire date
  const activeJobsCount = jobs.filter(job => {
    const targetDate = job.jobFormId?.targetHireDate ? parseISO(job.jobFormId.targetHireDate) : null;
    const isExpired = targetDate && new Date() > targetDate;
    return (job.status === 'Active' || !job.status) && !isExpired;
  }).length;

  const handleCreateJobClick = () => {
    navigate("/create-job");
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filterId, value) => {
    setFilters(prev => ({
      ...prev,
      [filterId]: value
    }));
  };

  const handleStatusMenuClick = (event, jobId) => {
    event.stopPropagation();
    setStatusMenuAnchorEl(event.currentTarget);
    setCurrentJobId(jobId);
  };

  const handleStatusMenuClose = () => {
    setStatusMenuAnchorEl(null);
    setCurrentJobId(null);
  };

  const handleArchiveClick = (event, jobId) => {
    event.stopPropagation();
    setJobToArchive(jobId);
    setShowArchiveDialog(true);
  };

  const handleArchiveDialogClose = () => {
    setShowArchiveDialog(false);
    setJobToArchive(null);
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await api.patch(`/jobs/${currentJobId}`, { status: newStatus });
      
      if (newStatus === 'Archived') {
        // Move job from active to archived
        const jobToArchive = jobs.find(job => job._id === currentJobId);
        setJobs(jobs.filter(job => job._id !== currentJobId));
        setArchivedJobs([...archivedJobs, {...jobToArchive, status: 'Archived'}]);
      } else {
        // Update status in active jobs
        setJobs(jobs.map(job => 
          job._id === currentJobId ? { ...job, status: newStatus } : job
        ));
      }
      
      handleStatusMenuClose();
    } catch (error) {
      console.error('Failed to update job status:', error);
    }
  };

  const handleArchiveConfirm = async () => {
    try {
      await api.patch(`/jobs/${jobToArchive}`, { status: 'Archived' });
      
      // Move job from active to archived
      const jobToMove = jobs.find(job => job._id === jobToArchive);
      setJobs(jobs.filter(job => job._id !== jobToArchive));
      setArchivedJobs([...archivedJobs, {...jobToMove, status: 'Archived'}]);
      
      setShowArchiveDialog(false);
      setJobToArchive(null);
    } catch (error) {
      console.error('Failed to archive job:', error);
    }
  };

  const handleShowArchived = () => {
    setShowArchived(!showArchived);
    setFilters({});
    setSearchTerm("");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'success';
      case 'On Hold': return 'warning';
      case 'Closed Own': return 'primary';
      case 'Closed Lost': return 'error';
      case 'Archived': return 'default';
      default: return 'default';
    }
  };

  const getAvailableStatusChanges = (currentStatus) => {
    return statusOptions[currentStatus] || statusOptions['Default'];
  };

  const getJobStatus = (job) => {
    const targetDate = job.jobFormId?.targetHireDate ? parseISO(job.jobFormId.targetHireDate) : null;
    const isExpired = targetDate && new Date() > targetDate;
    
    if (job.status) {
      return job.status;
    }
    return isExpired ? 'Closed Lost' : 'Active';
  };

  const handleJobCardClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 1 }}>
      {/* Archive Confirmation Dialog */}
      <Dialog open={showArchiveDialog} onClose={handleArchiveDialogClose}>
        <DialogTitle>Archive Job</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to archive this job?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleArchiveDialogClose}>Cancel</Button>
          <Button onClick={handleArchiveConfirm} color="primary" variant="contained">
            Archive
          </Button>
        </DialogActions>
      </Dialog>

      {/* Header Section */}
      <Paper elevation={0} sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        p: 2,
        mb: 2
      }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            {showArchived ? 'Archived Jobs' : `Active Jobs (${activeJobsCount})`}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {showArchived ? 'Viewing archived jobs' : 'Here you can find all the jobs of this organisation.'}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
          {!showArchived && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Switch
                checked={showPriority}
                onChange={(e) => setShowPriority(e.target.checked)}
                color="primary"
              />
              <Typography variant="body2">Priority Only</Typography>
            </Box>
          )}

          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              onClick={() => setView("card")}
              color={view === "card" ? "primary" : "default"}
              size="small"
            >
              <ViewModuleIcon />
            </IconButton>
            <IconButton
              onClick={() => setView("table")}
              color={view === "table" ? "primary" : "default"}
              size="small"
            >
              <TableRowsIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              variant={showArchived ? "outlined" : "contained"}
              color="primary"
              onClick={handleShowArchived}
              size="small"
              startIcon={<ArchiveIcon />}
            >
              {showArchived ? 'Back to Active' : 'View Archived'}
            </Button>

            {!showArchived && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreateJobClick}
                  size="small"
                  sx={{
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    height: '36px'
                  }}
                >
                  Create Job
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleMenuClick}
                  size="small"
                  sx={{
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    minWidth: '36px',
                    height: '36px',
                  }}
                >
                  <ArrowDropDownIcon fontSize="small" />
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleMenuClose}>Import Jobs</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Duplicate Job</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Closed Own</MenuItem>
                  <MenuItem onClick={handleMenuClose}>On Hold</MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Filters Section */}
      {!showArchived && (
        <Paper sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            {filtersConfig.map((filter) => (
              <Grid item xs={6} sm={4} md={2} key={filter.id}>
                <FormControl fullWidth size="small" sx={{ minWidth: 195 }}>
                  <InputLabel>{filter.label}</InputLabel>
                  <Select
                    value={filters[filter.id] || ""}
                    onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                    label={filter.label}
                  >
                    {filterOptions[filter.id]?.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            ))}
          </Grid>

          {/* Search Input Section */}
          <Box sx={{ mt: 2, display: 'flex', maxWidth: '100%' }}>
            <InputBase
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={`Search ${showArchived ? 'archived' : ''} jobs by title, job name, location, department or client...`}
              sx={{
                p: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
              }}
              startAdornment={
                <IconButton size="small" sx={{ mr: 1 }}>
                  <FilterListIcon fontSize="small" />
                </IconButton>
              }
            />
          </Box>
        </Paper>
      )}

      {/* Job List Section */}
      {filteredJobs.length === 0 ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <Typography variant="h6">
            {showArchived ? 'No archived jobs found' : 'No jobs match your criteria'}
          </Typography>
        </Box>
      ) : view === "table" ? (
        <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 'none', border: '1px solid #eee' }}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>SI.NO</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Job Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Job Title</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Department</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Business Unit</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Client</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Openings</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Hire Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Priority</TableCell>
                {!showArchived && <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredJobs.map((job, index) => {
                const jobForm = job.jobFormId || {};
                const targetDate = jobForm.targetHireDate ? parseISO(jobForm.targetHireDate) : null;
                const status = getJobStatus(job);

                return (
                  <TableRow 
                    key={job._id} 
                    hover 
                    onClick={() => handleJobCardClick(job._id)}
                    sx={{ 
                      cursor: 'pointer',
                      '&:nth-of-type(even)': { backgroundColor: '#fafafa' }
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>{job.jobName}</TableCell>
                    <TableCell>{job.jobTitle}</TableCell>
                    <TableCell>{job.department}</TableCell>
                    <TableCell>{jobForm.location || "Remote"}</TableCell>
                    <TableCell>{jobForm.BusinessUnit ? jobForm.BusinessUnit.charAt(0).toUpperCase() + jobForm.BusinessUnit.slice(1) : "-"}</TableCell>
                    <TableCell>{jobForm.Client ? `Client: ${jobForm.Client}` : "-"}</TableCell>
                    <TableCell align="center">{jobForm.openings || 0}</TableCell>
                    <TableCell>
                      {targetDate ? format(targetDate, 'MMM dd') : "-"}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={status} 
                        size="small" 
                        color={getStatusColor(status)} 
                        variant="outlined"
                        sx={{ borderRadius: 1 }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {jobForm.markPriority ? (
                        <StarIcon color="primary" fontSize="small" />
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    {!showArchived && (
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleArchiveClick(e, job._id);
                          }}
                        >
                          <ArchiveIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 3,
          p: 1
        }}>
          {filteredJobs.map((job) => {
            const jobForm = job.jobFormId || {};
            const postedDate = parseISO(job.createdAt);
            const targetDate = jobForm.targetHireDate ? parseISO(jobForm.targetHireDate) : null;
            const status = getJobStatus(job);
            const availableStatusChanges = getAvailableStatusChanges(status);

            return (
              <Card 
                key={job._id}
                onClick={() => handleJobCardClick(job._id)}
                sx={{ 
                  cursor: 'pointer',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderLeft: jobForm.markPriority ? '4px solid #FFD700' : 'none',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Box>
                      <Typography variant="subtitle2" color="primary" fontWeight="bold">
                        {job.jobName}
                      </Typography>
                      <Typography variant="subtitle1" fontWeight="bold" noWrap>
                        {job.jobTitle}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      {jobForm.markPriority && (
                        <StarIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
                      )}
                      {!showArchived && (
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusMenuClick(e, job._id);
                          }}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="center" mb={1} gap={1}>
                    <WorkIcon color="action" fontSize="small" />
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {job.department}
                    </Typography>
                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                    <LocationIcon color="action" fontSize="small" />
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {jobForm.location || "Remote"}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1} mb={1} flexWrap="wrap" useFlexGap>
                    <Chip 
                      icon={<GroupIcon fontSize="small" />}
                      label={`${jobForm.openings || 0} openings`}
                      size="small"
                      variant="outlined"
                    />
                    <Chip 
                      icon={<MoneyIcon fontSize="small" />}
                      label={`${jobForm.currency || 'USD'} ${jobForm.amount || '0'}`}
                      size="small"
                      variant="outlined"
                    />
                    <Chip 
                      icon={<TimeIcon fontSize="small" />}
                      label={jobForm.jobType || 'Full-time'}
                      size="small"
                      variant="outlined"
                    />
                  </Stack>

                  <Divider sx={{ my: 1 }} />

                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center" gap={1}>
                      <CalendarTodayIcon color="action" fontSize="small" />
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Hire Date
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                          {targetDate ? format(targetDate, 'MMM dd') : "Not set"}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip 
                      label={status}
                      size="small"
                      color={getStatusColor(status)}
                      variant="outlined"
                    />
                  </Box>

                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <PersonIcon color="action" fontSize="small" />
                      <Typography variant="body2" color="text.secondary">
                        New Candidates
                      </Typography>
                    </Box>
                    <Box display="flex" flexDirection="column" alignItems="flex-end">
                      <Typography variant="caption" color="text.secondary">
                        {jobForm.BusinessUnit === 'external' ? 'External' : 'Internal'}
                      </Typography>
                      {jobForm.BusinessUnit === 'external' && jobForm.Client && (
                        <Typography variant="caption" fontWeight={600}>
                          Client: {jobForm.Client}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </CardContent>

                {/* Status change menu */}
                {!showArchived && (
                  <Menu
                    anchorEl={statusMenuAnchorEl}
                    open={Boolean(statusMenuAnchorEl && currentJobId === job._id)}
                    onClose={handleStatusMenuClose}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Typography variant="subtitle2" sx={{ px: 2, py: 1 }}>
                      Change {status} to:
                    </Typography>
                    {availableStatusChanges.map(status => (
                      <MenuItem 
                        key={status} 
                        onClick={() => handleStatusChange(status)}
                        sx={{ minWidth: 150 }}
                      >
                        <CheckCircleIcon 
                          color={getStatusColor(status)} 
                          sx={{ mr: 1, fontSize: '1rem' }} 
                        />
                        {status}
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              </Card>
            );
          })}
        </Box>
      )}
    </Container>
  );
};

export default JobsPage;