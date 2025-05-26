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
//   FilterList as FilterListIcon
// } from "@mui/icons-material";
// import { parseISO, format } from "date-fns";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/api";

// // Dropdown options per filter
// const filterOptions = {
//   status: ["On Hold", "Closed Own", "Active", "Closed Lost"],
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
//         (job.jobFormId?.location && job.jobFormId.location.toLowerCase().includes(term)) ||
//         (job.department && job.department.toLowerCase().includes(term))
//       );
//     }
    
//     // Apply other filters
//     Object.entries(filters).forEach(([key, value]) => {
//       if (value) {
//         result = result.filter(job => {
//           switch (key) {
//             case 'status':
//               const targetDate = job.jobFormId?.targetHireDate ? parseISO(job.jobFormId.targetHireDate) : null;
//               const isExpired = targetDate && new Date() > targetDate;
//               return value === 'Active' ? !isExpired : isExpired;
//             case 'businessUnit':
//               return job.businessUnit === value;
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

//   const activeJobsCount = jobs.filter(job => {
//     const targetDate = job.jobFormId?.targetHireDate ? parseISO(job.jobFormId.targetHireDate) : null;
//     return !(targetDate && new Date() > targetDate);
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
//         p: 1,
//         mb: 3
//       }}>
//         <Box sx={{ flex: 1 }}>
//           <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
//             Active Jobs ({activeJobsCount})
//           </Typography>
//           <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1 }}>
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
//             <Typography variant="body2">Show only priority</Typography>
//           </Box>

//           <Box sx={{ display: "flex", gap: 1 }}>
//             <IconButton
//               onClick={() => setView("card")}
//               color={view === "card" ? "primary" : "default"}
//             >
//               <ViewModuleIcon />
//             </IconButton>
//             <IconButton
//               onClick={() => setView("table")}
//               color={view === "table" ? "primary" : "default"}
//             >
//               <TableRowsIcon />
//             </IconButton>
//           </Box>

//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleCreateJobClick}
//               sx={{
//                 borderTopRightRadius: 0,
//                 borderBottomRightRadius: 0,
//                 height: '40px',
//                 minHeight: '40px'
//               }}
//             >
//               Create Job
//             </Button>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleMenuClick}
//               sx={{
//                 borderTopLeftRadius: 0,
//                 borderBottomLeftRadius: 0,
//                 minWidth: '40px',
//                 height: '40px',
//                 minHeight: '40px'
//               }}
//             >
//               <ArrowDropDownIcon />
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
//       <Paper className="p-4 mb-6 mt-4 shadow-md">
//         <Grid container spacing={2}>
//           {filtersConfig.map((filter) => (
//             <Grid item xs={12} sm={6} md={4} key={filter.id}>
//               <FormControl fullWidth size="small" sx={{ minWidth: 200 }}>
//                 <InputLabel id={`${filter.id}-label`}>{filter.label}</InputLabel>
//                 <Select
//                   labelId={`${filter.id}-label`}
//                   id={filter.id}
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
//         <Grid container spacing={2} className="mt-4">
//           <Grid item xs={12} className="relative">
//             <Box sx={{ display: "flex", width: "200%", position: "relative" }}>
//               <InputBase
//                 fullWidth
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 placeholder="Search jobs by title, location, department etc."
//                 sx={{
//                   padding: "8px 12px",
//                   border: "1px solid #ccc",
//                   borderRadius: "4px",
//                   fontSize: "13px",
//                   paddingRight: "455px",
//                   flexGrow: 1,
//                 }}
//               />
//               <IconButton
//                 sx={{
//                   position: "absolute",
//                   right: "10px",
//                   top: "50%",
//                   transform: "translateY(-50%)",
//                   padding: "8px",
//                   borderRadius: "50%",
//                   backgroundColor: "#f4f4f4",
//                   color: "#333",
//                 }}
//               >
//                 <FilterListIcon />
//               </IconButton>
//             </Box>
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* Job List Section */}
//       {filteredJobs.length === 0 ? (
//         <Box display="flex" justifyContent="center" mt={4}>
//           <Typography variant="h6">No jobs match your criteria</Typography>
//         </Box>
//       ) : view === "table" ? (
//         <TableContainer component={Paper} sx={{ mt: 2 }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Job Title</TableCell>
//                 <TableCell>Department</TableCell>
//                 <TableCell>Location</TableCell>
//                 <TableCell>Openings</TableCell>
//                 <TableCell>Target Hire Date</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Priority</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredJobs.map((job) => {
//                 const jobForm = job.jobFormId || {};
//                 const targetDate = jobForm.targetHireDate ? parseISO(jobForm.targetHireDate) : null;
//                 const isExpired = targetDate && new Date() > targetDate;

