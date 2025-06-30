
// import React, { useState, useEffect } from "react";
// import {
//   Box, TextField, Select, MenuItem, InputLabel, FormControl, Button,
//   Typography, IconButton, InputAdornment, Checkbox, FormControlLabel,
//   Card, CardContent, Divider, Paper, Dialog, DialogTitle, DialogContent,
//   DialogActions
// } from "@mui/material";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import AddIcon from "@mui/icons-material/Add";
// import { fetchJobFormOptions } from "../utils/api";

// const JobDetailsForm = ({ onContinue, initialData }) => {
//   const [allUsers, setAllUsers] = useState([]);
//   const [jobType, setJobType] = useState(initialData.jobType || "");
//   const [location, setLocation] = useState(initialData.location || "");
//   const [openings, setOpenings] = useState(initialData.openings || "");
//   const [targetHireDate, setTargetHireDate] = useState(initialData.targetHireDate || null);
//   const [currency, setCurrency] = useState(initialData.currency || "");
//   const [amount, setAmount] = useState(initialData.amount || "");
//   const [allowReapply, setAllowReapply] = useState(initialData.allowReapply || false);
//   const [reapplyDate, setReapplyDate] = useState(initialData.reapplyDate || null);
//   const [markPriority, setMarkPriority] = useState(initialData.markPriority || false);
//   const [BusinessUnit, setBusinessUnit] = useState(initialData.BusinessUnit || "");
//   const [Client, setClient] = useState(initialData.Client || "");
//   const [SalesPerson, setSalesPerson] = useState(initialData.SalesPerson?.name || "");
//   const [recruitingPerson, setRecruitingPerson] = useState(initialData.recruitingPerson || "");
//   const [jobTypes, setJobTypes] = useState([]);
//   const [locations, setLocations] = useState([]);
//   const [currencies, setCurrencies] = useState([]);

//   const [openAddSalesPerson, setOpenAddSalesPerson] = useState(false);
//   const [newSalesPerson, setNewSalesPerson] = useState({
//     name: "",
//     email: "",
//     role: "SalesPerson"
//   });

//   const [openAddRecruiter, setOpenAddRecruiter] = useState(false);
//   const [newRecruiter, setNewRecruiter] = useState({
//     name: "",
//     email: "",
//     role: "HR/Recruiter"
//   });

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

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const res = await fetch("http://localhost:8000/api/employees");
//         const data = await res.json();
//         if (Array.isArray(data)) {
//           setAllUsers(data);
//         } else {
//           console.error("Invalid response from /api/employees");
//           setAllUsers([]);
//         }
//       } catch (err) {
//         console.error("Failed to fetch employees", err);
//         setAllUsers([]);
//       }
//     };
//     fetchEmployees();
//   }, []);

//   const handleSubmit = (action) => {
//     const jobData = {
//       jobType,
//       location,
//       openings: Number(openings),
//       targetHireDate,
//       currency,
//       amount: Number(amount),
//       allowReapply,
//       reapplyDate: allowReapply ? Number(reapplyDate) : null,
//       markPriority,
//       hiringFlow: hiringFlowSteps,
//       BusinessUnit: BusinessUnit.toLowerCase(),
//       Client: BusinessUnit === "external" ? Client : undefined,
//       SalesPerson,
//       recruitingPerson
//     };

//     onContinue(jobData, action);
//   };

//   const handleAddSalesPerson = () => {
//     setNewSalesPerson({ name: "", email: "", role: "SalesPerson" });
//     setOpenAddSalesPerson(true);
//   };

//   const handleCloseAddSalesPerson = () => {
//     setOpenAddSalesPerson(false);
//     setNewSalesPerson({ name: "", email: "", role: "SalesPerson" });
//   };

//   const handleNewSalesPersonChange = (e) => {
//     const { name, value } = e.target;
//     setNewSalesPerson((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSaveNewSalesPerson = async () => {
//     try {
//       const response = await fetch("http://localhost:8000/api/employees", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newSalesPerson),
//       });

//       if (!response.ok) throw new Error("Failed to create new salesperson");

//       const createdUser = await response.json();
//       const newUserObj = {
//         _id: createdUser._id,
//         name: createdUser.name,
//         email: createdUser.email,
//       };

//       setAllUsers((prev) => [...prev, newUserObj]);
//       setSalesPerson(newUserObj._id);
//       handleCloseAddSalesPerson();
//     } catch (err) {
//       console.error("Error creating salesperson:", err);
//     }
//   };

