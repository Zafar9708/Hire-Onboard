

// import React, { useState, useEffect } from "react";
// import {
//   Box, TextField, Select, MenuItem, InputLabel, FormControl, Button,
//   Typography, IconButton, InputAdornment, Checkbox, FormControlLabel,
//   Card, CardContent, Divider, Paper
// } from "@mui/material";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import { fetchJobFormOptions } from "../utils/api";

// const JobDetailsForm = ({ onContinue, initialData }) => {
//   const [jobType, setJobType] = useState(initialData.jobType || "");
//   const [location, setLocation] = useState(initialData.location || "");
//   const [openings, setOpenings] = useState(initialData.openings || "");
//   const [targetHireDate, setTargetHireDate] = useState(initialData.targetHireDate || null);
//   const [currency, setCurrency] = useState(initialData.currency || "");
//   const [amount, setAmount] = useState(initialData.amount || "");
//   const [allowReapply, setAllowReapply] = useState(initialData.allowReapply || false);
//   const [reapplyDate, setReapplyDate] = useState(initialData.reapplyDate || null);
//   const [markPriority, setMarkPriority] = useState(initialData.markPriority || false);
//   const [jobTypes, setJobTypes] = useState([]);
//   const [locations, setLocations] = useState([]);
//   const [currencies, setCurrencies] = useState([]);

//   const hiringFlowSteps = initialData.hiringFlow || [
//     "Technical Round",
//     "Manager Interview",
//     "HR Round"
//   ];

//   useEffect(() => {
//     const loadOptions = async () => {
//       try {
//         const data = await fetchJobFormOptions();
//         setJobTypes(data.jobTypes);
//         setLocations(data.locations);
//         setCurrencies(data.currencies);
//       } catch (err) {
//         console.error("Failed to fetch job form options:", err);
//       }
//     };

//     loadOptions();
//   }, []);

//   const handleSubmit = (action) => {
//     const jobData = {
//       jobType,
//       location,
//       openings,
//       targetHireDate,
//       currency,
//       amount,
//       allowReapply,
//       reapplyDate,
//       markPriority,
//       hiringFlow: hiringFlowSteps,
//     };
    
//     onContinue(jobData, action);
//   };

//   return (
//     <Paper elevation={4} sx={{ maxWidth: 1000, mx: "auto", p: 4, borderRadius: 3, marginTop:2 }}>
//       <Typography variant="h5" fontWeight={600} gutterBottom align="left">
//         Job Details
//       </Typography>

//       <Divider sx={{ mb: 3 }} />

//       <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
//         <FormControl fullWidth>
//           <InputLabel>Job Type</InputLabel>
//           <Select
//             value={jobType}
//             onChange={(e) => setJobType(e.target.value)}
//             label="Job Type"
//           >
//             {jobTypes.map((type) => (
//               <MenuItem key={type} value={type}>
//                 {type}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <FormControl fullWidth>
//           <InputLabel>Location</InputLabel>
//           <Select
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             label="Location"
//           >
//             {locations.map((loc) => (
//               <MenuItem key={loc} value={loc}>
//                 {loc}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Box>

//       <Typography variant="h6" fontWeight={500} gutterBottom align="left">
//         Employment Details
//       </Typography>
//       <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
//         <TextField
//           label="No. of Openings"
//           value={openings}
//           onChange={(e) => setOpenings(e.target.value)}
//           type="number"
//           fullWidth
//         />

//         <DatePicker
//           selected={targetHireDate}
//           onChange={(date) => setTargetHireDate(date)}
//           customInput={
//             <TextField
//               label="Target Hire Date"
//               fullWidth
//               value={targetHireDate ? new Date(targetHireDate).toLocaleDateString("en-CA") : ""}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton>
//                       <CalendarTodayIcon />
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//               readOnly
//             />
//           }
//         />
//       </Box>