//                 return (
//                   <TableRow 
//                     key={job._id} 
//                     hover 
//                     onClick={() => navigate(`/jobs/${job._id}`)}
//                     sx={{ cursor: 'pointer' }}
//                   >
//                     <TableCell>{job.jobTitle}</TableCell>
//                     <TableCell>{job.department}</TableCell>
//                     <TableCell>{jobForm.location || "Remote"}</TableCell>
//                     <TableCell>{jobForm.openings || 0}</TableCell>
//                     <TableCell>
//                       {targetDate ? format(targetDate, 'MMM dd, yyyy') : "Not set"}
//                     </TableCell>
//                     <TableCell>
//                       {isExpired ? (
//                         <Chip label="Expired" color="error" size="small" />
//                       ) : (
//                         <Chip label="Active" color="success" size="small" />
//                       )}
//                     </TableCell>
//                     <TableCell>
//                       {jobForm.markPriority ? (
//                         <StarIcon color="primary" />
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
//           p: 3,
          
//         }}>
//           {filteredJobs.map((job) => {
//             const jobForm = job.jobFormId || {};
//             const postedDate = parseISO(job.createdAt);
//             const targetDate = jobForm.targetHireDate ? parseISO(jobForm.targetHireDate) : null;
//             const isExpired = targetDate && new Date() > targetDate;
//             const isArchived = isExpired;

//             return (
//               <Card 
//                 key={job._id}
//                 onClick={() => navigate(`/jobs/${job._id}`)}
//                 sx={{ 
//                   cursor: 'pointer',
//                   height: '100%',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   borderLeft: jobForm.markPriority ? '4px solid #FFD700' : 'none',
//                   boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
//                   transition: 'all 0.3s ease',
//                   '&:hover': {
//                     transform: 'translateY(-4px)',
//                     boxShadow: '0 6px 12px rgba(0,0,0,0.1)'
//                   },
//                   ...(isArchived ? {
//                     border: '1px solid #f44336',
//                     opacity: 0.9,
//                     backgroundColor: 'rgba(244, 67, 54, 0.05)'
//                   } : {})
//                 }}
//               >
//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                     <Typography variant="h6" fontWeight="bold" noWrap>
//                       {job.jobTitle}
//                     </Typography>
//                     {jobForm.markPriority && (
//                       <IconButton size="small" color="primary" sx={{ p: 0 }}>
//                         <StarIcon />
//                       </IconButton>
//                     )}
//                   </Box>

//                   <Box display="flex" alignItems="center" mb={2} gap={1}>
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

//                   <Stack direction="row" spacing={1} mb={2} flexWrap="wrap" useFlexGap>
//                     <Chip 
//                       icon={<GroupIcon fontSize="small" />}
//                       label={`${jobForm.openings || 0} openings`}
//                       size="small"
//                       variant="outlined"
//                       sx={{ borderRadius: 1 }}
//                     />
//                     <Chip 
//                       icon={<MoneyIcon fontSize="small" />}
//                       label={`${jobForm.currency || 'USD'} ${jobForm.amount || '0'}`}
//                       size="small"
//                       variant="outlined"
//                       sx={{ borderRadius: 1 }}
//                     />
//                     <Chip 
//                       icon={<TimeIcon fontSize="small" />}
//                       label={jobForm.jobType || 'Full-time'}
//                       size="small"
//                       variant="outlined"
//                       sx={{ borderRadius: 1 }}
//                     />
//                   </Stack>

