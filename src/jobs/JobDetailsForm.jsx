

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   TextField,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Button,
//   Typography,
//   IconButton,
//   InputAdornment,
//   Checkbox,
//   FormControlLabel,
//   Divider,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Chip,
//   Autocomplete
// } from "@mui/material";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import AddIcon from "@mui/icons-material/Add";
// import AddLocationIcon from "@mui/icons-material/AddLocation";
// import { fetchJobFormOptions } from "../utils/api";

// const JobDetailsForm = ({ onContinue, initialData = {} }) => {
//   // State initialization
//   const [allUsers, setAllUsers] = useState([]);
//   const [jobType, setJobType] = useState(initialData.jobType || "");
//   const [selectedLocations, setSelectedLocations] = useState(initialData.locations || []);
//   const [openings, setOpenings] = useState(initialData.openings || "");
//   const [targetHireDate, setTargetHireDate] = useState(initialData.targetHireDate || null);
//   const [currency, setCurrency] = useState(initialData.currency || "");
//   const [amount, setAmount] = useState(initialData.amount || "");
//   const [allowReapply, setAllowReapply] = useState(initialData.allowReapply || false);
//   const [reapplyDate, setReapplyDate] = useState(initialData.reapplyDate || null);
//   const [markPriority, setMarkPriority] = useState(initialData.markPriority || false);
//   const [BusinessUnit, setBusinessUnit] = useState(initialData.BusinessUnit || "");
//   const [Client, setClient] = useState(initialData.Client || "");
//   const [SalesPerson, setSalesPerson] = useState(initialData.SalesPerson || null);
//   const [recruitingPerson, setRecruitingPerson] = useState(initialData.recruitingPerson || "");
//   const [jobTypes, setJobTypes] = useState([]);
//   const [locations, setLocations] = useState([]);
//   const [currencies, setCurrencies] = useState([]);
//   const [newLocation, setNewLocation] = useState("");
//   const [openAddLocation, setOpenAddLocation] = useState(false);
//   const [openAddSalesPerson, setOpenAddSalesPerson] = useState(false);
//   const [openAddRecruiter, setOpenAddRecruiter] = useState(false);
//   const [newSalesPerson, setNewSalesPerson] = useState({
//     name: "",
//     email: "",
//     role: "SalesPerson"
//   });
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
//         setJobTypes(data.jobTypes || []);
//         setLocations(data.locations || []);
//         setCurrencies(data.currencies || []);
//       } catch (err) {
//         console.error("Failed to fetch job form options:", err);
//         setJobTypes([]);
//         setLocations([]);
//         setCurrencies([]);
//       }
//     };
//     loadOptions();
//   }, []);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const res = await fetch("https://hire-onboardbackend-key.up.railway.app/api/employees");
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
//         jobType,
//         locations: selectedLocations,
//         openings: Number(openings) || 0,
//         targetHireDate,
//         currency,
//         amount: Number(amount) || 0,
//         allowReapply,
//         reapplyDate: allowReapply ? Number(reapplyDate) || 0 : null,
//         markPriority,
//         hiringFlow: hiringFlowSteps,
//         BusinessUnit: BusinessUnit.toLowerCase(),
//         Client: BusinessUnit === "external" ? Client : undefined,
//         salesPerson: BusinessUnit === "external" ? SalesPerson : undefined,
//         recruitingPerson
//     };

//     onContinue(jobData, action);
// };

//   const handleAddLocation = () => {
//     if (newLocation.trim() && !locations.includes(newLocation.trim())) {
//       const updatedLocations = [...locations, newLocation.trim()];
//       setLocations(updatedLocations);
//       setSelectedLocations([...selectedLocations, newLocation.trim()]);
//       setNewLocation("");
//       setOpenAddLocation(false);
//     }
//   };

//   const handleAddSalesPerson = () => {
//     setOpenAddSalesPerson(true);
//   };

//   const handleCloseAddSalesPerson = () => {
//     setOpenAddSalesPerson(false);
//     setNewSalesPerson({ name: "", email: "", role: "SalesPerson" });
//   };

//   const handleNewSalesPersonChange = (e) => {
//     const { name, value } = e.target;
//     setNewSalesPerson(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSaveNewSalesPerson = async () => {
//     try {
//       const response = await fetch("https://hire-onboardbackend-key.up.railway.app/api/employees", {
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
//         role: createdUser.role
//       };

//       setAllUsers(prev => [...prev, newUserObj]);
//       setSalesPerson(newUserObj._id);
      