//       <Typography variant="h6" fontWeight={500} gutterBottom align="left">
//         Compensation Details
//       </Typography>
//       <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
//         <FormControl fullWidth>
//           <InputLabel>Currency</InputLabel>
//           <Select
//             value={currency}
//             onChange={(e) => setCurrency(e.target.value)}
//             label="Currency"
//           >
//             {currencies.map(({ code, symbol }) => (
//               <MenuItem key={code} value={code}>
//                 {code} ({symbol})
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <TextField
//           label={`Amount (${currency || ""})`}
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           type="number"
//           fullWidth
//         />
//       </Box>

//       <Typography variant="h6" fontWeight={500} gutterBottom align="left">
//         Hiring Flow
//       </Typography>
//       <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
//         {hiringFlowSteps.map((step) => (
//           <Card
//             key={step}
//             sx={{
//               width: 120,
//               height: 70,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               backgroundColor: "#f9f9f9",
//               border: "1px solid #ddd",
//               borderRadius: 2,
//               textAlign: "center",
//             }}
//           >
//             <CardContent sx={{ p: 1 }}>
//               <Typography variant="body2" fontWeight={500}>
//                 {step}
//               </Typography>
//             </CardContent>
//           </Card>
//         ))}
//       </Box>

//       <Typography variant="h6" fontWeight={500} gutterBottom align="left">
//         Additional Options
//       </Typography>
//       <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3, alignItems: "flex-start" }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={allowReapply}
//                 onChange={(e) => setAllowReapply(e.target.checked)}
//               />
//             }
//             label="Allow applicant to apply again after"
//             sx={{ m: 0 }}
//           />
//           {allowReapply && (
//             <TextField
//               placeholder="Days"
//               type="number"
//               value={reapplyDate || ""}
//               onChange={(e) => setReapplyDate(e.target.value)}
//               sx={{ width: 100 }}
//               inputProps={{ min: 1 }}
//             />
//           )}
//         </Box>
//         <FormControlLabel
//           control={
//             <Checkbox
//               checked={markPriority}
//               onChange={(e) => setMarkPriority(e.target.checked)}
//             />
//           }
//           label="Mark this job as priority"
//           sx={{ m: 0 }}
//         />
//       </Box>

//       <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
//         <Button variant="outlined" onClick={() => handleSubmit("back")}>
//           Back
//         </Button>

//         <Button
//           variant="contained"
//           onClick={() => handleSubmit("continue")}
//           disabled={!jobType || !location || !openings || !targetHireDate || !amount}
//         >
//           Continue
//         </Button>
//       </Box>
//     </Paper>
//   );
// };

// export default JobDetailsForm;


//-----------