//   const handleAddRecruiter = () => {
//     setNewRecruiter({ name: "", email: "", role: "HR/Recruiter" });
//     setOpenAddRecruiter(true);
//   };

//   const handleCloseAddRecruiter = () => {
//     setOpenAddRecruiter(false);
//     setNewRecruiter({ name: "", email: "", role: "HR/Recruiter" });
//   };

//   const handleNewRecruiterChange = (e) => {
//     const { name, value } = e.target;
//     setNewRecruiter((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSaveNewRecruiter = async () => {
//     try {
//       const response = await fetch("http://localhost:8000/api/employees", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newRecruiter),
//       });

//       if (!response.ok) throw new Error("Failed to create new recruiter");

//       const createdUser = await response.json();
//       const newUserObj = {
//         _id: createdUser._id,
//         name: createdUser.name,
//         email: createdUser.email,
//       };

//       setAllUsers((prev) => [...prev, newUserObj]);
//       setRecruitingPerson(newUserObj.name);
//       handleCloseAddRecruiter();
//     } catch (err) {
//       console.error("Error creating recruiter:", err);
//     }
//   };

//   return (
//     <Paper elevation={4} sx={{ maxWidth: 1000, mx: "auto", p: 4, borderRadius: 3, marginTop: 2 }}>
//       <Typography variant="h5" fontWeight={600} gutterBottom align="left">Job Details</Typography>
//       <Divider sx={{ mb: 3 }} />

//       <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
//         <FormControl fullWidth>
//           <InputLabel>Business Unit</InputLabel>
//           <Select value={BusinessUnit} onChange={(e) => setBusinessUnit(e.target.value)} label="Business Unit" required>
//             <MenuItem value="internal">Internal</MenuItem>
//             <MenuItem value="external">External</MenuItem>
//           </Select>
//         </FormControl>
//         {BusinessUnit === "external" && (
//           <TextField label="Client" value={Client} onChange={(e) => setClient(e.target.value)} fullWidth required />
//         )}
//       </Box>

//       <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
//         <FormControl fullWidth>
//           <InputLabel>Job Type</InputLabel>
//           <Select value={jobType} onChange={(e) => setJobType(e.target.value)} label="Job Type" required>
//             {jobTypes.map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
//           </Select>
//         </FormControl>

//         <FormControl fullWidth>
//           <InputLabel>Location</InputLabel>
//           <Select value={location} onChange={(e) => setLocation(e.target.value)} label="Location" required>
//             {locations.map((loc) => <MenuItem key={loc} value={loc}>{loc}</MenuItem>)}
//           </Select>
//         </FormControl>
//       </Box>

//       <Typography variant="h6" fontWeight={500} gutterBottom align="left">Employment Details</Typography>
//       <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
//         <TextField
//           label="No. of Openings"
//           value={openings}
//           onChange={(e) => setOpenings(e.target.value)}
//           type="number"
//           fullWidth required
//           inputProps={{ min: 1 }}
//         />
//         <DatePicker
//           selected={targetHireDate}
//           onChange={(date) => setTargetHireDate(date)}
//           customInput={
//             <TextField
//               label="Target Hire Date"
//               fullWidth required
//               value={targetHireDate ? new Date(targetHireDate).toLocaleDateString("en-CA") : ""}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton><CalendarTodayIcon /></IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//               readOnly
//             />
//           }
//         />
//       </Box>

//       <Typography variant="h6" fontWeight={500} gutterBottom align="left">Compensation Details</Typography>
//       <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
//         <FormControl fullWidth>
//           <InputLabel>Currency</InputLabel>
//           <Select value={currency} onChange={(e) => setCurrency(e.target.value)} label="Currency" required>
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
//           fullWidth required
//           inputProps={{ min: 0 }}
//         />
//       </Box>

//       <Typography variant="h6" fontWeight={500} gutterBottom align="left">Team Details</Typography>
//       <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
//       <FormControl fullWidth>
//   <Box sx={{ display: "flex", alignItems: "center" }}>
//     <InputLabel>Sales Person</InputLabel>
//     <Button startIcon={<AddIcon />} onClick={handleAddSalesPerson} sx={{ ml: "auto" }}>Add New</Button>
//   </Box>
//   <Select
//     value={SalesPerson}
//     onChange={(e) => setSalesPerson(e.target.value)}
//     label="Sales Person"
//     required
//   >
//     {allUsers
//       .filter((user) => user.role === "SalesPerson")
//       .map((user) => (
//         <MenuItem key={user._id} value={user._id}>
//           {user.name}
//         </MenuItem>
//       ))}
//   </Select>
// </FormControl>

// <FormControl fullWidth>
//   <Box sx={{ display: "flex", alignItems: "center" }}>
//     <InputLabel>Recruiting Member</InputLabel>
//     <Button startIcon={<AddIcon />} onClick={handleAddRecruiter} sx={{ ml: "auto" }}>Add New</Button>
//   </Box>
//   <Select
//     value={recruitingPerson}
//     onChange={(e) => setRecruitingPerson(e.target.value)}
//     label="Recruiting Member"
//     required
//   >
//     {allUsers
//       .filter((user) => user.role === "HR/Recruiter")
//       .map((user) => (
//         <MenuItem key={user._id} value={user.name}>
//           {user.name}
//         </MenuItem>
//       ))}
//   </Select>
// </FormControl>

//       </Box>

//       <Typography variant="h6" fontWeight={500} gutterBottom align="left">Additional Options</Typography>
//       <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3, alignItems: "flex-start" }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//           <FormControlLabel
//             control={<Checkbox checked={allowReapply} onChange={(e) => setAllowReapply(e.target.checked)} />}
//             label="Allow applicant to apply again after"
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
//           control={<Checkbox checked={markPriority} onChange={(e) => setMarkPriority(e.target.checked)} />}
//           label="Mark this job as priority"
//         />
//       </Box>

//       <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
//         <Button variant="outlined" onClick={() => handleSubmit("back")}>Back</Button>
//         <Button
//           variant="contained"
//           onClick={() => handleSubmit("continue")}
//           disabled={!jobType || !location || !openings || !targetHireDate || !SalesPerson || !BusinessUnit || (BusinessUnit === "external" && !Client)}
//         >
//           Continue
//         </Button>
//       </Box>

//       {/* Add Sales Person Dialog */}
//       <Dialog open={openAddSalesPerson} onClose={handleCloseAddSalesPerson}>
//         <DialogTitle>Add New Sales Person</DialogTitle>
//         <DialogContent sx={{ p: 3, minWidth: 400 }}>
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
//             <TextField label="Name" name="name" value={newSalesPerson.name} onChange={handleNewSalesPersonChange} fullWidth required />
//             <TextField label="Email" name="email" type="email" value={newSalesPerson.email} onChange={handleNewSalesPersonChange} fullWidth required />
//             <TextField label="Role" name="role" value={newSalesPerson.role} fullWidth disabled />
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseAddSalesPerson}>Cancel</Button>
//           <Button onClick={handleSaveNewSalesPerson} variant="contained" disabled={!newSalesPerson.name || !newSalesPerson.email}>Save</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Add Recruiter Dialog */}
//       <Dialog open={openAddRecruiter} onClose={handleCloseAddRecruiter}>
//         <DialogTitle>Add New Recruiter</DialogTitle>
//         <DialogContent sx={{ p: 3, minWidth: 400 }}>
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
//             <TextField label="Name" name="name" value={newRecruiter.name} onChange={handleNewRecruiterChange} fullWidth required />
//             <TextField label="Email" name="email" type="email" value={newRecruiter.email} onChange={handleNewRecruiterChange} fullWidth required />
//             <TextField label="Role" name="role" value={newRecruiter.role} fullWidth disabled />
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseAddRecruiter}>Cancel</Button>
//           <Button onClick={handleSaveNewRecruiter} variant="contained" disabled={!newRecruiter.name || !newRecruiter.email}>Save</Button>
//         </DialogActions>
//       </Dialog>
//     </Paper>
//   );
// };

// export default JobDetailsForm;

//------------