//       try {
//         await fetch("https://hire-onboardbackend-key.up.railway.app/api/send-welcome-email", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             email: newUserObj.email,
//             name: newUserObj.name,
//             role: newUserObj.role
//           }),
//         });
//       } catch (emailError) {
//         console.error("Error sending welcome email:", emailError);
//       }
      
//       handleCloseAddSalesPerson();
//     } catch (err) {
//       console.error("Error creating salesperson:", err);
//     }
//   };

//   const handleAddRecruiter = () => {
//     setOpenAddRecruiter(true);
//   };

//   const handleCloseAddRecruiter = () => {
//     setOpenAddRecruiter(false);
//     setNewRecruiter({ name: "", email: "", role: "HR/Recruiter" });
//   };

//   const handleNewRecruiterChange = (e) => {
//     const { name, value } = e.target;
//     setNewRecruiter(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSaveNewRecruiter = async () => {
//     try {
//       const response = await fetch("https://hire-onboardbackend-key.up.railway.app/api/employees", {
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
//         role: createdUser.role
//       };

//       setAllUsers(prev => [...prev, newUserObj]);
//       setRecruitingPerson(newUserObj.name);
//       handleCloseAddRecruiter();
//     } catch (err) {
//       console.error("Error creating recruiter:", err);
//     }
//   };

//   const getSalesPersonDisplay = (id) => {
//     if (!id) return "";
//     const person = allUsers.find(user => user._id === id);
//     return person ? person.name : "";
//   };

//   return (
//     <Paper elevation={4} sx={{ maxWidth: 1000, mx: "auto", p: 4, borderRadius: 3, marginTop: 2 }}>
//       <Typography variant="h5" fontWeight={600} gutterBottom align="left">Job Details</Typography>
//       <Divider sx={{ mb: 3 }} />

//       <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
//         <FormControl fullWidth>
//           <InputLabel>Business Unit</InputLabel>
//           <Select 
//             value={BusinessUnit} 
//             onChange={(e) => setBusinessUnit(e.target.value)} 
//             label="Business Unit" 
//             required
//           >
//             <MenuItem value="internal">Internal</MenuItem>
//             <MenuItem value="external">External</MenuItem>
//           </Select>
//         </FormControl>
//         {BusinessUnit === "external" && (
//           <TextField 
//             label="Client" 
//             value={Client} 
//             onChange={(e) => setClient(e.target.value)} 
//             fullWidth 
//             required 
//           />
//         )}
//       </Box>

//       <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
//         <FormControl fullWidth>
//           <InputLabel>Job Type</InputLabel>
//           <Select 
//             value={jobType} 
//             onChange={(e) => setJobType(e.target.value)} 
//             label="Job Type" 
//             required
//           >
//             {jobTypes.map((type) => (
//               <MenuItem key={type} value={type}>{type}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <FormControl fullWidth>
//           <Autocomplete
//             multiple
//             options={locations}
//             value={selectedLocations}
//             onChange={(event, newValue) => setSelectedLocations(newValue)}
//             renderTags={(value, getTagProps) =>
//               value.map((option, index) => (
//                 <Chip label={option} {...getTagProps({ index })} key={option} />
//               ))
//             }
//             renderInput={(params) => (
//               <TextField {...params} label="Locations" placeholder="Select locations" />
//             )}
//           />
//           <Button
//             startIcon={<AddLocationIcon />}
//             onClick={() => setOpenAddLocation(true)}
//             sx={{ mt: 1 }}
//           >
//             Add New Location
//           </Button>
//         </FormControl>
//       </Box>

//       <Typography variant="h6" fontWeight={500} gutterBottom align="left">Employment Details</Typography>
//       <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
//         <TextField
//           label="No. of Openings"
//           value={openings}
//           onChange={(e) => setOpenings(e.target.value)}
//           type="number"
//           fullWidth
//           required
//           inputProps={{ min: 1 }}
//         />
//         <DatePicker
//           selected={targetHireDate}
//           onChange={(date) => setTargetHireDate(date)}
//           customInput={
//             <TextField
//               label="Target Hire Date"
//               fullWidth
//               required
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
//           <Select 
//             value={currency} 
//             onChange={(e) => setCurrency(e.target.value)} 
//             label="Currency" 
//             required
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
//           required
//           inputProps={{ min: 0 }}
//         />
//       </Box>