import React, { useState, useEffect } from "react";
import {
  Box, TextField, Select, MenuItem, InputLabel, FormControl, Button,
  Typography, IconButton, InputAdornment, Checkbox, FormControlLabel,
  Card, CardContent, Divider, Paper
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { fetchJobFormOptions } from "../utils/api";

const JobDetailsForm = ({ onContinue, initialData }) => {
  const [jobType, setJobType] = useState(initialData.jobType || "");
  const [location, setLocation] = useState(initialData.location || "");
  const [openings, setOpenings] = useState(initialData.openings || "");
  const [targetHireDate, setTargetHireDate] = useState(initialData.targetHireDate || null);
  const [currency, setCurrency] = useState(initialData.currency || "");
  const [amount, setAmount] = useState(initialData.amount || "");
  const [allowReapply, setAllowReapply] = useState(initialData.allowReapply || false);
  const [reapplyDate, setReapplyDate] = useState(initialData.reapplyDate || null);
  const [markPriority, setMarkPriority] = useState(initialData.markPriority || false);
  const [BusinessUnit, setBusinessUnit] = useState(initialData.BusinessUnit || "");
  const [Client, setClient] = useState(initialData.Client || "");
  const [jobTypes, setJobTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  const hiringFlowSteps = initialData.hiringFlow || [
    "Technical Round",
    "Manager Interview",
    "HR Round"
  ];

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const data = await fetchJobFormOptions();
        setJobTypes(data.jobTypes);
        setLocations(data.locations);
        setCurrencies(data.currencies);
      } catch (err) {
        console.error("Failed to fetch job form options:", err);
      }
    };

    loadOptions();
  }, []);

  const handleSubmit = (action) => {
    const jobData = {
      jobType,
      location,
      openings: Number(openings),
      targetHireDate,
      currency,
      amount: Number(amount),
      allowReapply,
      reapplyDate: allowReapply ? Number(reapplyDate) : null,
      markPriority,
      hiringFlow: hiringFlowSteps,
      BusinessUnit: BusinessUnit.toLowerCase(), // Ensure lowercase to match backend
      Client: BusinessUnit === "external" ? Client : undefined
    };
    
    onContinue(jobData, action);
  };

  return (
    <Paper elevation={4} sx={{ maxWidth: 1000, mx: "auto", p: 4, borderRadius: 3, marginTop:2 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom align="left">
        Job Details
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Business Unit</InputLabel>
          <Select
            value={BusinessUnit}
            onChange={(e) => setBusinessUnit(e.target.value)}
            label="Business Unit"
            required
          >
            <MenuItem value="internal">Internal</MenuItem>
            <MenuItem value="external">External</MenuItem>
          </Select>
        </FormControl>

        {BusinessUnit === "external" && (
          <TextField
            label="Client"
            value={Client}
            onChange={(e) => setClient(e.target.value)}
            fullWidth
            required
          />
        )}
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Job Type</InputLabel>
          <Select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            label="Job Type"
            required
          >
            {jobTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Location</InputLabel>
          <Select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            label="Location"
            required
          >
            {locations.map((loc) => (
              <MenuItem key={loc} value={loc}>
                {loc}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Typography variant="h6" fontWeight={500} gutterBottom align="left">
        Employment Details
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="No. of Openings"
          value={openings}
          onChange={(e) => setOpenings(e.target.value)}
          type="number"
          fullWidth
          required
          inputProps={{ min: 1 }}
        />

        <DatePicker
          selected={targetHireDate}
          onChange={(date) => setTargetHireDate(date)}
          customInput={
            <TextField
              label="Target Hire Date"
              fullWidth
              required
              value={targetHireDate ? new Date(targetHireDate).toLocaleDateString("en-CA") : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <CalendarTodayIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              readOnly
            />
          }
        />
      </Box>

      <Typography variant="h6" fontWeight={500} gutterBottom align="left">
        Compensation Details
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Currency</InputLabel>
          <Select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            label="Currency"
            required
          >
            {currencies.map(({ code, symbol }) => (
              <MenuItem key={code} value={code}>
                {code} ({symbol})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label={`Amount (${currency || ""})`}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          fullWidth
          required
          inputProps={{ min: 0 }}
        />
      </Box>

      <Typography variant="h6" fontWeight={500} gutterBottom align="left">
        Hiring Flow
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
        {hiringFlowSteps.map((step) => (
          <Card
            key={step}
            sx={{
              width: 120,
              height: 70,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f9f9f9",
              border: "1px solid #ddd",
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <CardContent sx={{ p: 1 }}>
              <Typography variant="body2" fontWeight={500}>
                {step}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Typography variant="h6" fontWeight={500} gutterBottom align="left">
        Additional Options
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3, alignItems: "flex-start" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={allowReapply}
                onChange={(e) => setAllowReapply(e.target.checked)}
              />
            }
            label="Allow applicant to apply again after"
            sx={{ m: 0 }}
          />
          {allowReapply && (
            <TextField
              placeholder="Days"
              type="number"
              value={reapplyDate || ""}
              onChange={(e) => setReapplyDate(e.target.value)}
              sx={{ width: 100 }}
              inputProps={{ min: 1 }}
            />
          )}
        </Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={markPriority}
              onChange={(e) => setMarkPriority(e.target.checked)}
            />
          }
          label="Mark this job as priority"
          sx={{ m: 0 }}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button variant="outlined" onClick={() => handleSubmit("back")}>
          Back
        </Button>

        <Button
          variant="contained"
          onClick={() => handleSubmit("continue")}
          disabled={
            !jobType || 
            !location || 
            !openings || 
            !targetHireDate || 
            !currency || 
            !amount || 
            !BusinessUnit || 
            (BusinessUnit === "external" && !Client)
          }
        >
          Continue
        </Button>
      </Box>
    </Paper>
  );
};

export default JobDetailsForm;