//                   <Divider sx={{ my: 1.5 }} />

//                   <Box display="flex" justifyContent="space-between" alignItems="center">
//                     <Box display="flex" alignItems="center" gap={1}>
//                       <CalendarTodayIcon color="action" fontSize="small" />
//                       <Box>
//                         <Typography variant="caption" color="text.secondary" display="block">
//                           Target Hire Date
//                         </Typography>
//                         <Typography variant="body2" fontWeight={500}>
//                           {targetDate ? format(targetDate, 'MMM dd, yyyy') : "Not set"}
//                         </Typography>
//                       </Box>
//                     </Box>
//                     {isExpired && (
//                       <Chip 
//                         label="Expired"
//                         size="small"
//                         color="error"
//                         variant="outlined"
//                         sx={{ borderRadius: 1 }}
//                       />
//                     )}
//                   </Box>

//                   <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
//                     <Typography variant="caption" color="text.secondary">
//                       Posted: {format(postedDate, 'MMM dd, yyyy')}
//                     </Typography>
//                     <Box display="flex" alignItems="center" gap={0.5}>
//                       {isArchived ? (
//                         <Chip 
//                           label="Archived" 
//                           size="small" 
//                           color="error" 
//                           sx={{ borderRadius: 1 }}
//                         />
//                       ) : (
//                         <>
//                           <CheckCircleIcon color="success" fontSize="small" />
//                           <Typography variant="caption" color="text.secondary">
//                             Active
//                           </Typography>
//                         </>
//                       )}
//                     </Box>
//                   </Box>

//                   <Box display="flex" justifyContent="flex-start" alignItems="center" mt={2}>
//                     <PersonIcon fontSize="small" />
//                     <Typography variant="body2" color="text.secondary" ml={1}>
//                       New Candidates
//                     </Typography>
//                   </Box>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default JobsPage;


//---------------


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
  Toolbar,
  AppBar
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
  FilterList as FilterListIcon
} from "@mui/icons-material";
import { parseISO, format } from "date-fns";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

// Dropdown options per filter
const filterOptions = {
  status: ["On Hold", "Closed Own", "Active", "Closed Lost"],
  businessUnit: ["Internal", "External"],
  department: ["Developer", "Tester", "QA", "UI/UX", "DevOps", "Support"],
  hiringManager: ["Aseem Gupta", "Himanshu Patel", "Preeti Kashyap"],
  recruiter: ["Himanshu Patel", "Preeti Kashyap", "Richa Kumari"],
  location: ["Mumbai", "Gurgaon", "Delhi", "Bengaluru", "Pune"],
};

// Filter fields config
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
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("card");
  const [showPriority, setShowPriority] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/jobs');
        setJobs(response.data.jobs);
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
    let result = jobs;
    
    // Apply priority filter if needed
    if (showPriority) {
      result = result.filter(job => job.jobFormId?.markPriority);
    }
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(job => 
        (job.jobTitle && job.jobTitle.toLowerCase().includes(term)) ||
        (job.jobFormId?.location && job.jobFormId.location.toLowerCase().includes(term)) ||
        (job.department && job.department.toLowerCase().includes(term))
      );
    }
    
    // Apply other filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter(job => {
          switch (key) {
            case 'status':
              const targetDate = job.jobFormId?.targetHireDate ? parseISO(job.jobFormId.targetHireDate) : null;
              const isExpired = targetDate && new Date() > targetDate;
              return value === 'Active' ? !isExpired : isExpired;
            case 'businessUnit':
              return job.businessUnit === value;
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
  }, [jobs, showPriority, searchTerm, filters]);

  const activeJobsCount = jobs.filter(job => {
    const targetDate = job.jobFormId?.targetHireDate ? parseISO(job.jobFormId.targetHireDate) : null;
    return !(targetDate && new Date() > targetDate);
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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 1 }}>
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
            Active Jobs ({activeJobsCount})
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Here you can find all the jobs of this organisation.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Switch
              checked={showPriority}
              onChange={(e) => setShowPriority(e.target.checked)}
              color="primary"
            />
            <Typography variant="body2">Priority Only</Typography>
          </Box>

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

          <Box sx={{ display: "flex", alignItems: "center" }}>
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
                height: '36px'
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
              <MenuItem onClick={handleMenuClose}>Archived</MenuItem>
            </Menu>
          </Box>
        </Box>
      </Paper>

      {/* Filters Section - All in one line */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
          {filtersConfig.map((filter) => (
            <FormControl key={filter.id} size="small" sx={{ minWidth: 180 }}>
              <InputLabel>{filter.label}</InputLabel>
              <Select
                value={filters[filter.id] || ""}
                onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                label={filter.label}
              >
                {filterOptions[filter.id]?.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
          <Box sx={{ flex: 1, display: 'flex', maxWidth: 400 }}>
            <InputBase
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search jobs..."
              sx={{
                p: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
              }}
              endAdornment={
                <IconButton size="small">
                  <FilterListIcon fontSize="small" />
                </IconButton>
              }
            />
          </Box>
        </Box>
      </Paper>

      {/* Job List Section */}
      {filteredJobs.length === 0 ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <Typography variant="h6">No jobs match your criteria</Typography>
        </Box>
      ) : view === "table" ? (
        <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 'none', border: '1px solid #eee' }}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Job Title</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Department</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Openings</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Hire Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Priority</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredJobs.map((job) => {
                const jobForm = job.jobFormId || {};
                const targetDate = jobForm.targetHireDate ? parseISO(jobForm.targetHireDate) : null;
                const isExpired = targetDate && new Date() > targetDate;

                return (
                  <TableRow 
                    key={job._id} 
                    hover 
                    onClick={() => navigate(`/jobs/${job._id}`)}
                    sx={{ 
                      cursor: 'pointer',
                      '&:nth-of-type(even)': { backgroundColor: '#fafafa' }
                    }}
                  >
                    <TableCell sx={{ fontWeight: 500 }}>{job.jobTitle}</TableCell>
                    <TableCell>{job.department}</TableCell>
                    <TableCell>{jobForm.location || "Remote"}</TableCell>
                    <TableCell align="center">{jobForm.openings || 0}</TableCell>
                    <TableCell>
                      {targetDate ? format(targetDate, 'MMM dd') : "-"}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={isExpired ? "Expired" : "Active"} 
                        size="small" 
                        color={isExpired ? "error" : "success"} 
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
            const isExpired = targetDate && new Date() > targetDate;
            const isArchived = isExpired;

            return (
              <Card 
                key={job._id}
                onClick={() => navigate(`/jobs/${job._id}`)}
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
                  },
                  ...(isArchived ? {
                    border: '1px solid #f44336',
                    opacity: 0.9,
                    backgroundColor: 'rgba(244, 67, 54, 0.05)'
                  } : {})
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="subtitle1" fontWeight="bold" noWrap>
                      {job.jobTitle}
                    </Typography>
                    {jobForm.markPriority && (
                      <StarIcon color="primary" fontSize="small" />
                    )}
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
                    {isExpired ? (
                      <Chip 
                        label="Expired"
                        size="small"
                        color="error"
                        variant="outlined"
                      />
                    ) : (
                      <Chip 
                        label="Active"
                        size="small"
                        color="success"
                        variant="outlined"
                      />
                    )}
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      )}
    </Container>
  );
};

export default JobsPage;