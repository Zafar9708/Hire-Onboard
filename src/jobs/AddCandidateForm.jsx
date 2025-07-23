
// import React, { useState, useRef, useEffect } from "react";
// import {
//     Box,
//     Card,
//     CardContent,
//     TextField,
//     MenuItem,
//     FormControl,
//     InputLabel,
//     Select,
//     Button,
//     IconButton,
//     Typography,
//     Grid,
//     CircularProgress,
// } from "@mui/material";
// import { CloudUpload as CloudUploadIcon, AttachFile as AttachFileIcon } from "@mui/icons-material";
// import { createCandidate, uploadResume, getAllStages } from "../utils/api";
// import { useParams } from "react-router-dom";

// const AddCandidateForm = ({ onClose, onSubmit }) => {
//     const { id } = useParams();
//     const [stages, setStages] = useState([]);
//     const [loadingStages, setLoadingStages] = useState(false);

//     const [formData, setFormData] = useState({
//         firstName: "",
//         middleName: "",
//         lastName: "",
//         email: "",
//         mobile: "",
//         stage: "",
//         source: "",
//         availableToJoin: "",
//         currentLocation: "",
//         preferredLocation: "",
//         gender: "",
//         dob: "",
//         owner: "",
//         skills: "",
//         experience: "",
//         education: "",
//         additionalDocuments: null,
//         resume: null,
//     });

//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const fileInputRef = useRef(null);
//     const docsInputRef = useRef(null);

//     useEffect(() => {
//         const fetchStages = async () => {
//             setLoadingStages(true);
//             try {
//                 const stagesData = await getAllStages();
//                 setStages(stagesData);
//             } catch (error) {
//                 console.error("Error fetching stages:", error);
//                 setError("Failed to load stages");
//             } finally {
//                 setLoadingStages(false);
//             }
//         };

//         fetchStages();
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({ ...prevData, [name]: value }));
//     };

//     const extractResumeData = async (file) => {
//         setIsLoading(true);
//         setError(null);
//         try {
//           const data = await uploadResume(file);
//           setFormData((prev) => ({
//             ...prev,
//             firstName: data.firstName || "",
//             middleName: data.middleName || "",
//             lastName: data.lastName || "",
//             email: data.email || "",
//             mobile: data.phone || "",
//             skills: Array.isArray(data.skills) ? data.skills.join(", ") : data.skills || "",
//             experience: data.experience || "",
//             education: data.education || "",
//             resume: file,
//           }));
//         } catch (err) {
//           console.error("Error parsing resume:", err);
//           setError(err.message || "Failed to parse resume. Please try again.");
//         } finally {
//           setIsLoading(false);
//         }
//       };
      
//       const handleResumeUpload = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//           if (file.size > 5 * 1024 * 1024) {
//             setError("File size should be less than 5MB");
//             return;
//           }
//           extractResumeData(file);
//         }
//       };

//     const handleDocsUpload = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setFormData((prev) => ({ ...prev, additionalDocuments: file }));
//         }
//     };

//     const handleSubmit = async () => {
//         setIsLoading(true);
//         setError(null);
//         try {
//             const formDataToSend = new FormData();

//             // Append all form fields
//             Object.entries(formData).forEach(([key, value]) => {
//                 if (key === "resume" || key === "additionalDocuments") return;
//                 formDataToSend.append(key, value);
//             });

//             if (formData.resume) {
//                 formDataToSend.append("resume", formData.resume);
//             }

//             if (formData.additionalDocuments) {
//                 formDataToSend.append("additionalDocuments", formData.additionalDocuments);
//             }
            
//             // Fixed the error by checking if id exists before using it
//             if (id) {
//                 formDataToSend.append("jobId", id);
//             }

//             onSubmit(formDataToSend);
//             onClose();
//         } catch (error) {
//             console.error("Error submitting candidate:", error);
//             setError("Failed to submit candidate. Please try again.");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleCancel = () => {
//         onClose();
//     };

