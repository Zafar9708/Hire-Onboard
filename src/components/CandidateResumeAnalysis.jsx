import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  LinearProgress,
  Chip,
  Grid,
  Card,
  CardContent,
  Divider,
  useTheme,
  Button,
  DialogActions,
  Paper,
  CircularProgress
} from '@mui/material';
import {
  Close as CloseIcon,
  Assessment as AssessmentIcon,
  Work as WorkIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Description as DescriptionIcon,
  Star as StarIcon,
  Warning as WarningIcon,
  AccessTime as AccessTimeIcon
} from '@mui/icons-material';

const CandidateResumeAnalysis = ({ 
  open, 
  onClose, 
  analysisData, 
  loading = false 
}) => {
  const theme = useTheme();

  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? 'Not available' : date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Not available';
    }
  };

  if (!analysisData) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Resume Analysis
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '200px'
          }}>
            <Typography variant="body1" color="textSecondary">
              No analysis data available
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  // Safely get skills data
  const skillsData = analysisData.resumeAnalysis?.skills || {};
  const matchingSkills = skillsData.matching || [];
  const missingSkills = skillsData.missing || [];

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 3,
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle sx={{ 
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px'
      }}>
        <Box display="flex" alignItems="center">
          <AssessmentIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Resume Analysis - {analysisData.candidateInfo.name}
          </Typography>
        </Box>
        <IconButton 
          edge="end" 
          color="inherit" 
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 0 }}>
        {loading ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '200px'
          }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ p: 3 }}>
            {/* Job Details Section */}
            <Card sx={{ 
              mb: 3, 
              border: `1px solid ${theme.palette.divider}`, 
              borderRadius: 2,
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.contrastText
            }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <WorkIcon sx={{ mr: 1, fontSize: 32 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {analysisData.candidateInfo.jobDetails.jobTitle}
                    </Typography>
                    <Typography variant="subtitle1">
                      {analysisData.candidateInfo.jobDetails.jobName} • {analysisData.candidateInfo.jobDetails.department}
                    </Typography>
                  </Box>
                  <Chip 
                    label={analysisData.candidateInfo.jobDetails.jobStatus} 
                    color={analysisData.candidateInfo.jobDetails.jobStatus === 'Active' ? 'success' : 'error'}
                    sx={{ ml: 'auto' }}
                  />
                </Box>
                
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Experience Required:</strong> {analysisData.candidateInfo.jobDetails.experience}
                </Typography>
                
                <Paper elevation={0} sx={{ 
                  p: 2, 
                  mt: 2, 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 1
                }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Job Description:
                  </Typography>
                  <Typography variant="body2">
                    {analysisData.candidateInfo.jobDetails.jobDesc}
                  </Typography>
                </Paper>
              </CardContent>
            </Card>

            {/* Match Score Section */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ 
                  border: `1px solid ${theme.palette.divider}`, 
                  borderRadius: 2,
                  height: '100%'
                }}>
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ 
                      fontWeight: 600, 
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <StarIcon color="primary" sx={{ mr: 1 }} />
                      Match Score
                    </Typography>
                    
                    <Box display="flex" alignItems="center" mb={2}>
                      <Box width="100%" mr={2}>
                        <LinearProgress 
                          variant="determinate" 
                          value={analysisData.resumeAnalysis.matchPercentage} 
                          sx={{ 
                            height: 10, 
                            borderRadius: 5,
                            backgroundColor: theme.palette.grey[200]
                          }}
                          color={
                            analysisData.resumeAnalysis.matchPercentage > 75 ? 'success' :
                            analysisData.resumeAnalysis.matchPercentage > 50 ? 'warning' : 'error'
                          }
                        />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        {analysisData.resumeAnalysis.matchPercentage}%
                      </Typography>
                    </Box>
                    
                    {/* <Box display="flex" alignItems="center" mb={2}>
                      <Typography variant="body1" sx={{ mr: 1 }}>
                        Status:
                      </Typography>
                      <Chip 
                        label={analysisData.resumeAnalysis.status} 
                        size="medium"
                        icon={
                          analysisData.resumeAnalysis.status === 'Rejected' ? 
                            <CancelIcon /> : <CheckCircleIcon />
                        }
                        color={
                          analysisData.resumeAnalysis.status === 'Rejected' ? 'error' :
                          analysisData.resumeAnalysis.status === 'Shortlisted' ? 'success' : 'warning'
                        }
                        sx={{ fontWeight: 600 }}
                      />
                    </Box> */}
                    
                    <Box>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Recommendation:</strong> {analysisData.resumeAnalysis.recommendation}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Resume Link Section */}
              <Grid item xs={12} md={6}>
                <Card sx={{ 
                  border: `1px solid ${theme.palette.divider}`, 
                  borderRadius: 2,
                  height: '100%'
                }}>
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ 
                      fontWeight: 600, 
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <DescriptionIcon color="primary" sx={{ mr: 1 }} />
                      Resume Details
                    </Typography>
                    
                    <Button 
                      variant="contained"
                      color="secondary"
                      fullWidth
                      startIcon={<AssessmentIcon />}
                      href={analysisData.resumeAnalysis.resumeUrl} 
                      target="_blank"
                      sx={{ mb: 2 }}
                    >
                      View Full Resume
                    </Button>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <AccessTimeIcon color="action" sx={{ mr: 1 }} />
                      <Typography variant="body2" color="textSecondary">
                        <strong>Analyzed On:</strong> {formatDate(analysisData.resumeAnalysis.parsedAt)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTimeIcon color="action" sx={{ mr: 1 }} />
                      <Typography variant="body2" color="textSecondary">
                        <strong>Last Updated:</strong> {formatDate(analysisData.resumeAnalysis.lastUpdated)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Matching Skills Section */}
              <Grid item xs={12} md={6}>
                <Card sx={{ 
                  border: `1px solid ${theme.palette.divider}`, 
                  borderRadius: 2
                }}>
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ 
                      fontWeight: 600, 
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                      Matching Skills ({matchingSkills.length})
                    </Typography>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: 1,
                      maxHeight: 200,
                      overflowY: 'auto',
                      p: 1
                    }}>
                      {matchingSkills.map((skill, index) => (
                        <Chip
                          key={index}
                          label={`${skill.skill} (${skill.confidence}%)`}
                          size="medium"
                          color="success"
                          variant="outlined"
                          sx={{ fontWeight: 500 }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Missing Skills Section */}
              <Grid item xs={12} md={6}>
                <Card sx={{ 
                  border: `1px solid ${theme.palette.divider}`, 
                  borderRadius: 2
                }}>
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ 
                      fontWeight: 600, 
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <WarningIcon color="warning" sx={{ mr: 1 }} />
                      Missing Skills ({missingSkills.length})
                    </Typography>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: 1,
                      maxHeight: 200,
                      overflowY: 'auto',
                      p: 1
                    }}>
                      {missingSkills.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          size="medium"
                          color="error"
                          variant="outlined"
                          sx={{ fontWeight: 500 }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Detailed Analysis Section */}
              <Grid item xs={12}>
                <Card sx={{ 
                  border: `1px solid ${theme.palette.divider}`, 
                  borderRadius: 2
                }}>
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ 
                      fontWeight: 600, 
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <AssessmentIcon color="primary" sx={{ mr: 1 }} />
                      Detailed Analysis
                    </Typography>
                    
                    <Paper elevation={0} sx={{ p: 2, mb: 2, backgroundColor: '#f5f5f5' }}>
                      <Typography variant="body1" paragraph>
                        {analysisData.resumeAnalysis.analysis.overall}
                      </Typography>
                    </Paper>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                          Experience Match:
                        </Typography>
                        <Typography variant="body1" paragraph>
                          {analysisData.resumeAnalysis.analysis.experience}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                          Education Match:
                        </Typography>
                        <Typography variant="body1">
                          {analysisData.resumeAnalysis.analysis.education}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button 
          variant="contained" 
          onClick={onClose}
          sx={{ 
            mr: 1,
            backgroundColor: theme.palette.primary.dark,
            '&:hover': {
              backgroundColor: theme.palette.primary.main
            }
          }}
        >
          Close Report
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CandidateResumeAnalysis;