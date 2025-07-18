
// import React, { useState, useEffect } from "react";
// import {
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Button,
//     TextField,
//     MenuItem,
//     Select,
//     FormControl,
//     InputLabel,
//     Box,
//     Typography,
//     Card,
//     Tabs,
//     Tab,
//     Chip,
//     Divider,
//     Grid,
//     IconButton,
//     Collapse,
//     Snackbar,
//     Alert,
//     CircularProgress
// } from "@mui/material";
// import {
//     Add as AddIcon,
//     FormatBold as FormatBoldIcon,
//     FormatItalic as FormatItalicIcon,
//     FormatUnderlined as FormatUnderlinedIcon,
//     ExpandMore as ExpandMoreIcon,
//     ExpandLess as ExpandLessIcon,
//     Visibility as PreviewIcon,
//     LocationOn as LocationIcon,
//     MeetingRoom as BuildingIcon,
//     Layers as FloorIcon
// } from "@mui/icons-material";
// import axios from "axios";

// const API_BASE = "https://hire-onboardbackend-key.up.railway.app/api";

// const EmailTemplateTab = ({
//     candidate,
//     user,
//     showPreview,
//     setShowPreview,
//     subject,
//     setSubject,
//     body,
//     setBody,
//     templates,
//     date,
//     startTime,
//     duration,
//     timezone,
//     location,
//     selectedTemplate,
//     setSelectedTemplate
// }) => {
//     const handleTemplateChange = (e) => {
//         const templateId = e.target.value;
//         const selected = templates.find(t => t._id === templateId);
//         if (selected) {
//             setSelectedTemplate(templateId);
//             setSubject(selected.subject);

//             let formattedBody = selected.body
//                 .replace(/{candidate}/g, `${candidate.firstName} ${candidate.lastName}`)
//                 .replace(/{date}/g, date)
//                 .replace(/{time}/g, startTime)
//                 .replace(/{duration}/g, duration?.value || duration)
//                 .replace(/{timezone}/g, timezone?.value || timezone)
//                 .replace(/{location}/g, `${location.address}, ${location.building}, ${location.floor}`)
//                 .replace(/{interviewer}/g, user.name);

//             setBody(formattedBody);
//         }
//     };

//     const formatText = (format) => {
//         const formats = {
//             bold: '**',
//             italic: '*',
//             underline: '__'
//         };
//         setBody(prevBody => prevBody + formats[format]);
//     };

//     return (
//         <Box>
//             <FormControl fullWidth sx={{ mb: 3 }}>
//                 <InputLabel id="template-select-label">Select Template</InputLabel>
//                 <Select
//                     labelId="template-select-label"
//                     value={selectedTemplate}
//                     onChange={handleTemplateChange}
//                     label="Select Template"
//                     inputProps={{ name: 'template' }}
//                     required
//                 >
//                     <MenuItem value="">
//                         <em>Select a template</em>
//                     </MenuItem>
//                     {templates.map(template => (
//                         <MenuItem key={template._id} value={template._id}>{template.name}</MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>

//             <TextField
//                 fullWidth
//                 label="Subject"
//                 value={subject}
//                 onChange={(e) => setSubject(e.target.value)}
//                 sx={{ mb: 3 }}
//                 required
//                 name="subject"
//                 inputProps={{ 'aria-label': 'Email subject' }}
//             />

//             <Box sx={{ mb: 2 }}>
//                 <Typography variant="subtitle2" gutterBottom>Body</Typography>
//                 <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
//                     <IconButton
//                         size="small"
//                         onClick={() => formatText('bold')}
//                         aria-label="bold text"
//                     >
//                         <FormatBoldIcon fontSize="small" />
//                     </IconButton>
//                     <IconButton
//                         size="small"
//                         onClick={() => formatText('italic')}
//                         aria-label="italic text"
//                     >
//                         <FormatItalicIcon fontSize="small" />
//                     </IconButton>
//                     <IconButton
//                         size="small"
//                         onClick={() => formatText('underline')}
//                         aria-label="underline text"
//                     >
//                         <FormatUnderlinedIcon fontSize="small" />
//                     </IconButton>
//                 </Box>
//                 <TextField
//                     fullWidth
//                     multiline
//                     rows={6}
//                     value={body}
//                     onChange={(e) => setBody(e.target.value)}
//                     variant="outlined"
//                     required
//                     name="body"
//                     inputProps={{ 'aria-label': 'Email body' }}
//                 />
//             </Box>

//             {showPreview && (
//                 <Card sx={{ mt: 2, p: 2 }}>
//                     <Typography variant="h6">Preview</Typography>
//                     <Divider sx={{ my: 2 }} />
//                     <Typography variant="subtitle1">{subject}</Typography>
//                     <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mt: 2 }}>
//                         {body}
//                     </Typography>
//                 </Card>
//             )}
//         </Box>
//     );
// };

