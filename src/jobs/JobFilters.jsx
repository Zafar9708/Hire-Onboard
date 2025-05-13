// import React from "react";
// import {Grid,Paper,FormControl,InputLabel,Select,MenuItem,InputBase,IconButton,Box} from "@mui/material";
// import FilterListIcon from "@mui/icons-material/FilterList"; // Filter Icon

// const filters = [
//   { label: "Status", id: "status" },
//   { label: "Business Unit", id: "businessUnit" },
//   { label: "Department", id: "department" },
//   { label: "Hiring Manager", id: "hiringManager" },
//   { label: "Recruiter", id: "recruiter" },
//   { label: "Location", id: "location" },
// ];

// const JobFilters = () => {
//   return (
//     <Paper className="p-4 mb-6 mt-4 shadow-md">
//       {/* Filters Section */}
//       <Grid container spacing={2}>
//         {filters.map((filter) => (
//           <Grid item xs={12} sm={6} md={4} key={filter.id}>
//             <FormControl fullWidth size="small" sx={{ minWidth: 200 }}>
//               <InputLabel id={`${filter.id}-label`}>{filter.label}</InputLabel>
//               <Select
//                 labelId={`${filter.id}-label`}
//                 id={filter.id}
//                 defaultValue=""
//                 label={filter.label}
//               >
//                 <MenuItem value="">All</MenuItem>
//                 <MenuItem value="option1">Option 1</MenuItem>
//                 <MenuItem value="option2">Option 2</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Search Input Section */}
//       <Grid container spacing={2} className="mt-4">
//         <Grid item xs={12} className="relative">
//           {/* Search Input */}
//           <Box sx={{ display: "flex", width: "219%", position: "relative" }}>
//             <InputBase
//               fullWidth
//               placeholder="Search jobs by title, location,department etc."
//               sx={{
//                 padding: "8px 12px",
//                 border: "1px solid #ccc",
//                 borderRadius: "4px",
//                 fontSize: "14px",
//                 paddingRight: "400px", // Space for the filter icon inside the input
//                 flexGrow: 1, // Make the input take all remaining space
//               }}
//               className="border border-gray-300 rounded-md p-2 w-full"
//             />
//             {/* Filter Icon inside the Search Input */}
//             <IconButton
//               sx={{
//                 position: "absolute",
//                 right: "10px", // Align icon to the right of the search input
//                 top: "50%",
//                 transform: "translateY(-50%)", // Center the icon vertically
//                 padding: "8px",
//                 borderRadius: "50%",
//                 backgroundColor: "#f4f4f4",
//                 color: "#333",
//               }}
//             >
//               <FilterListIcon />
//             </IconButton>
//           </Box>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// };

// export default JobFilters;


//----------------------

import React, { useState } from "react";
import {
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputBase,
  IconButton,
  Box,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

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
const filters = [
  { label: "Status", id: "status" },
  { label: "Business Unit", id: "businessUnit" },
  { label: "Department", id: "department" },
  { label: "Hiring Manager", id: "hiringManager" },
  { label: "Recruiter", id: "recruiter" },
  { label: "Location", id: "location" },
];

const JobFilters = ({ onSearch, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValues, setFilterValues] = useState({});

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (filterId, value) => {
    const newFilters = {
      ...filterValues,
      [filterId]: value,
    };
    setFilterValues(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <Paper className="p-4 mb-6 mt-4 shadow-md">
      {/* Filters Section */}
      <Grid container spacing={2}>
        {filters.map((filter) => (
          <Grid item xs={12} sm={6} md={4} key={filter.id}>
            <FormControl fullWidth size="small" sx={{ minWidth: 200 }}>
              <InputLabel id={`${filter.id}-label`}>{filter.label}</InputLabel>
              <Select
                labelId={`${filter.id}-label`}
                id={filter.id}
                value={filterValues[filter.id] || ""}
                onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                label={filter.label}
              >
                {/* <MenuItem value=""></MenuItem> */}
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
      <Grid container spacing={2} className="mt-4">
        <Grid item xs={12} className="relative">
          <Box sx={{ display: "flex", width: "200%", position: "relative" }}>
            <InputBase
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search jobs by title, location, department etc."
              sx={{
                padding: "8px 12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "14px",
                paddingRight: "455px",
                flexGrow: 1,
              }}
            />
            <IconButton
              sx={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                padding: "8px",
                borderRadius: "50%",
                backgroundColor: "#f4f4f4",
                color: "#333",
              }}
            >
              <FilterListIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default JobFilters;
