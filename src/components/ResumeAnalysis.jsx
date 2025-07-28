import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  CircularProgress,
  LinearProgress,
  Divider,
  Button,
  Stack,
  Avatar,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  Warning,
  School,
  Work,
  Email,
  Phone,
  Download,
  Person
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledScoreProgress = styled(CircularProgress)(({ theme, score }) => ({
  width: '120px !important',
  height: '120px !important',
  color: score >= 75 
    ? theme.palette.success.main 
    : score >= 50 
      ? theme.palette.warning.main 
      : theme.palette.error.main,
}));

const ResumeAnalysisDashboard = ({ resumeData }) => {
  if (!resumeData) return null;

  const { resume } = resumeData;
  const { aiAnalysis } = resume;

  const getStatusColor = () => {
    if (resume.status === '') return 'error';
    if (resume.status === 'Selected') return 'success';
    return 'warning';
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Header Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
              {resume.firstName} {resume.middleName} {resume.lastName}
            </Typography>
            
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <Chip
                icon={<Email fontSize="small" />}
                label={resume.email}
                variant="outlined"
              />
              <Chip
                icon={<Phone fontSize="small" />}
                label={resume.phone}
                variant="outlined"
              />
            </Stack>

            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              Applied for: {resume.jobId} {/* You might want to fetch job title here */}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              startIcon={<Download />}
              href={resume.url}
              target="_blank"
              sx={{ mt: 1 }}
            >
              Download Full Resume
            </Button>
          </Grid>

          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box position="relative" display="inline-flex">
              <StyledScoreProgress 
                variant="determinate" 
                value={resume.matchingScore}
                score={resume.matchingScore}
              />
              <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="h4" component="div">
                  {resume.matchingScore}%
                </Typography>
                <Chip
                  label={resume.status}
                  color={getStatusColor()}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Skills Section */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ height: '100%', borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <CheckCircle color="success" sx={{ mr: 1 }} />
                Matching Skills ({aiAnalysis.matchingSkills.length})
              </Typography>
              <List dense>
                {aiAnalysis.matchingSkills.map((skill, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Avatar sx={{ 
                        bgcolor: 'success.light', 
                        width: 24, 
                        height: 24,
                        fontSize: '0.75rem'
                      }}>
                        {(skill.confidence * 100).toFixed(0)}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText 
                      primary={skill.skill} 
                      secondary={`Confidence: ${(skill.confidence * 100).toFixed(0)}%`}
                    />
                    <LinearProgress
                      variant="determinate"
                      value={skill.confidence * 100}
                      color="success"
                      sx={{ width: 100, height: 8, borderRadius: 4 }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ height: '100%', borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <Cancel color="error" sx={{ mr: 1 }} />
                Missing Skills ({aiAnalysis.missingSkills.length})
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {aiAnalysis.missingSkills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    color="error"
                    variant="outlined"
                    size="medium"
                    sx={{ mb: 1 }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Detailed Analysis */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>
                AI Analysis Summary
              </Typography>
              <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
                {aiAnalysis.analysis}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Education & Experience */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <School color="info" sx={{ mr: 1 }} />
                Education Match
              </Typography>
              <Typography variant="body1" paragraph>
                {aiAnalysis.educationMatch}
              </Typography>
              {resume.education && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2">Education Details:</Typography>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                    {resume.education}
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <Work color="info" sx={{ mr: 1 }} />
                Experience Match
              </Typography>
              <Typography variant="body1" paragraph>
                {aiAnalysis.experienceMatch}
              </Typography>
              {resume.experience && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2">Experience Details:</Typography>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                    {resume.experience}
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Skills Tag Cloud */}
      <Paper elevation={3} sx={{ p: 3, mt: 4, borderRadius: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Skills Overview
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {resume.skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              color="primary"
              sx={{ fontSize: '0.875rem' }}
            />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default ResumeAnalysisDashboard;