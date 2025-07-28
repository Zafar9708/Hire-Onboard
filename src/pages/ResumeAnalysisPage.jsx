import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';
import ResumeAnalysisDashboard from '../components/ResumeAnalysis';

const ResumeAnalysisPage = () => {
  const { resumeId } = useParams();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await axios.get(`https://hire-onboardbackend-key.up.railway.app/api/resumes/getResume/${resumeId}`);
        setResumeData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch resume data');
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, [resumeId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress size={80} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Box>
    );
  }

  if (!resumeData) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
        <Alert severity="warning">
          No resume data found
        </Alert>
      </Box>
    );
  }

  return <ResumeAnalysisDashboard resumeData={resumeData} />;
};

export default ResumeAnalysisPage;