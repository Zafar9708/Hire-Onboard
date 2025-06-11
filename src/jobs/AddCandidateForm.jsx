

import React, { useState, useRef } from "react";
import {Box, Card, CardContent, TextField, MenuItem, FormControl, InputLabel, Select, Button, IconButton, Typography, Grid, CircularProgress,} from "@mui/material";
import { CloudUpload as CloudUploadIcon, AttachFile as AttachFileIcon } from "@mui/icons-material";
import { createCandidate, uploadResume } from "../utils/api";
import { useLocation, useParams } from "react-router-dom";


const AddCandidateForm = ({ onClose, onSubmit }) => {
      const { id } = useParams();
    
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
    //   jobId:''
    });
  
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);
    const docsInputRef = useRef(null);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    const extractResumeData = async (file) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await uploadResume(file);
        setFormData((prev) => ({
          ...prev,
          firstName: data.firstName || "",
          middleName: data.middleName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          mobile: data.phone || "",
          skills: Array.isArray(data.skills) ? data.skills.join(", ") : data.skills || "",
          experience: data.experience || "",
          education: data.education || "",
          resume: file,
        }));
      } catch (error) {
        console.error("Error parsing resume:", error);
        setError("Failed to parse resume. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleResumeUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        extractResumeData(file);
      }
    };
  
    const handleDocsUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFormData((prev) => ({ ...prev, additionalDocuments: file }));
      }
    };
  
    const handleSubmit = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const formDataToSend = new FormData();
  
        // Append all form fields
        Object.entries(formData).forEach(([key, value]) => {
          if (key === "resume" || key === "additionalDocuments") return;
          formDataToSend.append(key, value);
        });
  
        if (formData.resume) {
          formDataToSend.append("resume", formData.resume);
        }
  
        if (formData.additionalDocuments) {
          formDataToSend.append("additionalDocuments", formData.additionalDocuments);
        }
        if (id.length) {
             formDataToSend.append("jobId", id);
        }
       
  
        // const newCandidate = await createCandidate(formDataToSend);
        onSubmit(formDataToSend);
        onClose();
      } catch (error) {
        console.error("Error submitting candidate:", error);
        setError("Failed to submit candidate. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
        const handleCancel = () => {
        onClose();
    };
    return (
        <Box sx={{ width: '100%', maxWidth: 600, mx:"auto", mt: 2, p: 0 }}>
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
                        {formData.resume && (
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                {formData.resume.name}
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
                        sx={{
                            height: 10, width: 545, mb: 4
                        }}
                        margin="normal"
                        size="small"
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
                                    height: 40, width: 265, // Adjust this value as needed
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
                                    height: 40, width: 265, // Adjust this value as needed
                                    '& .MuiSelect-select': {
                                        paddingTop: '12px',
                                        paddingBottom: '12px'
                                    }
                                }}
                                size="small"
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
                                value={formData.email}
                                onChange={handleChange}
                                sx={{
                                    height: 40, width: 265, // Adjust this value as needed
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
                                label="Mobile"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                sx={{
                                    height: 40, width: 265, // Adjust this value as needed
                                    '& .MuiSelect-select': {
                                        paddingTop: '12px',
                                        paddingBottom: '12px'
                                    }
                                }}
                                size="small"
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
                                        height: 40, width: 265, // Adjust this value as needed
                                        '& .MuiSelect-select': {
                                            paddingTop: '12px',
                                            paddingBottom: '12px'
                                        }
                                    }}
                                >
                                    <MenuItem value="Sourced">Sourced</MenuItem>
                                    <MenuItem value="Screening">Screening</MenuItem>
                                    <MenuItem value="Interview">Interview</MenuItem>
                                    <MenuItem value="Preboarding">Preboarding</MenuItem>
                                    <MenuItem value="Hired">Hired</MenuItem>
                                    <MenuItem value="Archived">Archived</MenuItem>
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
                                        height: 40, width: 265, // Adjust this value as needed
                                        '& .MuiSelect-select': {
                                            paddingTop: '12px',
                                            paddingBottom: '12px'
                                        }
                                    }}
                                >
                                    <MenuItem value="LinkedIn">LinkedIn</MenuItem>
                                    <MenuItem value="Naukari">Naukari</MenuItem>
                                    <MenuItem value="Via Email">Via Email</MenuItem>
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
                                    height: 40, width: 265, // Adjust this value as needed
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
                                        height: 40, width: 265, // Adjust this value as needed
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
                                        height: 40, width: 265, // Adjust this value as needed
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
                                        height: 40, width: 265, // Adjust this value as needed
                                        '& .MuiSelect-select': {
                                            paddingTop: '12px',
                                            paddingBottom: '12px'
                                        }
                                    }}
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
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
                                    height: 40, width: 265, // Adjust this value as needed
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
                                        height: 40, width: 270, // Adjust this value as needed
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
                                    height: 1, width: 268, // Adjust this value as needed
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
                                    height: 1, width: 268, // Adjust this value as needed
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
                        <Button onClick={handleCancel} variant="outlined" color="secondary" size="small">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} variant="contained" color="primary" size="small">
                            Add Candidate
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};
export default AddCandidateForm;