// const NotesTab = ({ notes, setNotes }) => {
//     return (
//         <Box>
//             <TextField
//                 fullWidth
//                 multiline
//                 rows={6}
//                 placeholder="Add notes for the interview panel..."
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//                 name="notes"
//                 inputProps={{ 'aria-label': 'Interview notes' }}
//             />
//         </Box>
//     );
// };

// const ScheduleOfflineInterviewForm = ({ open, onClose, candidate, user }) => {
//     const [interviewers, setInterviewers] = useState([]);
//     const [selectedInterviewers, setSelectedInterviewers] = useState([]);
//     const [date, setDate] = useState("");
//     const [startTime, setStartTime] = useState("");
//     const [duration, setDuration] = useState("");
//     const [timezone, setTimezone] = useState("");
//     const [location, setLocation] = useState({
//         address: "",
//         building: "",
//         floor: ""
//     });
//     const [rounds, setRounds] = useState([]);
//     const [selectedRound, setSelectedRound] = useState("");
//     const [tabValue, setTabValue] = useState(0);
//     const [showAddInterviewer, setShowAddInterviewer] = useState(false);
//     const [newInterviewer, setNewInterviewer] = useState({
//         name: "",
//         email: "",
//         phone: ""
//     });
//     const [showPreview, setShowPreview] = useState(false);
//     const [subject, setSubject] = useState(`In-Person Interview - ${candidate.firstName} ${candidate.lastName}`);
//     const [body, setBody] = useState("");
//     const [notes, setNotes] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [templates, setTemplates] = useState([]);
//     const [timezones, setTimezones] = useState([]);
//     const [durations, setDurations] = useState([]);
//     const [snackbar, setSnackbar] = useState({
//         open: false,
//         message: "",
//         severity: "success"
//     });
//     const [selectedTemplate, setSelectedTemplate] = useState("");

//     const fallbackTimezones = [
//         { value: "UTC+05:30", label: "UTC+05:30 (IST)" },
//         { value: "UTC+00:00", label: "UTC+00:00 (GMT)" },
//         { value: "UTC-05:00", label: "UTC-05:00 (EST)" }
//     ];

//     const fallbackDurations = [
//         { value: "30", label: "30 minutes" },
//         { value: "60", label: "1 hour" },
//         { value: "90", label: "1.5 hours" }
//     ];

//     const validateForm = () => {
//         return (
//             date &&
//             startTime &&
//             selectedInterviewers.length > 0 &&
//             subject &&
//             body &&
//             duration &&
//             timezone &&
//             location.address &&
//             location.building &&
//             location.floor &&
//             selectedRound
//         );
//     };

//     useEffect(() => {
//         if (open) {
//             const fetchData = async () => {
//                 try {
//                     setLoading(true);

//                     const fetchTimezones = async () => {
//                         try {
//                             const res = await axios.get(`${API_BASE}/interviews/timezones`);
//                             return res.data.map(tz => typeof tz === 'string' ? { value: tz, label: tz } : tz);
//                         } catch (error) {
//                             console.error("Error fetching timezones:", error);
//                             return fallbackTimezones;
//                         }
//                     };

//                     const fetchDurations = async () => {
//                         try {
//                             const res = await axios.get(`${API_BASE}/interviews/durations`);
//                             return res.data;
//                         } catch (error) {
//                             console.error("Error fetching durations:", error);
//                             return fallbackDurations;
//                         }
//                     };

//                     const fetchInterviewers = async () => {
//                         try {
//                             const res = await axios.get(`${API_BASE}/interviewers`);
//                             return res.data;
//                         } catch (error) {
//                             console.error("Error fetching interviewers:", error);
//                             return [];
//                         }
//                     };

//                     const fetchTemplates = async () => {
//                         try {
//                             const res = await axios.get(`${API_BASE}/email-templates`);
//                             return res.data;
//                         } catch (error) {
//                             console.error("Error fetching templates:", error);
//                             return [];
//                         }
//                     };

//                     const fetchRounds = async () => {
//                         try {
//                             const res = await axios.get(`${API_BASE}/offline-interviews/rounds`);
//                             // Transform the API response to match our expected format
//                             return res.data.map(round => ({
//                                 _id: round.value,
//                                 name: round.label
//                             }));
//                         } catch (error) {
//                             console.error("Error fetching rounds:", error);
//                             return [];
//                         }
//                     };

//                     const [
//                         timezonesData,
//                         durationsData,
//                         interviewersData,
//                         templatesData,
//                         roundsData
//                     ] = await Promise.all([
//                         fetchTimezones(),
//                         fetchDurations(),
//                         fetchInterviewers(),
//                         fetchTemplates(),
//                         fetchRounds()
//                     ]);

//                     setTimezones(timezonesData);
//                     setDurations(durationsData);
//                     setInterviewers(interviewersData);
//                     setTemplates(templatesData);
//                     setRounds(roundsData);

//                     setTimezone(timezonesData.find(tz => tz.value === "UTC+05:30") || timezonesData[0]);
//                     setDuration(durationsData[0]?.value || durationsData[0]);
//                     setDate(new Date().toISOString().split('T')[0]);

//                     if (roundsData.length > 0) {
//                         setSelectedRound(roundsData[0]._id);
//                     }

//                 } catch (error) {
//                     console.error("Error initializing form data:", error);
//                     setSnackbar({
//                         open: true,
//                         message: "Error initializing form data. Using fallback values.",
//                         severity: "warning"
//                     });
//                 } finally {
//                     setLoading(false);
//                 }
//             };

//             fetchData();
//         }
//     }, [open]);

//     const handleAddInterviewer = async () => {
//         if (!newInterviewer.name || !newInterviewer.email) {
//             setSnackbar({
//                 open: true,
//                 message: "Name and email are required",
//                 severity: "error"
//             });
//             return;
//         }

//         try {
//             setLoading(true);
//             const response = await axios.post(`${API_BASE}/interviewers`, newInterviewer);

//             setInterviewers([...interviewers, response.data]);
//             setSelectedInterviewers([...selectedInterviewers, response.data._id]);
//             setNewInterviewer({ name: "", email: "", phone: "" });
//             setShowAddInterviewer(false);

//             setSnackbar({
//                 open: true,
//                 message: "Interviewer added successfully!",
//                 severity: "success"
//             });
//         } catch (error) {
//             console.error("Error adding interviewer:", error);
//             setSnackbar({
//                 open: true,
//                 message: error.response?.data?.message || "Failed to add interviewer",
//                 severity: "error"
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!validateForm()) {
//             setSnackbar({
//                 open: true,
//                 message: "Please fill all required fields",
//                 severity: "error"
//             });

//             // Focus on the first missing field
//             if (!date) {
//                 document.querySelector('input[type="date"]')?.focus();
//             } else if (!startTime) {
//                 document.querySelector('input[type="time"]')?.focus();
//             } else if (selectedInterviewers.length === 0) {
//                 document.querySelector('#interviewer-label')?.focus();
//             } else if (!subject) {
//                 document.querySelector('input[name="subject"]')?.focus();
//             } else if (!body) {
//                 document.querySelector('textarea[name="body"]')?.focus();
//             } else if (!duration) {
//                 document.querySelector('#duration-label')?.focus();
//             } else if (!timezone) {
//                 document.querySelector('#timezone-label')?.focus();
//             } else if (!location.address) {
//                 document.querySelector('#address-input')?.focus();
//             } else if (!location.building) {
//                 document.querySelector('#building-input')?.focus();
//             } else if (!location.floor) {
//                 document.querySelector('#floor-input')?.focus();
//             } else if (!selectedRound) {
//                 document.querySelector('#round-label')?.focus();
//             }

//             return;
//         }

//         setLoading(true);

//         try {
//             // Prepare the request data according to API requirements
//             const requestData = {
//                 candidate: candidate._id,
//                 interviewers: selectedInterviewers,
//                 date,
//                 startTime,
//                 duration: duration?.value || duration,
//                 timezone: timezone?.value || timezone,
//                 location: {
//                     address: location.address,
//                     building: location.building,
//                     floor: location.floor
//                 },
//                 round: selectedRound,
//                 notes,
//                 emailDetails: {
//                     subject,
//                     body
//                 },
//                 scheduledBy: user.email
//             };

//             console.log("Submitting interview data:", JSON.stringify(requestData, null, 2));

//             const response = await axios.post(`${API_BASE}/offline-interviews`, requestData, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (response.data.success) {
//                 setSnackbar({
//                     open: true,
//                     message: response.data.message || "Interview scheduled successfully! Emails have been sent.",
//                     severity: "success"
//                 });

//                 setTimeout(() => {
//                     onClose();
//                     resetForm();
//                 }, 1000);
//             } else {
//                 throw new Error(response.data.message || "Failed to schedule interview");
//             }

//         } catch (error) {
//             console.error("Error scheduling interview:", error);
//             let errorMessage = "Failed to schedule interview";

//             if (error.response) {
//                 errorMessage = error.response.data?.message ||
//                     `Server responded with ${error.response.status}: ${JSON.stringify(error.response.data)}`;
//             } else if (error.request) {
//                 errorMessage = "No response received from server";
//             } else {
//                 errorMessage = error.message;
//             }

//             setSnackbar({
//                 open: true,
//                 message: errorMessage,
//                 severity: "error"
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     const resetForm = () => {
//         setSelectedInterviewers([]);
//         setDate(new Date().toISOString().split('T')[0]);
//         setStartTime("");
//         setDuration(durations[0]?.value || durations[0] || "");
//         setTimezone(timezones[0] || "");
//         setLocation({
//             address: "",
//             building: "",
//             floor: ""
//         });
//         setSelectedRound(rounds.length > 0 ? rounds[0]._id : "");
//         setSubject(`In-Person Interview - ${candidate.firstName} ${candidate.lastName}`);
//         setBody("");
//         setNotes("");
//         setTabValue(0);
//         setShowPreview(false);
//         setSelectedTemplate("");
//     };

//     const handleCloseSnackbar = () => {
//         setSnackbar({ ...snackbar, open: false });
//     };

//     if (loading && !open) {
//         return (
//             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//                 <CircularProgress />
//             </Box>
//         );
//     }

//     return (
//         <>
//             <Dialog
//                 open={open}
//                 onClose={onClose}
//                 maxWidth="md"
//                 fullWidth
//                 aria-labelledby="schedule-interview-dialog-title"
//             >
//                 <DialogTitle id="schedule-interview-dialog-title">
//                     Schedule In-Person Interview with {candidate.firstName} {candidate.lastName}
//                 </DialogTitle>
//                 <DialogContent>
//                     <Box component="form" onSubmit={handleSubmit} noValidate>
//                         <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Panel Members</Typography>
//                         <FormControl fullWidth sx={{ mb: 1 }} required>
//                             <InputLabel id="interviewer-label">Select Interviewers</InputLabel>
//                             <Select
//                                 labelId="interviewer-label"
//                                 label="Select Interviewers"
//                                 multiple
//                                 value={selectedInterviewers}
//                                 onChange={(e) => setSelectedInterviewers(e.target.value)}
//                                 renderValue={(selected) => (
//                                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                                         {selected.map((id) => {
//                                             const interviewer = interviewers.find(i => i._id === id);
//                                             return interviewer ? (
//                                                 <Chip
//                                                     key={id}
//                                                     label={interviewer.name}
//                                                     onDelete={() => setSelectedInterviewers(prev => prev.filter(i => i !== id))}
//                                                 />
//                                             ) : null;
//                                         })}
//                                     </Box>
//                                 )}
//                                 inputProps={{ name: 'interviewers' }}
//                                 disabled={loading}
//                             >
//                                 {interviewers.map((interviewer) => (
//                                     <MenuItem key={interviewer._id} value={interviewer._id}>
//                                         {interviewer.name} ({interviewer.email})
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>

//                         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
//                             <Button
//                                 startIcon={showAddInterviewer ? <ExpandLessIcon /> : <AddIcon />}
//                                 onClick={() => setShowAddInterviewer(!showAddInterviewer)}
//                                 size="small"
//                                 disabled={loading}
//                                 aria-label={showAddInterviewer ? 'Hide interviewer form' : 'Add interviewer'}
//                             >
//                                 {showAddInterviewer ? 'Hide Form' : 'Add Interviewer'}
//                             </Button>
//                         </Box>

//                         <Collapse in={showAddInterviewer}>
//                             <Grid container spacing={2} sx={{ mb: 3 }}>
//                                 <Grid item xs={12} sm={4}>
//                                     <TextField
//                                         fullWidth
//                                         label="Name"
//                                         value={newInterviewer.name}
//                                         onChange={(e) => setNewInterviewer({ ...newInterviewer, name: e.target.value })}
//                                         required
//                                         disabled={loading}
//                                         name="interviewer-name"
//                                         inputProps={{ 'aria-label': 'Interviewer name' }}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12} sm={4}>
//                                     <TextField
//                                         fullWidth
//                                         label="Email"
//                                         type="email"
//                                         value={newInterviewer.email}
//                                         onChange={(e) => setNewInterviewer({ ...newInterviewer, email: e.target.value })}
//                                         required
//                                         disabled={loading}
//                                         name="interviewer-email"
//                                         inputProps={{ 'aria-label': 'Interviewer email' }}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12} sm={3}>
//                                     <TextField
//                                         fullWidth
//                                         label="Phone"
//                                         value={newInterviewer.phone}
//                                         onChange={(e) => setNewInterviewer({ ...newInterviewer, phone: e.target.value })}
//                                         disabled={loading}
//                                         name="interviewer-phone"
//                                         inputProps={{ 'aria-label': 'Interviewer phone' }}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12} sm={1}>
//                                     <Button
//                                         variant="contained"
//                                         onClick={handleAddInterviewer}
//                                         sx={{ height: '100%' }}
//                                         disabled={loading || !newInterviewer.name || !newInterviewer.email}
//                                         aria-label="Add interviewer"
//                                     >
//                                         Add
//                                     </Button>
//                                 </Grid>
//                             </Grid>
//                         </Collapse>

//                         <Grid container spacing={3} sx={{ mb: 3 }}>
//                             <Grid item xs={12} md={6}>
//                                 <Typography variant="subtitle1" sx={{ mb: 1 }}>Interview Date</Typography>
//                                 <Box sx={{ display: 'flex', gap: 1 }}>
//                                     <Button
//                                         variant={date === new Date().toISOString().split('T')[0] ? "contained" : "outlined"}
//                                         onClick={() => setDate(new Date().toISOString().split('T')[0])}
//                                         size="small"
//                                         disabled={loading}
//                                         aria-label="Set interview date to today"
//                                     >
//                                         Today
//                                     </Button>
//                                     <Button
//                                         variant={date === new Date(Date.now() + 86400000).toISOString().split('T')[0] ? "contained" : "outlined"}
//                                         onClick={() => setDate(new Date(Date.now() + 86400000).toISOString().split('T')[0])}
//                                         size="small"
//                                         disabled={loading}
//                                         aria-label="Set interview date to tomorrow"
//                                     >
//                                         Tomorrow
//                                     </Button>
//                                     <TextField
//                                         type="date"
//                                         value={date}
//                                         onChange={(e) => setDate(e.target.value)}
//                                         InputLabelProps={{ shrink: true }}
//                                         sx={{ flexGrow: 1 }}
//                                         size="small"
//                                         required
//                                         disabled={loading}
//                                         name="date"
//                                         inputProps={{ 'aria-label': 'Interview date' }}
//                                     />
//                                 </Box>
//                             </Grid>
//                             <Grid item xs={12} md={6}>
//                                 <Typography variant="subtitle1" sx={{ mb: 1 }}>Time & Duration</Typography>
//                                 <Box sx={{ display: 'flex', gap: 1 }}>
//                                     <TextField
//                                         fullWidth
//                                         type="time"
//                                         label="Start Time"
//                                         value={startTime}
//                                         onChange={(e) => setStartTime(e.target.value)}
//                                         InputLabelProps={{ shrink: true }}
//                                         size="small"
//                                         required
//                                         disabled={loading}
//                                         name="start-time"
//                                         inputProps={{ 'aria-label': 'Interview start time' }}
//                                     />
//                                     <FormControl fullWidth size="small" required>
//                                         <InputLabel id="duration-label">Duration</InputLabel>
//                                         <Select
//                                             labelId="duration-label"
//                                             value={duration}
//                                             onChange={(e) => setDuration(e.target.value)}
//                                             label="Duration"
//                                             disabled={loading}
//                                             name="duration"
//                                             inputProps={{ 'aria-label': 'Interview duration' }}
//                                         >
//                                             {durations.map((option, index) => {
//                                                 const value = option.value || option;
//                                                 const label = option.label || `${value} minutes`;
//                                                 return (
//                                                     <MenuItem key={value || index} value={option}>
//                                                         {label}
//                                                     </MenuItem>
//                                                 );
//                                             })}
//                                         </Select>
//                                     </FormControl>
//                                     <FormControl fullWidth size="small" required>
//                                         <InputLabel id="timezone-label">Timezone</InputLabel>
//                                         <Select
//                                             labelId="timezone-label"
//                                             value={timezone}
//                                             onChange={(e) => setTimezone(e.target.value)}
//                                             label="Timezone"
//                                             disabled={loading}
//                                             name="timezone"
//                                             inputProps={{ 'aria-label': 'Interview timezone' }}
//                                         >
//                                             {timezones.map((tz, index) => (
//                                                 <MenuItem key={tz.value || tz || index} value={tz}>
//                                                     {tz.label || tz.value || tz}
//                                                 </MenuItem>
//                                             ))}
//                                         </Select>
//                                     </FormControl>
//                                 </Box>
//                             </Grid>
//                         </Grid>

//                         <Grid container spacing={3} sx={{ mb: 3 }}>
//                             <Grid item xs={12} sm={6}>
//                                 <Typography variant="subtitle1" sx={{ mb: 1 }}>Interview Round</Typography>
//                                 <FormControl fullWidth size="small" required>
//                                     <InputLabel id="round-label">Round</InputLabel>
//                                     <Select
//                                         labelId="round-label"
//                                         value={selectedRound}
//                                         onChange={(e) => setSelectedRound(e.target.value)}
//                                         label="Round"
//                                         disabled={loading}
//                                         name="round"
//                                         inputProps={{ 'aria-label': 'Interview round' }}
//                                     >
//                                         {rounds.map((round) => (
//                                             <MenuItem key={round._id} value={round._id}>
//                                                 {round.name}
//                                             </MenuItem>
//                                         ))}
//                                     </Select>
//                                 </FormControl>
//                             </Grid>
//                         </Grid>

//                         <Box sx={{ mb: 3 }}>
//                             <Typography variant="subtitle1" sx={{ mb: 1 }}>Location Details</Typography>
//                             <Grid container spacing={2}>
//                                 <Grid item xs={12} sm={6}>
//                                     <TextField
//                                         fullWidth
//                                         label="Address"
//                                         value={location.address}
//                                         onChange={(e) => setLocation({ ...location, address: e.target.value })}
//                                         size="small"
//                                         required
//                                         disabled={loading}
//                                         name="address"
//                                         id="address-input"
//                                         InputProps={{
//                                             startAdornment: <LocationIcon color="action" sx={{ mr: 1 }} />
//                                         }}
//                                         inputProps={{ 'aria-label': 'Interview address' }}
//                                         placeholder="Street address"
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12} sm={3}>
//                                     <TextField
//                                         fullWidth
//                                         label="Building"
//                                         value={location.building}
//                                         onChange={(e) => setLocation({ ...location, building: e.target.value })}
//                                         size="small"
//                                         required
//                                         disabled={loading}
//                                         name="building"
//                                         id="building-input"
//                                         InputProps={{
//                                             startAdornment: <BuildingIcon color="action" sx={{ mr: 1 }} />
//                                         }}
//                                         inputProps={{ 'aria-label': 'Interview building' }}
//                                         placeholder="Building name/number"
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12} sm={3}>
//                                     <TextField
//                                         fullWidth
//                                         label="Floor"
//                                         value={location.floor}
//                                         onChange={(e) => setLocation({ ...location, floor: e.target.value })}
//                                         size="small"
//                                         required
//                                         disabled={loading}
//                                         name="floor"
//                                         id="floor-input"
//                                         InputProps={{
//                                             startAdornment: <FloorIcon color="action" sx={{ mr: 1 }} />
//                                         }}
//                                         inputProps={{ 'aria-label': 'Interview floor' }}
//                                         placeholder="Floor number"
//                                     />
//                                 </Grid>
//                             </Grid>
//                         </Box>

//                         <Tabs
//                             value={tabValue}
//                             onChange={(e, newValue) => setTabValue(newValue)}
//                             sx={{ mb: 2 }}
//                             aria-label="Email and notes tabs"
//                         >
//                             <Tab label="Email Template" disabled={loading} />
//                             <Tab label="Notes for Interview Panel" disabled={loading} />
//                         </Tabs>
//                         <Box sx={{ pt: 1 }}>
//                             {tabValue === 0 && (
//                                 <EmailTemplateTab
//                                     candidate={candidate}
//                                     user={user}
//                                     showPreview={showPreview}
//                                     setShowPreview={setShowPreview}
//                                     subject={subject}
//                                     setSubject={setSubject}
//                                     body={body}
//                                     setBody={setBody}
//                                     templates={templates}
//                                     date={date}
//                                     startTime={startTime}
//                                     duration={duration}
//                                     timezone={timezone}
//                                     location={location}
//                                     selectedTemplate={selectedTemplate}
//                                     setSelectedTemplate={setSelectedTemplate}
//                                 />
//                             )}
//                             {tabValue === 1 && <NotesTab notes={notes} setNotes={setNotes} />}
//                         </Box>

//                         <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 3 }}>
//                             <Button
//                                 onClick={onClose}
//                                 variant="outlined"
//                                 disabled={loading}
//                                 aria-label="Cancel interview scheduling"
//                             >
//                                 Cancel
//                             </Button>
//                             <Button
//                                 variant="outlined"
//                                 startIcon={<PreviewIcon />}
//                                 onClick={() => setShowPreview(!showPreview)}
//                                 disabled={loading || tabValue !== 0}
//                                 aria-label="Preview interview email"
//                             >
//                                 Preview Email
//                             </Button>
//                             <Button
//                                 type="submit"
//                                 variant="contained"
//                                 color="primary"
//                                 disabled={loading}
//                                 aria-label="Schedule interview"
//                             >
//                                 {loading ? "Scheduling..." : "Schedule Interview"}
//                             </Button>
//                         </Box>
//                     </Box>
//                 </DialogContent>
//             </Dialog>

//             <Snackbar
//                 open={snackbar.open}
//                 autoHideDuration={6000}
//                 onClose={handleCloseSnackbar}
//                 anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//             >
//                 <Alert
//                     onClose={handleCloseSnackbar}
//                     severity={snackbar.severity}
//                     sx={{ width: '100%' }}
//                 >
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </>
//     );
// };

// export default ScheduleOfflineInterviewForm;

//-----for filter 

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Card, CardContent, Paper, Avatar, CircularProgress,
  Chip, Button, IconButton, Divider, useTheme, styled, Collapse,
  List, ListItem, ListItemIcon, ListItemText, Tooltip, Badge,
  TextField, MenuItem, InputAdornment, Grid
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  People as PeopleIcon,
  LocationOn as LocationIcon,
  Email as EmailIcon,
  MoreVert as MoreIcon,
  Notes as NotesIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  EventNote as EventNoteIcon,
  Work as WorkIcon,
  Refresh as RefreshIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const InterviewCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  transition: 'all 0.3s ease',
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[6],
    borderColor: theme.palette.secondary.main
  }
}));

const StatusBadge = styled(Chip)(({ theme, status }) => ({
  fontWeight: 600,
  textTransform: 'capitalize',
  backgroundColor: status === 'scheduled'
    ? `${theme.palette.info.light}20`
    : status === 'completed'
      ? `${theme.palette.success.light}20`
      : `${theme.palette.warning.light}20`,
  color: status === 'scheduled'
    ? theme.palette.info.dark
    : status === 'completed'
      ? theme.palette.success.dark
      : theme.palette.warning.dark,
}));

const ScheduleOfflineInterviewForm = () => {
  const [interviews, setInterviews] = useState([]);
  const [filteredInterviews, setFilteredInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedInterview, setExpandedInterview] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  // Filter states
  const [filters, setFilters] = useState({
    date: null,
    candidateName: '',
    candidateEmail: '',
    interviewerName: '',
    interviewerEmail: '',
    location: ''
  });

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.get('https://hire-onboardbackend-key.up.railway.app/api/offline-interviews/get');
        setInterviews(response.data.data);
        setFilteredInterviews(response.data.data);
      } catch (err) {
        setError('Failed to fetch interviews. Please try again.');
        console.error('Error fetching interviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, interviews]);

  const applyFilters = () => {
    let filtered = [...interviews];

    if (filters.date) {
      const filterDate = new Date(filters.date).toISOString().split('T')[0];
      filtered = filtered.filter(interview => {
        const interviewDate = new Date(interview.date).toISOString().split('T')[0];
        return interviewDate === filterDate;
      });
    }

    if (filters.candidateName) {
      filtered = filtered.filter(interview =>
        interview.candidate.name.toLowerCase().includes(filters.candidateName.toLowerCase())
      );
    }

    if (filters.candidateEmail) {
      filtered = filtered.filter(interview =>
        interview.candidate.email.toLowerCase().includes(filters.candidateEmail.toLowerCase())
      );
    }

    if (filters.interviewerName) {
      filtered = filtered.filter(interview =>
        interview.interviewers.some(interviewer =>
          interviewer.name.toLowerCase().includes(filters.interviewerName.toLowerCase())
        )
      );
    }

    if (filters.interviewerEmail) {
      filtered = filtered.filter(interview =>
        interview.interviewers.some(interviewer =>
          interviewer.email.toLowerCase().includes(filters.interviewerEmail.toLowerCase())
        )
      );
    }

    if (filters.location) {
      filtered = filtered.filter(interview =>
        interview.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setFilteredInterviews(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFilters(prev => ({ ...prev, date }));
  };

  const clearFilters = () => {
    setFilters({
      date: null,
      candidateName: '',
      candidateEmail: '',
      interviewerName: '',
      interviewerEmail: '',
      location: ''
    });
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleExpandClick = (interviewId) => {
    setExpandedInterview(expandedInterview === interviewId ? null : interviewId);
  };

  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh'
      }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        textAlign: 'center',
        p: 3
      }}>
        <Typography variant="h6" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.location.reload()}
          startIcon={<RefreshIcon />}
          sx={{ borderRadius: 2, px: 4 }}
        >
          Refresh
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1200, margin: '0 auto' }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 4,
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Go back">
            <IconButton
              onClick={() => navigate(-1)}
              sx={{
                mr: 2,
                backgroundColor: theme.palette.action.hover,
                '&:hover': {
                  backgroundColor: theme.palette.action.selected
                }
              }}
            >
              <BackIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Offline Interviews
          </Typography>
        </Box>
      </Box>

      {/* Filters Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FilterIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Filters
          </Typography>
          <Button
            size="small"
            startIcon={<ClearIcon />}
            onClick={clearFilters}
            sx={{ ml: 'auto' }}
          >
            Clear All
          </Button>
        </Box>
        
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <DatePicker
                label="Interview Date"
                value={filters.date}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Candidate Name"
                name="candidateName"
                value={filters.candidateName}
                onChange={handleFilterChange}
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Candidate Email"
                name="candidateEmail"
                value={filters.candidateEmail}
                onChange={handleFilterChange}
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Interviewer Name"
                name="interviewerName"
                value={filters.interviewerName}
                onChange={handleFilterChange}
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PeopleIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Interviewer Email"
                name="interviewerEmail"
                value={filters.interviewerEmail}
                onChange={handleFilterChange}
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Location"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>
      </Paper>

      {filteredInterviews.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: 'center',
            borderRadius: 3,
            backgroundColor: theme.palette.background.paper,
            border: `1px dashed ${theme.palette.divider}`
          }}
        >
          <Box sx={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            backgroundColor: theme.palette.action.hover,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3
          }}>
            <CalendarIcon sx={{ fontSize: 48, color: theme.palette.text.secondary }} />
          </Box>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            No Interviews Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 500, margin: '0 auto' }}>
            {interviews.length === 0 
              ? "You haven't scheduled any offline interviews yet."
              : "No interviews match your current filters. Try adjusting your search criteria."}
          </Typography>
        </Paper>
      ) : (
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary' }}>
            Showing {filteredInterviews.length} of {interviews.length} interviews
          </Typography>
          
          {filteredInterviews.map((interview) => (
            <InterviewCard key={interview._id} elevation={2}>
              <CardContent>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: 2,
                  mb: 2
                }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {interview.candidate.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                      <EmailIcon fontSize="small" sx={{ mr: 1 }} />
                      {interview.candidate.email}
                    </Typography>
                    {interview.jobId && (
                      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <WorkIcon fontSize="small" sx={{ mr: 1 }} />
                        {interview.jobId.jobTitle || 'No job specified'}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <StatusBadge
                      status={interview.status}
                      label={interview.status}
                      size="medium"
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleExpandClick(interview._id)}
                      sx={{
                        transition: 'transform 0.3s',
                        transform: expandedInterview === interview._id ? 'rotate(180deg)' : 'none'
                      }}
                    >
                      {expandedInterview === interview._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 3,
                  mb: 2,
                  '& > div': {
                    display: 'flex',
                    alignItems: 'center'
                  }
                }}>
                  <Tooltip title="Interview Date">
                    <Box>
                      <CalendarIcon fontSize="small" sx={{ mr: 1, color: theme.palette.text.secondary }} />
                      <Typography variant="body2">
                        {formatDate(interview.date)}
                      </Typography>
                    </Box>
                  </Tooltip>
                  <Tooltip title="Start Time">
                    <Box>
                      <TimeIcon fontSize="small" sx={{ mr: 1, color: theme.palette.text.secondary }} />
                      <Typography variant="body2">
                        {formatTime(interview.startTime)} ({interview.timezone})
                      </Typography>
                    </Box>
                  </Tooltip>
                  <Tooltip title="Duration">
                    <Box>
                      <ScheduleIcon fontSize="small" sx={{ mr: 1, color: theme.palette.text.secondary }} />
                      <Typography variant="body2">
                        {interview.duration} minutes
                      </Typography>
                    </Box>
                  </Tooltip>
                  <Tooltip title="Location">
                    <Box>
                      <LocationIcon fontSize="small" sx={{ mr: 1, color: theme.palette.text.secondary }} />
                      <Typography variant="body2">
                        {interview.location}
                      </Typography>
                    </Box>
                  </Tooltip>
                </Box>

                <Collapse in={expandedInterview === interview._id} timeout="auto" unmountOnExit>
                  <Box sx={{ mt: 2, pl: 1, pr: 1 }}>
                    <Divider sx={{ mb: 2 }} />

                    {/* Job Details Section */}
                    {interview.jobId && (
                      <>
                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                          <WorkIcon sx={{ mr: 1 }} /> Job Details
                        </Typography>
                        <Box sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 1,
                          mb: 3,
                          p: 2,
                          borderRadius: 2,
                          backgroundColor: theme.palette.background.default
                        }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {interview.jobId.jobTitle || 'No job specified'}
                          </Typography>
                          {interview.jobId._id && (
                            <Button
                              size="small"
                              variant="text"
                              onClick={() => navigate(`/jobs/${interview.jobId._id}`)}
                              sx={{
                                alignSelf: 'flex-start',
                                textTransform: 'none',
                                color: theme.palette.primary.main
                              }}
                            >
                              View Job Details
                            </Button>
                          )}
                        </Box>
                      </>
                    )}

                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                      <PeopleIcon sx={{ mr: 1 }} /> Interviewers
                    </Typography>
                    <Box sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1,
                      mb: 3
                    }}>
                      {interview.interviewers.map((interviewer) => (
                        <Chip
                          key={interviewer._id}
                          avatar={<Avatar alt={interviewer.name} sx={{ width: 24, height: 24 }}>{interviewer.name.charAt(0)}</Avatar>}
                          label={interviewer.name}
                          variant="outlined"
                          size="medium"
                          sx={{
                            borderRadius: 1,
                            backgroundColor: theme.palette.action.hover
                          }}
                          onClick={() => console.log('View interviewer profile')}
                        />
                      ))}
                    </Box>

                    {interview.notes && (
                      <>
                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                          <NotesIcon sx={{ mr: 1 }} /> Notes
                        </Typography>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            mb: 3,
                            borderRadius: 2,
                            backgroundColor: theme.palette.background.default,
                            whiteSpace: 'pre-wrap'
                          }}
                        >
                          {interview.notes}
                        </Paper>
                      </>
                    )}

                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                      <EventNoteIcon sx={{ mr: 1 }} /> Email Details
                    </Typography>
                    <List dense sx={{ mb: 2 }}>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <DescriptionIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Subject"
                          secondary={interview.subject}
                          secondaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <DescriptionIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Email Body"
                          secondary={
                            <Box
                              component="div"
                              sx={{
                                maxHeight: 100,
                                overflow: 'auto',
                                whiteSpace: 'pre-wrap'
                              }}
                            >
                              {interview.emailBody}
                            </Box>
                          }
                          secondaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    </List>

                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mt: 2
                    }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                        <PersonIcon fontSize="small" sx={{ mr: 0.5 }} />
                        Scheduled by: {interview.scheduledBy}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<EmailIcon />}
                          onClick={() => console.log('Resend email')}
                          sx={{ borderRadius: 2 }}
                        >
                          Resend
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          endIcon={<MoreIcon />}
                          onClick={() => navigate(`/interviews/${interview._id}`)}
                          sx={{ borderRadius: 2 }}
                        >
                          Details
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Collapse>
              </CardContent>
            </InterviewCard>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ScheduleOfflineInterviewForm;