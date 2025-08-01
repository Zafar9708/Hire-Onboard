



// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
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
//     Snackbar,
//     Alert,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Chip,
//     LinearProgress,
//     Divider,
//     Stack
// } from "@mui/material";
// import { CloudUpload as CloudUploadIcon, AttachFile as AttachFileIcon, Analytics } from "@mui/icons-material";
// import { createCandidate, uploadResume, getAllStages } from "../utils/api";
// import { useParams } from "react-router-dom";

// const AddCandidateForm = ({ onClose, onSubmit }) => {
//     const { id: jobId } = useParams();
//     const [stages, setStages] = useState([]);
//     const [loadingStages, setLoadingStages] = useState(false);
//     const [snackbar, setSnackbar] = useState({
//         open: false,
//         message: "",
//         severity: "success"
//     });
//     const [analysisData, setAnalysisData] = useState(null);
//     const [showAnalysisDialog, setShowAnalysisDialog] = useState(false);

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
//         resumeFile: null
//     });

//     const [isLoading, setIsLoading] = useState(false);
//     const fileInputRef = useRef(null);
//     const docsInputRef = useRef(null);

//     useEffect(() => {
//         const fetchStages = async () => {
//             setLoadingStages(true);
//             try {
//                 const stagesData = await getAllStages();
//                 setStages(stagesData);
//             } catch (error) {
//                 setSnackbar({
//                     open: true,
//                     message: "Failed to load stages",
//                     severity: "error"
//                 });
//             } finally {
//                 setLoadingStages(false);
//             }
//         };
//         fetchStages();
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleResumeUpload = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         if (file.size > 5 * 1024 * 1024) {
//             setSnackbar({
//                 open: true,
//                 message: "File size should be less than 5MB",
//                 severity: "error"
//             });
//             return;
//         }

//         setIsLoading(true);
//         try {
//             const response = await uploadResume(file, jobId);
            
//             setFormData(prev => ({
//                 ...prev,
//                 firstName: response.firstName || prev.firstName,
//                 middleName: response.middleName || prev.middleName,
//                 lastName: response.lastName || prev.lastName,
//                 email: response.email || prev.email,
//                 mobile: response.phone || prev.mobile,
//                 skills: Array.isArray(response.skills) ? response.skills.join(", ") : response.skills || prev.skills,
//                 experience: response.experience || prev.experience,
//                 education: response.education || prev.education,
//                 resume: response._id,
//                 resumeFile: file
//             }));

//             // Fetch the full analysis data
//             const analysisResponse = await axios.get(`https://hire-onboardbackend-production.up.railway.app/api/resumes/getResume/${response._id}`);
//             setAnalysisData(analysisResponse.data);

//             setSnackbar({
//                 open: true,
//                 message: "Resume uploaded successfully",
//                 severity: "success"
//             });
//         } catch (error) {
//             setSnackbar({
//                 open: true,
//                 message: error.response?.data?.message || "Resume Uploaded Successfully",
//             });
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleDocsUpload = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setFormData(prev => ({ ...prev, additionalDocuments: file }));
//             setSnackbar({
//                 open: true,
//                 message: "Document attached successfully",
//                 severity: "success"
//             });
//         }
//     };

//     const handleSubmit = async () => {
//         setIsLoading(true);
//         try {
//             const formDataToSend = new FormData();

//             for (const [key, value] of Object.entries(formData)) {
//                 if (value === null || value === undefined) continue;
                
//                 if (key === "resumeFile") {
//                     continue;
//                 } else if (key === "additionalDocuments") {
//                     if (value) formDataToSend.append(key, value);
//                 } else {
//                     formDataToSend.append(key, value);
//                 }
//             }

//             if (jobId) {
//                 formDataToSend.append("jobId", jobId);
//             }

//             const response = await onSubmit(formDataToSend);
            
//             setSnackbar({
//                 open: true,
//                 message: "Candidate created successfully",
//                 severity: "success"
//             });
            
//             setTimeout(() => onClose(), 1500);
//         } catch (error) {
//             setSnackbar({
//                 open: true,
//                 message: error.response?.data?.message || "Failed to create candidate",
//                 severity: "error"
//             });
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleCloseSnackbar = () => {
//         setSnackbar(prev => ({ ...prev, open: false }));
//     };

//     const handleShowAnalysis = () => {
//         setShowAnalysisDialog(true);
//     };

//     const handleCloseAnalysisDialog = () => {
//         setShowAnalysisDialog(false);
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
//                         {formData.resumeFile && (
//                             <Typography variant="body2" sx={{ mt: 1 }}>
//                                 {formData.resumeFile.name}
//                             </Typography>
//                         )}
//                     </Box>

//                     {/* Candidate Information Header with Analysis Button */}
//                     <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
//                         <Typography variant="h6">
//                             Candidate Information
//                         </Typography>
//                         {formData.resume && (
//                             <Button
//                                 variant="outlined"
//                                 startIcon={<Analytics />}
//                                 onClick={handleShowAnalysis}
//                                 size="small"
//                             >
//                                 View Analysis
//                             </Button>
//                         )}
//                     </Stack>

//                     {/* Form Fields */}
//                     <TextField
//                         fullWidth
//                         label="First Name"
//                         name="firstName"
//                         value={formData.firstName}
//                         onChange={handleChange}
//                         sx={{ height: 10, width: 545, mb: 4 }}
//                         margin="normal"
//                         size="small"
//                         required
//                     />

//                     {/* Rest of the form fields remain unchanged */}
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
//                                 required
//                             />
//                         </Grid>
//                     </Grid>

//                     <Grid container spacing={2} sx={{ mt: 0 }}>
//                         <Grid item xs={6}>
//                             <TextField
//                                 fullWidth
//                                 label="Email"
//                                 name="email"
//                                 type="email"
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
//                                 required
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
//                                 required
//                             />
//                         </Grid>
//                     </Grid>

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
//                                     required
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
//                                     required
//                                 >
//                                     <MenuItem value="LinkedIn">LinkedIn</MenuItem>
//                                     <MenuItem value="Naukari">Naukri</MenuItem>
//                                     <MenuItem value="Via Email">Via Email</MenuItem>
//                                     <MenuItem value="Referral">Referral</MenuItem>
//                                     <MenuItem value="Other">Other</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                     </Grid>

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
//                                     <MenuItem value="Hyderabad">Hyderabad</MenuItem>
//                                     <MenuItem value="Other">Other</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                     </Grid>

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
//                                     <MenuItem value="Hyderabad">Hyderabad</MenuItem>
//                                     <MenuItem value="Remote">Remote</MenuItem>
//                                     <MenuItem value="Any">Any</MenuItem>
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
//                                     <MenuItem value="Other">Other</MenuItem>
//                                     <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                     </Grid>

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

//                     <TextField
//                         fullWidth
//                         label="Skills"
//                         name="skills"
//                         value={formData.skills}
//                         onChange={handleChange}
//                         margin="normal"
//                         size="small"
//                         helperText="Separate multiple skills with commas"
//                     />

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

//                    <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end", gap: 2 }}>
//                         <Button 
//                             onClick={onClose} 
//                             variant="outlined" 
//                             color="secondary" 
//                             size="small"
//                             disabled={isLoading}
//                         >
//                             Cancel
//                         </Button>
//                         <Button 
//                             onClick={handleSubmit} 
//                             variant="contained" 
//                             color="primary" 
//                             size="small"
//                             disabled={isLoading || !formData.resume}
//                         >
//                             {isLoading ? <CircularProgress size={24} /> : "Add Candidate"}
//                         </Button>
//                     </Box>
//                 </CardContent>
//             </Card>

//             <Snackbar
//                 open={snackbar.open}
//                 autoHideDuration={6000}
//                 onClose={handleCloseSnackbar}
//                 anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//             >
//                 <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>

//             {/* Analysis Dialog - Corrected Display */}
//             <Dialog 
//                 open={showAnalysisDialog} 
//                 onClose={handleCloseAnalysisDialog} 
//                 maxWidth="md" 
//                 fullWidth
//             >
//                 <DialogTitle>Resume Analysis</DialogTitle>
//                 <DialogContent dividers>
//                     {analysisData && analysisData.resume && analysisData.resume.aiAnalysis && (
//                         <Box>
//                             {/* Overall Match Score */}
//                             <Typography variant="h6" gutterBottom>
//                                 Matching Score: {analysisData.resume.matchingScore || analysisData.resume.aiAnalysis.matchPercentage || 0}%
//                             </Typography>
                            
//                             {/* Recommendation */}
//                             {analysisData.resume.aiAnalysis.recommendation && (
//                                 <>
//                                     <Typography variant="subtitle1" gutterBottom>
//                                         Recommendation: {analysisData.resume.aiAnalysis.recommendation}
//                                     </Typography>
//                                     <Divider sx={{ my: 2 }} />
//                                 </>
//                             )}
                            
//                             {/* Matching Skills - Display as received from backend */}
//                             <Typography variant="subtitle1" gutterBottom>
//                                 Matching Skills:
//                             </Typography>
//                             {analysisData.resume.aiAnalysis.matchingSkills?.length > 0 ? (
//                                 <Box sx={{ mb: 3 }}>
//                                     {analysisData.resume.aiAnalysis.matchingSkills.map((skill, index) => (
//                                         <Box key={index} sx={{ mb: 1 }}>
//                                             <Typography variant="body2">
//                                                 {skill.skill} ({skill.confidence}% match)
//                                             </Typography>
//                                             <LinearProgress
//                                                 variant="determinate"
//                                                 value={skill.confidence} // Directly use the confidence value
//                                                 sx={{ height: 8, borderRadius: 4 }}
//                                             />
//                                         </Box>
//                                     ))}
//                                 </Box>
//                             ) : (
//                                 <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//                                     No matching skills identified
//                                 </Typography>
//                             )}
                            
//                             <Divider sx={{ my: 2 }} />
                            
//                             {/* Missing Skills */}
//                             <Typography variant="subtitle1" gutterBottom>
//                                 Missing Skills:
//                             </Typography>
//                             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
//                                 {analysisData.resume.aiAnalysis.missingSkills?.map((skill, index) => (
//                                     <Chip
//                                         key={index}
//                                         label={skill}
//                                         color="error"
//                                         variant="outlined"
//                                         sx={{ mb: 1 }}
//                                     />
//                                 ))}
//                             </Box>
                            
//                             {/* Education Match - only show if exists */}
//                             {analysisData.resume.aiAnalysis.educationMatch && (
//                                 <>
//                                     <Divider sx={{ my: 2 }} />
//                                     <Typography variant="subtitle1" gutterBottom>
//                                         Education Match:
//                                     </Typography>
//                                     <Typography variant="body2" paragraph>
//                                         {analysisData.resume.aiAnalysis.educationMatch}
//                                     </Typography>
//                                 </>
//                             )}
                            
//                             {/* Experience Match - only show if exists */}
//                             {analysisData.resume.aiAnalysis.experienceMatch && (
//                                 <>
//                                     <Divider sx={{ my: 2 }} />
//                                     <Typography variant="subtitle1" gutterBottom>
//                                         Experience Match:
//                                     </Typography>
//                                     <Typography variant="body2" paragraph>
//                                         {analysisData.resume.aiAnalysis.experienceMatch}
//                                     </Typography>
//                                 </>
//                             )}
                            
//                             <Divider sx={{ my: 2 }} />
                            
//                             {/* Analysis Summary */}
//                             <Typography variant="subtitle1" gutterBottom>
//                                 Analysis Summary:
//                             </Typography>
//                             <Typography variant="body2" paragraph sx={{ whiteSpace: 'pre-line' }}>
//                                 {analysisData.resume.aiAnalysis.analysis || "No analysis available"}
//                             </Typography>
//                         </Box>
//                     )}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseAnalysisDialog}>Close</Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default AddCandidateForm;





import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
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
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Chip,
    LinearProgress,
    Divider,
    Stack,
    Fade,
    Backdrop
} from "@mui/material";
import { CloudUpload as CloudUploadIcon, AttachFile as AttachFileIcon, Analytics } from "@mui/icons-material";
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
    const [analysisData, setAnalysisData] = useState(null);
    const [showAnalysisDialog, setShowAnalysisDialog] = useState(false);
    const [emailWarning, setEmailWarning] = useState(false);
    const [duplicateEmailError, setDuplicateEmailError] = useState(false);

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
        resume: null,
        resumeFile: null
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
        
        if (name === "email" && duplicateEmailError) {
            setDuplicateEmailError(false);
        }
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
        setEmailWarning(false);
        setDuplicateEmailError(false);

        try {
            const response = await uploadResume(file, jobId);
            
            if (response.error && response.duplicateEmail) {
                setDuplicateEmailError(true);
                setSnackbar({
                    open: true,
                    message: response.message || "This email already exists in our system",
                    severity: "error"
                });
                return;
            }

            if (!response.email) {
                setEmailWarning(true);
                setSnackbar({
                    open: true,
                    message: "No email found in resume. Please add manually.",
                    severity: "warning"
                });
            }

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
                resume: response._id,
                resumeFile: file
            }));

            const analysisResponse = await axios.get(`https://hire-onboardbackend-production.up.railway.app/api/resumes/getResume/${response._id}`);
            setAnalysisData(analysisResponse.data);

            setSnackbar({
                open: true,
                message: "Resume uploaded successfully",
                severity: "success"
            });
        } catch (error) {
            let errorMessage = "Failed to upload resume";
            if (error.response) {
                if (error.response.status === 409) {
                    errorMessage = error.response.data.message || "This email already exists in our system";
                    setDuplicateEmailError(true);
                } else {
                    errorMessage = error.response.data.message || errorMessage;
                }
            }
            
            setSnackbar({
                open: true,
                message: errorMessage,
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
        if (emailWarning && !formData.email) {
            setSnackbar({
                open: true,
                message: "Please enter candidate email address",
                severity: "error"
            });
            return;
        }

        setIsLoading(true);
        try {
            const formDataToSend = new FormData();

            for (const [key, value] of Object.entries(formData)) {
                if (value === null || value === undefined) continue;
                
                if (key === "resumeFile") {
                    continue;
                } else if (key === "additionalDocuments") {
                    if (value) formDataToSend.append(key, value);
                } else {
                    formDataToSend.append(key, value);
                }
            }

            if (jobId) {
                formDataToSend.append("jobId", jobId);
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

    const handleShowAnalysis = () => {
        setShowAnalysisDialog(true);
    };

    const handleCloseAnalysisDialog = () => {
        setShowAnalysisDialog(false);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 600, mx: "auto", mt: 2, p: 0, position: 'relative' }}>
            {/* Loading Overlay */}
            <Backdrop
                sx={{ 
                    color: '#fff', 
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    position: 'absolute',
                    borderRadius: '12px'
                }}
                open={isLoading}
            >
                <Fade in={isLoading}>
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        p: 4,
                        borderRadius: '12px',
                        boxShadow: 3
                    }}>
                        <CircularProgress 
                            size={60} 
                            thickness={4}
                            sx={{ 
                                color: '#3f51b5',
                                mb: 2
                            }} 
                        />
                        <Typography variant="h6" color="text.primary">
                            Adding Candidate...
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Please wait while we process your request
                        </Typography>
                    </Box>
                </Fade>
            </Backdrop>

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
                    </Box>

                    {/* Candidate Information Header with Analysis Button */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                        <Typography variant="h6">
                            Candidate Information
                        </Typography>
                        {formData.resume && (
                            <Button
                                variant="outlined"
                                startIcon={<Analytics />}
                                onClick={handleShowAnalysis}
                                size="small"
                            >
                                View Analysis
                            </Button>
                        )}
                    </Stack>

                    {/* Form Fields */}
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
                                error={duplicateEmailError}
                                helperText={
                                    duplicateEmailError ? 
                                        "This email already exists in our system" :
                                        emailWarning ? 
                                            "No email found in resume. Please add manually." : 
                                            ""
                                }
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
                            disabled={isLoading || !formData.resume || (emailWarning && !formData.email)}
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

            <Dialog 
                open={showAnalysisDialog} 
                onClose={handleCloseAnalysisDialog} 
                maxWidth="md" 
                fullWidth
            >
                <DialogTitle>Resume Analysis</DialogTitle>
                <DialogContent dividers>
                    {analysisData && analysisData.resume && analysisData.resume.aiAnalysis && (
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                Matching Score: {analysisData.resume.matchingScore || analysisData.resume.aiAnalysis.matchPercentage || 0}%
                            </Typography>
                            
                            {analysisData.resume.aiAnalysis.recommendation && (
                                <>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Recommendation: {analysisData.resume.aiAnalysis.recommendation}
                                    </Typography>
                                    <Divider sx={{ my: 2 }} />
                                </>
                            )}
                            
                            <Typography variant="subtitle1" gutterBottom>
                                Matching Skills:
                            </Typography>
                            {analysisData.resume.aiAnalysis.matchingSkills?.length > 0 ? (
                                <Box sx={{ mb: 3 }}>
                                    {analysisData.resume.aiAnalysis.matchingSkills.map((skill, index) => (
                                        <Box key={index} sx={{ mb: 1 }}>
                                            <Typography variant="body2">
                                                {skill.skill} ({skill.confidence}% match)
                                            </Typography>
                                            <LinearProgress
                                                variant="determinate"
                                                value={skill.confidence}
                                                sx={{ height: 8, borderRadius: 4 }}
                                            />
                                        </Box>
                                    ))}
                                </Box>
                            ) : (
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                    No matching skills identified
                                </Typography>
                            )}
                            
                            <Divider sx={{ my: 2 }} />
                            
                            <Typography variant="subtitle1" gutterBottom>
                                Missing Skills:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                                {analysisData.resume.aiAnalysis.missingSkills?.map((skill, index) => (
                                    <Chip
                                        key={index}
                                        label={skill}
                                        color="error"
                                        variant="outlined"
                                        sx={{ mb: 1 }}
                                    />
                                ))}
                            </Box>
                            
                            {analysisData.resume.aiAnalysis.educationMatch && (
                                <>
                                    <Divider sx={{ my: 2 }} />
                                    <Typography variant="subtitle1" gutterBottom>
                                        Education Match:
                                    </Typography>
                                    <Typography variant="body2" paragraph>
                                        {analysisData.resume.aiAnalysis.educationMatch}
                                    </Typography>
                                </>
                            )}
                            
                            {analysisData.resume.aiAnalysis.experienceMatch && (
                                <>
                                    <Divider sx={{ my: 2 }} />
                                    <Typography variant="subtitle1" gutterBottom>
                                        Experience Match:
                                    </Typography>
                                    <Typography variant="body2" paragraph>
                                        {analysisData.resume.aiAnalysis.experienceMatch}
                                    </Typography>
                                </>
                            )}
                            
                            <Divider sx={{ my: 2 }} />
                            
                            <Typography variant="subtitle1" gutterBottom>
                                Analysis Summary:
                            </Typography>
                            <Typography variant="body2" paragraph sx={{ whiteSpace: 'pre-line' }}>
                                {analysisData.resume.aiAnalysis.analysis || "No analysis available"}
                            </Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAnalysisDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AddCandidateForm;