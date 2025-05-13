// // components/JobCard.jsx
// import React from "react";
// import {Card,CardContent,Typography,Box,Grid,FormControl,InputLabel,MenuItem,Select, Paper} from "@mui/material";

// const JobCard = () => {
//   // Dummy job data
//   const jobs = [
//     {
//       title: "Frontend Developer",
//       location: "Bangalore, India",
//       department: "Engineering",
//       postedOn: "April 1, 2025",
//     },
//     {
//       title: "HR Specialist",
//       location: "Remote",
//       department: "Human Resources",
//       postedOn: "March 28, 2025",
//     },
//     {
//       title: "Product Manager",
//       location: "New York, USA",
//       department: "Product",
//       postedOn: "March 15, 2025",
//     },
//     {
//       title: "Backend Engineer",
//       location: "Berlin, Germany",
//       department: "Engineering",
//       postedOn: "April 5, 2025",
//     },
//   ];

//   // Dummy filters (dropdown labels only for now)
//   const filters = [
//     { label: "Status", id: "status" },
//     { label: "Business Unit", id: "businessUnit" },
//     { label: "Department", id: "department" },
//     { label: "Hiring Manager", id: "hiringManager" },
//     { label: "Recruiter", id: "recruiter" },
//     { label: "Location", id: "location" },
//   ];

//   return (
//     <>
//       {/* Heading */}
//       <Typography variant="h5" className="text-blue-900 font-bold mb-1">
//         Active Jobs ({jobs.length})
//       </Typography>

//       {/* Subtext */}
//       <Typography variant="body1" className="text-gray-600 mb-4">
//         Here you can find all the jobs of this organisation.
//       </Typography>

//       {/* Filters */}
//       {/* Filters */}
// <Paper className="p-4 mb-6 mt-4 shadow-md">
//   <Grid container spacing={2}>
//     {filters.map((filter) => (
//       <Grid item xs={12} sm={6} md={4} key={filter.id}>
//         <FormControl fullWidth size="small" sx={{ minWidth: 200 }}>
//           <InputLabel id={`${filter.id}-label`}>{filter.label}</InputLabel>
//           <Select
//             labelId={`${filter.id}-label`}
//             id={filter.id}
//             defaultValue=""
//             label={filter.label}
//           >
//             <MenuItem value="">All</MenuItem>
//             <MenuItem value="option1">Option 1</MenuItem>
//             <MenuItem value="option2">Option 2</MenuItem>
//           </Select>
//         </FormControl>
//       </Grid>
//     ))}
//   </Grid>
// </Paper>


//       {/* Job Cards */}
//       <Grid container spacing={2}>
//         {jobs.map((job, index) => (
//           <Grid item xs={12} md={6} lg={4} key={index}>
//             <Card className="shadow-md" sx={{ height: "100%" }}>
//               <CardContent>
//                 <Typography variant="h6" className="text-blue-800 font-bold">
//                   {job.title}
//                 </Typography>
//                 <Box className="text-gray-600 text-sm mt-1 space-y-1">
//                   <div>📍 Location: {job.location}</div>
//                   <div>🏢 Department: {job.department}</div>
//                   <div>📅 Posted on: {job.postedOn}</div>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </>
//   );
// };

// export default JobCard;

// components/JobCard.jsx
import React from "react";
import ActiveJobsHeader from "./ActiveJobsHeader";
import JobFilters from "./JobFilters";
import JobList from "./JobList";

const JobCard = () => {
  return (
    <>
    <h1>HI you are here</h1>
      <ActiveJobsHeader />
      <JobFilters />
      <JobList /> {/* jobs are handled internally here now */}
    </>
  );
};

export default JobCard;