//     return (
//         <Box sx={{ width: '100%', maxWidth: 600, mx: "auto", mt: 2, p: 0 }}>
//             <Card sx={{ width: '100%', p: 0, m: 0 }}>
//                 <CardContent sx={{ p: 3 }}>
//                     {/* Resume Upload Section */}
//                     <Box sx={{ textAlign: "center", mb: 3 }}>
//                         <input
//                             type="file"
//                             ref={fileInputRef}
//                             hidden
//                             accept=".pdf,.doc,.docx"
//                             onChange={handleResumeUpload}
//                         />
//                         <IconButton
//                             color="primary"
//                             onClick={() => fileInputRef.current.click()}
//                             disabled={isLoading}
//                         >
//                             {isLoading ? (
//                                 <CircularProgress size={40} />
//                             ) : (
//                                 <CloudUploadIcon sx={{ fontSize: 40 }} />
//                             )}
//                         </IconButton>
//                         <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                             Upload Resume (PDF, DOC, DOCX)
//                         </Typography>
//                         {formData.resume && (
//                             <Typography variant="body2" sx={{ mt: 1 }}>
//                                 {formData.resume.name}
//                             </Typography>
//                         )}
//                     </Box>
//                     <Typography variant="h6" sx={{ mb: 1 }}>
//                         Candidate Information
//                     </Typography>
//                     {/* Full width first name */}
//                     <TextField
//                         fullWidth
//                         label="First Name"
//                         name="firstName"
//                         value={formData.firstName}
//                         onChange={handleChange}
//                         sx={{
//                             height: 10, width: 545, mb: 4
//                         }}
//                         margin="normal"
//                         size="small"
//                     />
//                     {/* Middle and Last name in one row */}
//                     <Grid container spacing={2} sx={{ mt: 2, mb: 3 }}>
//                         <Grid item xs={6}>
//                             <TextField
//                                 fullWidth
//                                 label="Middle Name"
//                                 name="middleName"
//                                 value={formData.middleName}
//                                 onChange={handleChange}
//                                 sx={{
//                                     height: 40, width: 265,
//                                     '& .MuiSelect-select': {
//                                         paddingTop: '12px',
//                                         paddingBottom: '12px'
//                                     }
//                                 }}
//                                 size="small"
//                             />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField
//                                 fullWidth
//                                 label="Last Name"
//                                 name="lastName"
//                                 value={formData.lastName}
//                                 onChange={handleChange}
//                                 sx={{
//                                     height: 40, width: 265,
//                                     '& .MuiSelect-select': {
//                                         paddingTop: '12px',
//                                         paddingBottom: '12px'
//                                     }
//                                 }}
//                                 size="small"
//                             />
//                         </Grid>
//                     </Grid>
//                     {/* Email and Mobile in one row */}
//                     <Grid container spacing={2} sx={{ mt: 0 }}>
//                         <Grid item xs={6}>
//                             <TextField
//                                 fullWidth
//                                 label="Email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 sx={{
//                                     height: 40, width: 265,
//                                     '& .MuiSelect-select': {
//                                         paddingTop: '12px',
//                                         paddingBottom: '12px'
//                                     }
//                                 }}
//                                 size="small"
//                             />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField
//                                 fullWidth
//                                 label="Mobile"
//                                 name="mobile"
//                                 value={formData.mobile}
//                                 onChange={handleChange}
//                                 sx={{
//                                     height: 40, width: 265,
//                                     '& .MuiSelect-select': {
//                                         paddingTop: '12px',
//                                         paddingBottom: '12px'
//                                     }
//                                 }}
//                                 size="small"
//                             />
//                         </Grid>
//                     </Grid>
//                     {/* Stage and Source in one row */}
//                     <Grid container spacing={2} sx={{ mt: 0 }}>
//                         <Grid item xs={6}>
//                             <FormControl fullWidth margin="normal" size="small">
//                                 <InputLabel id="stage">Stage</InputLabel>
//                                 <Select
//                                     labelId="stage"
//                                     label="stage"
//                                     name="stage"
//                                     value={formData.stage}
//                                     onChange={handleChange}
//                                     sx={{
//                                         height: 40, width: 265,
//                                         '& .MuiSelect-select': {
//                                             paddingTop: '12px',
//                                             paddingBottom: '12px'
//                                         }
//                                     }}
//                                     disabled={loadingStages}
//                                 >
//                                     {loadingStages ? (
//                                         <MenuItem value="">
//                                             <CircularProgress size={24} />
//                                         </MenuItem>
//                                     ) : (
//                                         stages.map((stage) => (
//                                             <MenuItem key={stage._id} value={stage._id}>
//                                                 {stage.name}
//                                             </MenuItem>
//                                         ))
//                                     )}
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                         <Grid item xs={6}>
//                             <FormControl fullWidth margin="normal" size="small">
//                                 <InputLabel id="source">Source</InputLabel>
//                                 <Select
//                                     labelId="source"
//                                     label="source"
//                                     name="source"
//                                     value={formData.source}
//                                     onChange={handleChange}
//                                     sx={{
//                                         height: 40, width: 265,
//                                         '& .MuiSelect-select': {
//                                             paddingTop: '12px',
//                                             paddingBottom: '12px'
//                                         }
//                                     }}
//                                 >
//                                     <MenuItem value="LinkedIn">LinkedIn</MenuItem>
//                                     <MenuItem value="Naukari">Naukri</MenuItem>
//                                     <MenuItem value="Via Email">Via Email</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                     </Grid>
//                     {/* Available to join and Current location in one row */}
//                     <Grid container spacing={2} sx={{ mt: 0 }}>
//                         <Grid item xs={6}>
//                             <TextField
//                                 fullWidth
//                                 label="Available to Join (Days)"
//                                 name="availableToJoin"
//                                 type="number"
//                                 value={formData.availableToJoin}
//                                 onChange={handleChange}
//                                 sx={{
//                                     height: 40, width: 265,
//                                     '& .MuiSelect-select': {
//                                         paddingTop: '12px',
//                                         paddingBottom: '12px'
//                                     }
//                                 }}
//                                 margin="normal"
//                                 size="small"
//                             />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <FormControl fullWidth margin="normal" size="small">
//                                 <InputLabel id="location">Current Location</InputLabel>
//                                 <Select
//                                     labelId="location"
//                                     label="Current Location"
//                                     name="currentLocation"
//                                     value={formData.currentLocation}
//                                     onChange={handleChange}
//                                     sx={{
//                                         height: 40, width: 265,
//                                         '& .MuiSelect-select': {
//                                             paddingTop: '12px',
//                                             paddingBottom: '12px'
//                                         }
//                                     }}
//                                 >
//                                     <MenuItem value="Mumbai">Mumbai</MenuItem>
//                                     <MenuItem value="Gurgaon">Gurgaon</MenuItem>
//                                     <MenuItem value="Delhi">Delhi</MenuItem>
//                                     <MenuItem value="Bengaluru">Bengaluru</MenuItem>
//                                     <MenuItem value="Pune">Pune</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                     </Grid>
//                     {/* Preferred location and Gender in one row */}
//                     <Grid container spacing={2} sx={{ mt: 0 }}>
//                         <Grid item xs={6}>
//                             <FormControl fullWidth margin="normal" size="small">
//                                 <InputLabel id="location">Preferred Location</InputLabel>
//                                 <Select
//                                     labelId="location"
//                                     label="Preferred Location"
//                                     name="preferredLocation"
//                                     value={formData.preferredLocation}
//                                     onChange={handleChange}
//                                     sx={{
//                                         height: 40, width: 265,
//                                         '& .MuiSelect-select': {
//                                             paddingTop: '12px',
//                                             paddingBottom: '12px'
//                                         }
//                                     }}
//                                 >
//                                     <MenuItem value="Mumbai">Mumbai</MenuItem>
//                                     <MenuItem value="Gurgaon">Gurgaon</MenuItem>
//                                     <MenuItem value="Delhi">Delhi</MenuItem>
//                                     <MenuItem value="Bengaluru">Bengaluru</MenuItem>
//                                     <MenuItem value="Pune">Pune</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                         <Grid item xs={6}>
//                             <FormControl fullWidth margin="normal" size="small">
//                                 <InputLabel id="Gender">Gender</InputLabel>
//                                 <Select
//                                     labelId="Gender"
//                                     label="Gender"
//                                     name="gender"
//                                     value={formData.gender}
//                                     onChange={handleChange}
//                                     sx={{
//                                         height: 40, width: 265,
//                                         '& .MuiSelect-select': {
//                                             paddingTop: '12px',
//                                             paddingBottom: '12px'
//                                         }
//                                     }}
//                                 >
//                                     <MenuItem value="Male">Male</MenuItem>
//                                     <MenuItem value="Female">Female</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                     </Grid>
//                     {/* DOB and Owner in one row */}
//                     <Grid container spacing={2} sx={{ mt: 0 }}>
//                         <Grid item xs={6}>
//                             <TextField
//                                 fullWidth
//                                 label="Date of Birth"
//                                 name="dob"
//                                 type="date"
//                                 value={formData.dob}
//                                 onChange={handleChange}
//                                 sx={{
//                                     height: 40, width: 265,
//                                     '& .MuiSelect-select': {
//                                         paddingTop: '12px',
//                                         paddingBottom: '12px'
//                                     }
//                                 }}
//                                 InputLabelProps={{ shrink: true }}
//                                 margin="normal"
//                                 size="small"
//                             />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <FormControl fullWidth margin="normal" size="small">
//                                 <InputLabel id="owner">Candidate Owner</InputLabel>
//                                 <Select
//                                     labelId="owner"
//                                     label="Candidate Owner"
//                                     name="owner"
//                                     value={formData.owner}
//                                     onChange={handleChange}
//                                     sx={{
//                                         height: 40, width: 270,
//                                         '& .MuiSelect-select': {
//                                             paddingTop: '12px',
//                                             paddingBottom: '12px'
//                                         }
//                                     }}
//                                 >
//                                     <MenuItem value="Himanshu Patel">Himanshu Patel</MenuItem>
//                                     <MenuItem value="Preeti Kashyap">Preeti Kashyap</MenuItem>
//                                     <MenuItem value="Richa Kumari">Richa Kumari</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                     </Grid>
//                     {/* Skills (full width) */}
//                     <TextField
//                         fullWidth
//                         label="Skills"
//                         name="skills"
//                         value={formData.skills}
//                         onChange={handleChange}
//                         margin="normal"
//                         size="small"
//                     />
//                     {/* Experience and Education in one row */}
//                     <Grid container spacing={2} sx={{ mt: 0 }}>
//                         <Grid item xs={6}>
//                             <TextField
//                                 label="Experience"
//                                 name="experience"
//                                 value={formData.experience}
//                                 onChange={handleChange}
//                                 sx={{
//                                     height: 1, width: 268,
//                                     '& .MuiSelect-select': {
//                                         paddingTop: '12px',
//                                         paddingBottom: '12px'
//                                     }
//                                 }}
//                                 multiline
//                                 rows={3}
//                                 margin="normal"
//                                 size="small"
//                             />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField
//                                 label="Education"
//                                 name="education"
//                                 value={formData.education}
//                                 onChange={handleChange}
//                                 sx={{
//                                     height: 1, width: 268,
//                                     '& .MuiSelect-select': {
//                                         paddingTop: '12px',
//                                         paddingBottom: '12px'
//                                     }
//                                 }}
//                                 multiline
//                                 rows={3}
//                                 margin="normal"
//                                 size="small"
//                             />
//                         </Grid>
//                     </Grid>
//                     {/* Additional Documents */}
//                     <Grid item xs={12}>
//                         <input
//                             type="file"
//                             ref={docsInputRef}
//                             hidden
//                             accept=".pdf,.doc,.docx,.jpg,.png"
//                             onChange={handleDocsUpload}
//                             multiple
//                         />
//                         <Button
//                             variant="outlined"
//                             startIcon={<AttachFileIcon />}
//                             onClick={() => docsInputRef.current.click()}
//                             fullWidth
//                             size="large"
//                             sx={{
//                                 py: 1.5,
//                                 mt: 2,
//                                 borderWidth: 2,
//                                 '&:hover': { borderWidth: 2 }
//                             }}
//                         >
//                             Attach Additional Documents
//                         </Button>
//                         {formData.additionalDocuments && (
//                             <Typography variant="body2" sx={{ mt: 1 }}>
//                                 {formData.additionalDocuments.name}
//                             </Typography>
//                         )}
//                     </Grid>
//                     {/* Action Buttons */}
//                     <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end", gap: 2 }}>
//                         <Button onClick={handleCancel} variant="outlined" color="secondary" size="small">
//                             Cancel
//                         </Button>
//                         <Button onClick={handleSubmit} variant="contained" color="primary" size="small">
//                             Add Candidate
//                         </Button>
//                     </Box>
//                 </CardContent>
//             </Card>
//         </Box>
//     );
// };