import React, { useState, useEffect } from "react";
import {
  Box, TextField, Select, MenuItem, InputLabel, FormControl, Button,
  Typography, IconButton, InputAdornment, Checkbox, FormControlLabel,
  Card, CardContent, Divider, Paper, Dialog, DialogTitle, DialogContent,
  DialogActions
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddIcon from "@mui/icons-material/Add";
import { fetchJobFormOptions } from "../utils/api";

const JobDetailsForm = ({ onContinue, initialData }) => {
  const [allUsers, setAllUsers] = useState([]);
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
  const [SalesPerson, setSalesPerson] = useState(initialData.SalesPerson?.name || "");
  const [recruitingPerson, setRecruitingPerson] = useState(initialData.recruitingPerson || "");
  const [jobTypes, setJobTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  const [openAddSalesPerson, setOpenAddSalesPerson] = useState(false);
  const [newSalesPerson, setNewSalesPerson] = useState({
    name: "",
    email: "",
    role: "SalesPerson"
  });

  const [openAddRecruiter, setOpenAddRecruiter] = useState(false);
  const [newRecruiter, setNewRecruiter] = useState({
    name: "",
    email: "",
    role: "HR/Recruiter"
  });

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

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/employees");
        const data = await res.json();
        if (Array.isArray(data)) {
          setAllUsers(data);
        } else {
          console.error("Invalid response from /api/employees");
          setAllUsers([]);
        }
      } catch (err) {
        console.error("Failed to fetch employees", err);
        setAllUsers([]);
      }
    };
    fetchEmployees();
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
      BusinessUnit: BusinessUnit.toLowerCase(),
      Client: BusinessUnit === "external" ? Client : undefined,
      SalesPerson,
      recruitingPerson
    };

    onContinue(jobData, action);
  };

  const handleAddSalesPerson = () => {
    setNewSalesPerson({ name: "", email: "", role: "SalesPerson" });
    setOpenAddSalesPerson(true);
  };

  const handleCloseAddSalesPerson = () => {
    setOpenAddSalesPerson(false);
    setNewSalesPerson({ name: "", email: "", role: "SalesPerson" });
  };

  const handleNewSalesPersonChange = (e) => {
    const { name, value } = e.target;
    setNewSalesPerson((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveNewSalesPerson = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSalesPerson),
      });

      if (!response.ok) throw new Error("Failed to create new salesperson");

      const createdUser = await response.json();
      const newUserObj = {
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
      };

      setAllUsers((prev) => [...prev, newUserObj]);
      setSalesPerson(newUserObj._id);
      handleCloseAddSalesPerson();
    } catch (err) {
      console.error("Error creating salesperson:", err);
    }
  };

  const handleAddRecruiter = () => {
    setNewRecruiter({ name: "", email: "", role: "HR/Recruiter" });
    setOpenAddRecruiter(true);
  };

  const handleCloseAddRecruiter = () => {
    setOpenAddRecruiter(false);
    setNewRecruiter({ name: "", email: "", role: "HR/Recruiter" });
  };

  const handleNewRecruiterChange = (e) => {
    const { name, value } = e.target;
    setNewRecruiter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveNewRecruiter = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecruiter),
      });

      if (!response.ok) throw new Error("Failed to create new recruiter");

      const createdUser = await response.json();
      const newUserObj = {
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
      };

      setAllUsers((prev) => [...prev, newUserObj]);
      setRecruitingPerson(newUserObj.name);
      handleCloseAddRecruiter();
    } catch (err) {
      console.error("Error creating recruiter:", err);
    }
  };

  return (
    <Paper elevation={4} sx={{ maxWidth: 1000, mx: "auto", p: 4, borderRadius: 3, marginTop: 2 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom align="left">Job Details</Typography>
      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Business Unit</InputLabel>
          <Select value={BusinessUnit} onChange={(e) => setBusinessUnit(e.target.value)} label="Business Unit" required>
            <MenuItem value="internal">Internal</MenuItem>
            <MenuItem value="external">External</MenuItem>
          </Select>
        </FormControl>
        {BusinessUnit === "external" && (
          <TextField label="Client" value={Client} onChange={(e) => setClient(e.target.value)} fullWidth required />
        )}
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Job Type</InputLabel>
          <Select value={jobType} onChange={(e) => setJobType(e.target.value)} label="Job Type" required>
            {jobTypes.map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Location</InputLabel>
          <Select value={location} onChange={(e) => setLocation(e.target.value)} label="Location" required>
            {locations.map((loc) => <MenuItem key={loc} value={loc}>{loc}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>

      <Typography variant="h6" fontWeight={500} gutterBottom align="left">Employment Details</Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="No. of Openings"
          value={openings}
          onChange={(e) => setOpenings(e.target.value)}
          type="number"
          fullWidth required
          inputProps={{ min: 1 }}
        />
        <DatePicker
          selected={targetHireDate}
          onChange={(date) => setTargetHireDate(date)}
          customInput={
            <TextField
              label="Target Hire Date"
              fullWidth required
              value={targetHireDate ? new Date(targetHireDate).toLocaleDateString("en-CA") : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton><CalendarTodayIcon /></IconButton>
                  </InputAdornment>
                ),
              }}
              readOnly
            />
          }
        />
      </Box>

      <Typography variant="h6" fontWeight={500} gutterBottom align="left">Compensation Details</Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Currency</InputLabel>
          <Select value={currency} onChange={(e) => setCurrency(e.target.value)} label="Currency" required>
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
          fullWidth required
          inputProps={{ min: 0 }}
        />
      </Box>

      <Typography variant="h6" fontWeight={500} gutterBottom align="left">Team Details</Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
      <FormControl fullWidth>
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <InputLabel>Sales Person</InputLabel>
    <Button startIcon={<AddIcon />} onClick={handleAddSalesPerson} sx={{ ml: "auto" }}>Add New</Button>
  </Box>
  <Select
    value={SalesPerson}
    onChange={(e) => setSalesPerson(e.target.value)}
    label="Sales Person"
    required
  >
    {allUsers
      .filter((user) => user.role === "SalesPerson")
      .map((user) => (
        <MenuItem key={user._id} value={user._id}>
          {user.name}
        </MenuItem>
      ))}
  </Select>
</FormControl>

<FormControl fullWidth>
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <InputLabel>Recruiting Member</InputLabel>
    <Button startIcon={<AddIcon />} onClick={handleAddRecruiter} sx={{ ml: "auto" }}>Add New</Button>
  </Box>
  <Select
    value={recruitingPerson}
    onChange={(e) => setRecruitingPerson(e.target.value)}
    label="Recruiting Member"
    required
  >
    {allUsers
      .filter((user) => user.role === "HR/Recruiter")
      .map((user) => (
        <MenuItem key={user._id} value={user.name}>
          {user.name}
        </MenuItem>
      ))}
  </Select>
</FormControl>

      </Box>

      <Typography variant="h6" fontWeight={500} gutterBottom align="left">Additional Options</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3, alignItems: "flex-start" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <FormControlLabel
            control={<Checkbox checked={allowReapply} onChange={(e) => setAllowReapply(e.target.checked)} />}
            label="Allow applicant to apply again after"
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
          control={<Checkbox checked={markPriority} onChange={(e) => setMarkPriority(e.target.checked)} />}
          label="Mark this job as priority"
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button variant="outlined" onClick={() => handleSubmit("back")}>Back</Button>
        <Button
          variant="contained"
          onClick={() => handleSubmit("continue")}
          disabled={!jobType || !location || !openings || !targetHireDate || !SalesPerson || !BusinessUnit || (BusinessUnit === "external" && !Client)}
        >
          Continue
        </Button>
      </Box>

      {/* Add Sales Person Dialog */}
      <Dialog open={openAddSalesPerson} onClose={handleCloseAddSalesPerson}>
        <DialogTitle>Add New Sales Person</DialogTitle>
        <DialogContent sx={{ p: 3, minWidth: 400 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField label="Name" name="name" value={newSalesPerson.name} onChange={handleNewSalesPersonChange} fullWidth required />
            <TextField label="Email" name="email" type="email" value={newSalesPerson.email} onChange={handleNewSalesPersonChange} fullWidth required />
            <TextField label="Role" name="role" value={newSalesPerson.role} fullWidth disabled />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddSalesPerson}>Cancel</Button>
          <Button onClick={handleSaveNewSalesPerson} variant="contained" disabled={!newSalesPerson.name || !newSalesPerson.email}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Add Recruiter Dialog */}
      <Dialog open={openAddRecruiter} onClose={handleCloseAddRecruiter}>
        <DialogTitle>Add New Recruiter</DialogTitle>
        <DialogContent sx={{ p: 3, minWidth: 400 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField label="Name" name="name" value={newRecruiter.name} onChange={handleNewRecruiterChange} fullWidth required />
            <TextField label="Email" name="email" type="email" value={newRecruiter.email} onChange={handleNewRecruiterChange} fullWidth required />
            <TextField label="Role" name="role" value={newRecruiter.role} fullWidth disabled />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddRecruiter}>Cancel</Button>
          <Button onClick={handleSaveNewRecruiter} variant="contained" disabled={!newRecruiter.name || !newRecruiter.email}>Save</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default JobDetailsForm;