//       <Typography variant="h6" fontWeight={500} gutterBottom align="left">Team Details</Typography>
//       <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
//       <FormControl fullWidth>
//     <Box sx={{ display: "flex", alignItems: "center" }}>
//         <InputLabel>Sales Person</InputLabel>
//         <Button startIcon={<AddIcon />} onClick={handleAddSalesPerson} sx={{ ml: "auto" }}>Add New</Button>
//     </Box>
//     <Select
//         value={SalesPerson || ''}
//         onChange={(e) => setSalesPerson(e.target.value || null)}
//         label="Sales Person"
//         required={BusinessUnit === "external"}
//         renderValue={(selected) => {
//             if (!selected) return <em>Select Sales Person</em>;
//             const person = allUsers.find(user => user._id === selected);
//             return person ? `${person.name} (${person.email})` : selected;
//         }}
//     >
//         <MenuItem value="" disabled>
//             <em>Select Sales Person</em>
//         </MenuItem>
//         {allUsers
//             .filter((user) => user.role === "SalesPerson")
//             .map((user) => (
//                 <MenuItem key={user._id} value={user._id}>
//                     {user.name} ({user.email})
//                 </MenuItem>
//             ))}
//     </Select>
// </FormControl>

//         <FormControl fullWidth>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <InputLabel>Recruiting Member</InputLabel>
//             <Button startIcon={<AddIcon />} onClick={handleAddRecruiter} sx={{ ml: "auto" }}>Add New</Button>
//           </Box>
//           <Select
//             value={recruitingPerson}
//             onChange={(e) => setRecruitingPerson(e.target.value)}
//             label="Recruiting Member"
//             required
//           >
//             {allUsers
//               .filter((user) => user.role === "HR/Recruiter")
//               .map((user) => (
//                 <MenuItem key={user._id} value={user.name}>
//                   {user.name}
//                 </MenuItem>
//               ))}
//           </Select>
//         </FormControl>
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
//           disabled={
//             !jobType || 
//             !selectedLocations.length || 
//             !openings || 
//             !targetHireDate || 
//             !BusinessUnit || 
//             (BusinessUnit === "external" && (!Client || !SalesPerson))
//           }
//         >
//           Continue
//         </Button>
//       </Box>

//       {/* Add Location Dialog */}
//       <Dialog open={openAddLocation} onClose={() => setOpenAddLocation(false)}>
//         <DialogTitle>Add New Location</DialogTitle>
//         <DialogContent sx={{ p: 3, minWidth: 400 }}>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="New Location"
//             fullWidth
//             value={newLocation}
//             onChange={(e) => setNewLocation(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenAddLocation(false)}>Cancel</Button>
//           <Button onClick={handleAddLocation} disabled={!newLocation.trim()}>Add</Button>
//         </DialogActions>
//       </Dialog>

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

import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Divider,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Autocomplete
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddIcon from "@mui/icons-material/Add";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchJobFormOptions } from "../utils/api";