// export default AddCandidateForm;

//---------------

import React, { useState, useRef, useEffect } from "react";
import {
    Box,
    Card,
    CardContent,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Button,
    IconButton,
    Typography,
    Grid,
    CircularProgress,
    Snackbar,
    Alert
} from "@mui/material";
import { CloudUpload as CloudUploadIcon, AttachFile as AttachFileIcon } from "@mui/icons-material";
import { createCandidate, uploadResume, getAllStages } from "../utils/api";
import { useParams } from "react-router-dom";

const AddCandidateForm = ({ onClose, onSubmit }) => {
    const { id: jobId } = useParams();
    const [stages, setStages] = useState([]);
    const [loadingStages, setLoadingStages] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        mobile: "",
        stage: "",
        source: "",
        availableToJoin: "",
        currentLocation: "",
        preferredLocation: "",
        gender: "",
        dob: "",
        owner: "",
        skills: "",
        experience: "",
        education: "",
        additionalDocuments: null,
        resume: null, // Will store resume ID
        resumeFile: null // Will store file object
    });

    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);
    const docsInputRef = useRef(null);

    useEffect(() => {
        const fetchStages = async () => {
            setLoadingStages(true);
            try {
                const stagesData = await getAllStages();
                setStages(stagesData);
            } catch (error) {
                setSnackbar({
                    open: true,
                    message: "Failed to load stages",
                    severity: "error"
                });
            } finally {
                setLoadingStages(false);
            }
        };
        fetchStages();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleResumeUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setSnackbar({
                open: true,
                message: "File size should be less than 5MB",
                severity: "error"
            });
            return;
        }

        setIsLoading(true);
        try {
            const response = await uploadResume(file, jobId);
            
            setFormData(prev => ({
                ...prev,
                firstName: response.firstName || prev.firstName,
                middleName: response.middleName || prev.middleName,
                lastName: response.lastName || prev.lastName,
                email: response.email || prev.email,
                mobile: response.phone || prev.mobile,
                skills: Array.isArray(response.skills) ? response.skills.join(", ") : response.skills || prev.skills,
                experience: response.experience || prev.experience,
                education: response.education || prev.education,
                resume: response._id, // Store the resume ID
                resumeFile: file
            }));

            setSnackbar({
                open: true,
                message: "Resume uploaded successfully",
                severity: "success"
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: error.response?.data?.message || "Failed to upload resume",
                severity: "error"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDocsUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, additionalDocuments: file }));
            setSnackbar({
                open: true,
                message: "Document attached successfully",
                severity: "success"
            });
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const formDataToSend = new FormData();

            // Append all form fields
            for (const [key, value] of Object.entries(formData)) {
                if (value === null || value === undefined) continue;
                
                if (key === "resumeFile") {
                    continue; // Skip - we already uploaded the file
                } else if (key === "additionalDocuments") {
                    if (value) formDataToSend.append(key, value);
                } else {
                    formDataToSend.append(key, value);
                }
            }

            // Ensure jobId is included
            if (jobId) {
                formDataToSend.append("jobId", jobId);
            }

            // Debug: Log form data before submission
            console.log("Submitting with resume ID:", formData.resume);
            for (let [key, value] of formDataToSend.entries()) {
                console.log(key, value);
            }

            const response = await onSubmit(formDataToSend);
            
            setSnackbar({
                open: true,
                message: "Candidate created successfully",
                severity: "success"
            });
            
            setTimeout(() => onClose(), 1500);
        } catch (error) {
            setSnackbar({
                open: true,
                message: error.response?.data?.message || "Failed to create candidate",
                severity: "error"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 600, mx: "auto", mt: 2, p: 0 }}>
            <Card sx={{ width: '100%', p: 0, m: 0 }}>
                <CardContent sx={{ p: 3 }}>
                    {/* Resume Upload Section */}
                    <Box sx={{ textAlign: "center", mb: 3 }}>
                        <input
                            type="file"
                            ref={fileInputRef}
                            hidden
                            accept=".pdf,.doc,.docx"
                            onChange={handleResumeUpload}
                        />
                        <IconButton
                            color="primary"
                            onClick={() => fileInputRef.current.click()}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <CircularProgress size={40} />
                            ) : (
                                <CloudUploadIcon sx={{ fontSize: 40 }} />
                            )}
                        </IconButton>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Upload Resume (PDF, DOC, DOCX)
                        </Typography>
                        {formData.resumeFile && (
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                {formData.resumeFile.name}
                            </Typography>
                        )}
                        {formData.resume && (
                            <Typography variant="caption" color="success.main">
                                Resume ID: {formData.resume}
                            </Typography>
                        )}
                    </Box>
                    
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        Candidate Information
                    </Typography>
                    
                    {/* Full width first name */}
                    <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        sx={{ height: 10, width: 545, mb: 4 }}
                        margin="normal"
                        size="small"
                        required
                    />
                    
                    {/* Middle and Last name in one row */}
                    <Grid container spacing={2} sx={{ mt: 2, mb: 3 }}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Middle Name"
                                name="middleName"
                                value={formData.middleName}
                                onChange={handleChange}
                                sx={{
                                    height: 40, width: 265,
                                    '& .MuiSelect-select': {
                                        paddingTop: '12px',
                                        paddingBottom: '12px'
                                    }
                                }}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                sx={{
                                    height: 40, width: 265,
                                    '& .MuiSelect-select': {
                                        paddingTop: '12px',
                                        paddingBottom: '12px'
                                    }
                                }}
                                size="small"
                                required
                            />
                        </Grid>
                    </Grid>
                    
                    {/* Email and Mobile in one row */}
                    <Grid container spacing={2} sx={{ mt: 0 }}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                sx={{
                                    height: 40, width: 265,
                                    '& .MuiSelect-select': {
                                        paddingTop: '12px',
                                        paddingBottom: '12px'
                                    }
                                }}
                                size="small"
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Mobile"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                sx={{
                                    height: 40, width: 265,
                                    '& .MuiSelect-select': {
                                        paddingTop: '12px',
                                        paddingBottom: '12px'
                                    }
                                }}
                                size="small"
                                required
                            />
                        </Grid>
                    </Grid>
                    
                    {/* Stage and Source in one row */}
                    <Grid container spacing={2} sx={{ mt: 0 }}>
                        <Grid item xs={6}>
                            <FormControl fullWidth margin="normal" size="small">
                                <InputLabel id="stage">Stage</InputLabel>
                                <Select
                                    labelId="stage"
                                    label="stage"
                                    name="stage"
                                    value={formData.stage}
                                    onChange={handleChange}
                                    sx={{
                                        height: 40, width: 265,
                                        '& .MuiSelect-select': {
                                            paddingTop: '12px',
                                            paddingBottom: '12px'
                                        }
                                    }}
                                    disabled={loadingStages}
                                    required
                                >
                                    {loadingStages ? (
                                        <MenuItem value="">
                                            <CircularProgress size={24} />
                                        </MenuItem>
                                    ) : (
                                        stages.map((stage) => (
                                            <MenuItem key={stage._id} value={stage._id}>
                                                {stage.name}
                                            </MenuItem>
                                        ))
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth margin="normal" size="small">
                                <InputLabel id="source">Source</InputLabel>
                                <Select
                                    labelId="source"
                                    label="source"
                                    name="source"
                                    value={formData.source}
                                    onChange={handleChange}
                                    sx={{
                                        height: 40, width: 265,
                                        '& .MuiSelect-select': {
                                            paddingTop: '12px',
                                            paddingBottom: '12px'
                                        }
                                    }}
                                    required
                                >
                                    <MenuItem value="LinkedIn">LinkedIn</MenuItem>
                                    <MenuItem value="Naukari">Naukri</MenuItem>
                                    <MenuItem value="Via Email">Via Email</MenuItem>
                                    <MenuItem value="Referral">Referral</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    
                    {/* Available to join and Current location in one row */}
                    <Grid container spacing={2} sx={{ mt: 0 }}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Available to Join (Days)"
                                name="availableToJoin"
                                type="number"
                                value={formData.availableToJoin}
                                onChange={handleChange}
                                sx={{
                                    height: 40, width: 265,
                                    '& .MuiSelect-select': {
                                        paddingTop: '12px',
                                        paddingBottom: '12px'
                                    }
                                }}
                                margin="normal"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth margin="normal" size="small">
                                <InputLabel id="location">Current Location</InputLabel>
                                <Select
                                    labelId="location"
                                    label="Current Location"
                                    name="currentLocation"
                                    value={formData.currentLocation}
                                    onChange={handleChange}
                                    sx={{
                                        height: 40, width: 265,
                                        '& .MuiSelect-select': {
                                            paddingTop: '12px',
                                            paddingBottom: '12px'
                                        }
                                    }}
                                >
                                    <MenuItem value="Mumbai">Mumbai</MenuItem>
                                    <MenuItem value="Gurgaon">Gurgaon</MenuItem>
                                    <MenuItem value="Delhi">Delhi</MenuItem>
                                    <MenuItem value="Bengaluru">Bengaluru</MenuItem>
                                    <MenuItem value="Pune">Pune</MenuItem>
                                    <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    
                    {/* Preferred location and Gender in one row */}
                    <Grid container spacing={2} sx={{ mt: 0 }}>
                        <Grid item xs={6}>
                            <FormControl fullWidth margin="normal" size="small">
                                <InputLabel id="location">Preferred Location</InputLabel>
                                <Select
                                    labelId="location"
                                    label="Preferred Location"
                                    name="preferredLocation"
                                    value={formData.preferredLocation}
                                    onChange={handleChange}
                                    sx={{
                                        height: 40, width: 265,
                                        '& .MuiSelect-select': {
                                            paddingTop: '12px',
                                            paddingBottom: '12px'
                                        }
                                    }}
                                >
                                    <MenuItem value="Mumbai">Mumbai</MenuItem>
                                    <MenuItem value="Gurgaon">Gurgaon</MenuItem>
                                    <MenuItem value="Delhi">Delhi</MenuItem>
                                    <MenuItem value="Bengaluru">Bengaluru</MenuItem>
                                    <MenuItem value="Pune">Pune</MenuItem>
                                    <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                                    <MenuItem value="Remote">Remote</MenuItem>
                                    <MenuItem value="Any">Any</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth margin="normal" size="small">
                                <InputLabel id="Gender">Gender</InputLabel>
                                <Select
                                    labelId="Gender"
                                    label="Gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    sx={{
                                        height: 40, width: 265,
                                        '& .MuiSelect-select': {
                                            paddingTop: '12px',
                                            paddingBottom: '12px'
                                        }
                                    }}
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                    <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    
                    {/* DOB and Owner in one row */}
                    <Grid container spacing={2} sx={{ mt: 0 }}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Date of Birth"
                                name="dob"
                                type="date"
                                value={formData.dob}
                                onChange={handleChange}
                                sx={{
                                    height: 40, width: 265,
                                    '& .MuiSelect-select': {
                                        paddingTop: '12px',
                                        paddingBottom: '12px'
                                    }
                                }}
                                InputLabelProps={{ shrink: true }}
                                margin="normal"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth margin="normal" size="small">
                                <InputLabel id="owner">Candidate Owner</InputLabel>
                                <Select
                                    labelId="owner"
                                    label="Candidate Owner"
                                    name="owner"
                                    value={formData.owner}
                                    onChange={handleChange}
                                    sx={{
                                        height: 40, width: 270,
                                        '& .MuiSelect-select': {
                                            paddingTop: '12px',
                                            paddingBottom: '12px'
                                        }
                                    }}
                                >
                                    <MenuItem value="Himanshu Patel">Himanshu Patel</MenuItem>
                                    <MenuItem value="Preeti Kashyap">Preeti Kashyap</MenuItem>
                                    <MenuItem value="Richa Kumari">Richa Kumari</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    
                    {/* Skills (full width) */}
                    <TextField
                        fullWidth
                        label="Skills"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        margin="normal"
                        size="small"
                        helperText="Separate multiple skills with commas"
                    />
                    
                    {/* Experience and Education in one row */}
                    <Grid container spacing={2} sx={{ mt: 0 }}>
                        <Grid item xs={6}>
                            <TextField
                                label="Experience"
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                                sx={{
                                    height: 1, width: 268,
                                    '& .MuiSelect-select': {
                                        paddingTop: '12px',
                                        paddingBottom: '12px'
                                    }
                                }}
                                multiline
                                rows={3}
                                margin="normal"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Education"
                                name="education"
                                value={formData.education}
                                onChange={handleChange}
                                sx={{
                                    height: 1, width: 268,
                                    '& .MuiSelect-select': {
                                        paddingTop: '12px',
                                        paddingBottom: '12px'
                                    }
                                }}
                                multiline
                                rows={3}
                                margin="normal"
                                size="small"
                            />
                        </Grid>
                    </Grid>
                    
                    {/* Additional Documents */}
                    <Grid item xs={12}>
                        <input
                            type="file"
                            ref={docsInputRef}
                            hidden
                            accept=".pdf,.doc,.docx,.jpg,.png"
                            onChange={handleDocsUpload}
                            multiple
                        />
                        <Button
                            variant="outlined"
                            startIcon={<AttachFileIcon />}
                            onClick={() => docsInputRef.current.click()}
                            fullWidth
                            size="large"
                            sx={{
                                py: 1.5,
                                mt: 2,
                                borderWidth: 2,
                                '&:hover': { borderWidth: 2 }
                            }}
                        >
                            Attach Additional Documents
                        </Button>
                        {formData.additionalDocuments && (
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                {formData.additionalDocuments.name}
                            </Typography>
                        )}
                    </Grid>
                    
                    {/* Action Buttons */}
                  <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end", gap: 2 }}>
                        <Button 
                            onClick={onClose} 
                            variant="outlined" 
                            color="secondary" 
                            size="small"
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={handleSubmit} 
                            variant="contained" 
                            color="primary" 
                            size="small"
                            disabled={isLoading || !formData.resume}
                        >
                            {isLoading ? <CircularProgress size={24} /> : "Add Candidate"}
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddCandidateForm;