

import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Paper,
    Divider,
    Grid,
    CircularProgress,
    Alert
} from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FeedbackForm = () => {
    const { interviewId, interviewerId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [interview, setInterview] = useState(null);
    const [formData, setFormData] = useState({
        status: '',
        technicalSkills: '',
        communicationSkills: '',
        problemSolving: '',
        culturalFit: '',
        overallFeedback: '',
        additionalComments: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    useEffect(() => {
        const fetchInterviewDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://hire-onboardbackend-production.up.railway.app/api/interviews/${interviewId}`);
                
                if (!response.data || !response.data.success) {
                    throw new Error(response.data?.message || 'No interview data received');
                }

                console.log('API Response:', response.data); // Debug log

                const interviewData = response.data.data;
                
                if (!interviewData) {
                    throw new Error('Interview data is empty');
                }

                setInterview(interviewData);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching interview:', err);
                setError(err.response?.data?.message || err.message || 'Failed to load interview details');
                setLoading(false);
            }
        };
        
        if (interviewId && interviewerId) {
            fetchInterviewDetails();
        } else {
            setError('Missing interview or interviewer ID');
            setLoading(false);
        }
    }, [interviewId, interviewerId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitError(null);
        
        try {
            const response = await axios.post(
                `https://hire-onboardbackend-production.up.railway.app/api/feedback/${interviewId}/${interviewerId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            
            if (response.data.success) {
                setSubmitSuccess(true);
                setTimeout(() => navigate('/feedback-success'), 3000);
            } else {
                throw new Error(response.data.message || 'Feedback submission failed');
            }
        } catch (err) {
            console.error('Error submitting feedback:', err);
            setSubmitError(
                err.response?.data?.message || 
                err.message || 
                'Failed to submit feedback. Please try again.'
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box p={3}>
                <Alert severity="error">{error}</Alert>
                <Button 
                    variant="contained" 
                    onClick={() => window.location.reload()}
                    sx={{ mt: 2 }}
                >
                    Try Again
                </Button>
            </Box>
        );
    }

    if (submitSuccess) {
        return (
            <Box p={3}>
                <Alert severity="success">
                    Feedback submitted successfully! You will be redirected shortly.
                </Alert>
            </Box>
        );
    }

    if (!interview) {
        return (
            <Box p={3}>
                <Alert severity="warning">No interview data found</Alert>
            </Box>
        );
    }

    return (
        <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h5" gutterBottom>
                Interview Feedback
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                    <Typography>
                        <strong>Candidate:</strong> {interview.candidate?.name || 'Not available'}
                    </Typography>
                    <Typography>
                        <strong>Job:</strong> {interview.jobId?.jobTitle || interview.jobId?.jobName || 'N/A'}
                    </Typography>

                    <Typography>
                        <strong>JobName:</strong> {interview.jobId?.jobName || interview.jobId?.jobName || 'N/A'}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography>
                        <strong>Date:</strong> {interview.date ? new Date(interview.date).toLocaleDateString() : 'Not available'}
                    </Typography>
                    <Typography>
                        <strong>Time:</strong> {interview.startTime || 'Not available'}
                    </Typography>
                </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />

            <form onSubmit={handleSubmit}>
                <FormControl fullWidth sx={{ mb: 3 }} required>
                    <InputLabel>Recommendation</InputLabel>
                    <Select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        label="Recommendation"
                    >
                        <MenuItem value="Selected">Selected</MenuItem>
                        <MenuItem value="Rejected">Rejected</MenuItem>
                        <MenuItem value="Hold">Hold</MenuItem>
                    </Select>
                </FormControl>

                {formData.status && (
                    <>
                        <Typography variant="subtitle1" gutterBottom>
                            Evaluation (1-5, 5 being highest)
                        </Typography>
                        
                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            {[
                                { name: 'technicalSkills', label: 'Technical Skills' },
                                { name: 'communicationSkills', label: 'Communication' },
                                { name: 'problemSolving', label: 'Problem Solving' },
                                { name: 'culturalFit', label: 'Cultural Fit' }
                            ].map((skill) => (
                                <Grid item xs={12} sm={6} key={skill.name}>
                                    <FormControl fullWidth required>
                                        <InputLabel>{skill.label}</InputLabel>
                                        <Select
                                           sx={{width:175}}
                                            name={skill.name}
                                            value={formData[skill.name]}
                                            onChange={handleChange}
                                            label={skill.label}
                                        >
                                            {[1, 2, 3, 4, 5].map((num) => (
                                                <MenuItem key={num} value={num}>
                                                    {num} - {num === 1 ? 'Poor' : num === 5 ? 'Excellent' : 'Average'}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            ))}
                        </Grid>

                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Overall Feedback"
                            name="overallFeedback"
                            value={formData.overallFeedback}
                            onChange={handleChange}
                            required
                            sx={{ mb: 3 }}
                        />
                    </>
                )}

                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Additional Comments (Optional)"
                    name="additionalComments"
                    value={formData.additionalComments}
                    onChange={handleChange}
                    sx={{ mb: 3 }}
                />

                {submitError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {submitError}
                    </Alert>
                )}

                <Box display="flex" justifyContent="flex-end">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={submitting || !formData.status}
                        sx={{ minWidth: 120 }}
                    >
                        {submitting ? <CircularProgress size={24} /> : 'Submit'}
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

export default FeedbackForm;