const JobDetailsForm = ({ onContinue, initialData = {} }) => {
  // State initialization
  const [allUsers, setAllUsers] = useState([]);
  const [jobType, setJobType] = useState(initialData.jobType || "");
  const [selectedLocations, setSelectedLocations] = useState(initialData.locations || []);
  const [openings, setOpenings] = useState(initialData.openings || "");
  const [targetHireDate, setTargetHireDate] = useState(initialData.targetHireDate || null);
  const [currency, setCurrency] = useState(initialData.currency || "");
  const [amount, setAmount] = useState(initialData.amount || "");
  const [allowReapply, setAllowReapply] = useState(initialData.allowReapply || false);
  const [reapplyDate, setReapplyDate] = useState(initialData.reapplyDate || null);
  const [markPriority, setMarkPriority] = useState(initialData.markPriority || false);
  const [BusinessUnit, setBusinessUnit] = useState(initialData.BusinessUnit || "");
  const [Client, setClient] = useState(initialData.Client || "");
  const [SalesPerson, setSalesPerson] = useState(initialData.SalesPerson || null);
  const [recruitingPerson, setRecruitingPerson] = useState(initialData.recruitingPerson || "");
  const [jobTypes, setJobTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [newLocation, setNewLocation] = useState("");
  const [openAddLocation, setOpenAddLocation] = useState(false);
  const [openAddSalesPerson, setOpenAddSalesPerson] = useState(false);
  const [openAddRecruiter, setOpenAddRecruiter] = useState(false);
  const [newSalesPerson, setNewSalesPerson] = useState({
    name: "",
    email: "",
    role: "SalesPerson"
  });
  const [newRecruiter, setNewRecruiter] = useState({
    name: "",
    email: "",
    role: "HR/Recruiter"
  });
  const [clients, setClients] = useState([]);
  const [newClientName, setNewClientName] = useState("");
  const [openAddClient, setOpenAddClient] = useState(false);

  const hiringFlowSteps = initialData.hiringFlow || [
    "Technical Round",
    "Manager Interview",
    "HR Round"
  ];

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const data = await fetchJobFormOptions();
        setJobTypes(data.jobTypes || []);
        setLocations(data.locations || []);
        setCurrencies(data.currencies || []);
      } catch (err) {
        console.error("Failed to fetch job form options:", err);
        setJobTypes([]);
        setLocations([]);
        setCurrencies([]);
      }
    };
    loadOptions();
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch("https://hire-onboardbackend-key.up.railway.app/api/employees");
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

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch("https://hire-onboardbackend-key.up.railway.app/api/clients");
        const data = await res.json();
        if (data.success && Array.isArray(data.clients)) {
          setClients(data.clients);
        } else {
          console.error("Invalid response from /api/clients");
          setClients([]);
        }
      } catch (err) {
        console.error("Failed to fetch clients", err);
        setClients([]);
      }
    };
    fetchClients();
  }, []);

  const handleSubmit = (action) => {
    const jobData = {
        jobType,
        locations: selectedLocations,
        openings: Number(openings) || 0,
        targetHireDate,
        currency,
        amount: Number(amount) || 0,
        allowReapply,
        reapplyDate: allowReapply ? Number(reapplyDate) || 0 : null,
        markPriority,
        hiringFlow: hiringFlowSteps,
        BusinessUnit: BusinessUnit.toLowerCase(),
        Client: BusinessUnit === "external" ? Client : undefined,
        salesPerson: BusinessUnit === "external" ? SalesPerson : undefined,
        recruitingPerson
    };

    onContinue(jobData, action);
  };

  const handleAddLocation = () => {
    if (newLocation.trim() && !locations.includes(newLocation.trim())) {
      const updatedLocations = [...locations, newLocation.trim()];
      setLocations(updatedLocations);
      setSelectedLocations([...selectedLocations, newLocation.trim()]);
      setNewLocation("");
      setOpenAddLocation(false);
    }
  };

  const handleAddSalesPerson = () => {
    setOpenAddSalesPerson(true);
  };

  const handleCloseAddSalesPerson = () => {
    setOpenAddSalesPerson(false);
    setNewSalesPerson({ name: "", email: "", role: "SalesPerson" });
  };

  const handleNewSalesPersonChange = (e) => {
    const { name, value } = e.target;
    setNewSalesPerson(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveNewSalesPerson = async () => {
    try {
      const response = await fetch("https://hire-onboardbackend-key.up.railway.app/api/employees", {
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
        role: createdUser.role
      };

      setAllUsers(prev => [...prev, newUserObj]);
      setSalesPerson(newUserObj._id);
      
      try {
        await fetch("https://hire-onboardbackend-key.up.railway.app/api/send-welcome-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: newUserObj.email,
            name: newUserObj.name,
            role: newUserObj.role
          }),
        });
      } catch (emailError) {
        console.error("Error sending welcome email:", emailError);
      }
      
      handleCloseAddSalesPerson();
    } catch (err) {
      console.error("Error creating salesperson:", err);
    }
  };

  const handleAddRecruiter = () => {
    setOpenAddRecruiter(true);
  };

  const handleCloseAddRecruiter = () => {
    setOpenAddRecruiter(false);
    setNewRecruiter({ name: "", email: "", role: "HR/Recruiter" });
  };

  const handleNewRecruiterChange = (e) => {
    const { name, value } = e.target;
    setNewRecruiter(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveNewRecruiter = async () => {
    try {
      const response = await fetch("https://hire-onboardbackend-key.up.railway.app/api/employees", {
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
        role: createdUser.role
      };

      setAllUsers(prev => [...prev, newUserObj]);
      setRecruitingPerson(newUserObj.name);
      handleCloseAddRecruiter();
    } catch (err) {
      console.error("Error creating recruiter:", err);
    }
  };

  const handleAddClient = () => {
    setOpenAddClient(true);
  };

  const handleCloseAddClient = () => {
    setOpenAddClient(false);
    setNewClientName("");
  };

  const handleSaveNewClient = async () => {
    try {
      const response = await fetch("https://hire-onboardbackend-key.up.railway.app/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newClientName }),
      });

      if (!response.ok) throw new Error("Failed to create new client");

      const data = await response.json();
      if (data.success && data.client) {
        setClients(prev => [...prev, data.client]);
        setClient(data.client._id);
        handleCloseAddClient();
      }
    } catch (err) {
      console.error("Error creating client:", err);
    }
  };

  const handleDeleteClient = async (clientId) => {
    try {
      const response = await fetch(`https://hire-onboardbackend-key.up.railway.app/api/clients/${clientId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete client");

      setClients(prev => prev.filter(client => client._id !== clientId));
      if (Client === clientId) {
        setClient("");
      }
    } catch (err) {
      console.error("Error deleting client:", err);
    }
  };

  const getSalesPersonDisplay = (id) => {
    if (!id) return "";
    const person = allUsers.find(user => user._id === id);
    return person ? person.name : "";
  };

  return (
    <Paper elevation={4} sx={{ maxWidth: 1000, mx: "auto", p: 4, borderRadius: 3, marginTop: 2 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom align="left">Job Details</Typography>
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
          <FormControl fullWidth>
            <InputLabel>Client</InputLabel>
            <Select
              value={Client}
              onChange={(e) => setClient(e.target.value)}
              label="Client"
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleAddClient}>
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              }
            >
              {clients.map((client) => (
                <MenuItem key={client._id} value={client._id}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <span>{client.name}</span>
                    <IconButton 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClient(client._id);
                      }}
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </MenuItem>
              ))}
              <MenuItem onClick={handleAddClient} sx={{ justifyContent: "center" }}>
                <Button startIcon={<AddIcon />}>Add New Client</Button>
              </MenuItem>
            </Select>
          </FormControl>
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
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <Autocomplete
            multiple
            options={locations}
            value={selectedLocations}
            onChange={(event, newValue) => setSelectedLocations(newValue)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip label={option} {...getTagProps({ index })} key={option} />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} label="Locations" placeholder="Select locations" />
            )}
          />
          <Button
            startIcon={<AddLocationIcon />}
            onClick={() => setOpenAddLocation(true)}
            sx={{ mt: 1 }}
          >
            Add New Location
          </Button>
        </FormControl>
      </Box>

      <Typography variant="h6" fontWeight={500} gutterBottom align="left">Employment Details</Typography>
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

      <Typography variant="h6" fontWeight={500} gutterBottom align="left">Team Details</Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <FormControl fullWidth>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <InputLabel>Sales Person</InputLabel>
            <Button startIcon={<AddIcon />} onClick={handleAddSalesPerson} sx={{ ml: "auto" }}>Add New</Button>
          </Box>
          <Select
            value={SalesPerson || ''}
            onChange={(e) => setSalesPerson(e.target.value || null)}
            label="Sales Person"
            required={BusinessUnit === "external"}
            renderValue={(selected) => {
              if (!selected) return <em>Select Sales Person</em>;
              const person = allUsers.find(user => user._id === selected);
              return person ? `${person.name} (${person.email})` : selected;
            }}
          >
            <MenuItem value="" disabled>
              <em>Select Sales Person</em>
            </MenuItem>
            {allUsers
              .filter((user) => user.role === "SalesPerson")
              .map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.name} ({user.email})
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
          disabled={
            !jobType || 
            !selectedLocations.length || 
            !openings || 
            !targetHireDate || 
            !BusinessUnit || 
            (BusinessUnit === "external" && (!Client || !SalesPerson))
          }
        >
          Continue
        </Button>
      </Box>

      {/* Add Location Dialog */}
      <Dialog open={openAddLocation} onClose={() => setOpenAddLocation(false)}>
        <DialogTitle>Add New Location</DialogTitle>
        <DialogContent sx={{ p: 3, minWidth: 400 }}>
          <TextField
            autoFocus
            margin="dense"
            label="New Location"
            fullWidth
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddLocation(false)}>Cancel</Button>
          <Button onClick={handleAddLocation} disabled={!newLocation.trim()}>Add</Button>
        </DialogActions>
      </Dialog>

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

      {/* Add Client Dialog */}
      <Dialog open={openAddClient} onClose={handleCloseAddClient}>
        <DialogTitle>Add New Client</DialogTitle>
        <DialogContent sx={{ p: 3, minWidth: 400 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Client Name"
            fullWidth
            value={newClientName}
            onChange={(e) => setNewClientName(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddClient}>Cancel</Button>
          <Button onClick={handleSaveNewClient} variant="contained" disabled={!newClientName.trim()}>Save</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default JobDetailsForm;