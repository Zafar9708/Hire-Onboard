import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  RadioGroup,
  Grid,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Rating,
  Avatar,
  InputAdornment
} from '@mui/material';
import {
  Feedback as FeedbackIcon,
  Send as SendIcon,
  BugReport as BugReportIcon,
  Lightbulb as LightbulbIcon,
  Help as HelpIcon,
  CheckCircle as CheckCircleIcon,
  Email as EmailIcon,
  SentimentDissatisfied as SentimentDissatisfiedIcon,
  SentimentSatisfied as SentimentSatisfiedIcon,
  SentimentVerySatisfied as SentimentVerySatisfiedIcon
} from '@mui/icons-material';

const customIcons = {
  1: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="warning" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedIcon color="success" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

const Feedback= () => {
  const [feedback, setFeedback] = useState({
    type: 'suggestion',
    message: '',
    email: '',
    rating: null
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeStep, setActiveStep] = useState(0);

  const feedbackTypes = [
    { 
      value: 'suggestion', 
      label: 'Suggestion', 
      icon: <LightbulbIcon color="info" />,
      description: 'Share ideas to improve our product'
    },
    { 
      value: 'bug', 
      label: 'Bug Report', 
      icon: <BugReportIcon color="error" />,
      description: 'Report an issue or unexpected behavior'
    },
    { 
      value: 'question', 
      label: 'Question', 
      icon: <HelpIcon color="primary" />,
      description: 'Ask about features or functionality'
    }
  ];

  const steps = ['Feedback Type', 'Your Experience', 'Final Details'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!feedback.message) newErrors.message = 'Feedback message is required';
    if (feedback.email && !/^\S+@\S+\.\S+$/.test(feedback.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      if (validate()) {
        console.log('Feedback submitted:', feedback);
        setSubmitted(true);
        setTimeout(() => {
          setFeedback({
            type: 'suggestion',
            message: '',
            email: '',
            rating: null
          });
          setSubmitted(false);
          setActiveStep(0);
        }, 3000);
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Avatar sx={{ 
          bgcolor: 'primary.main', 
          width: 60, 
          height: 60,
          mx: 'auto',
          mb: 2
        }}>
          <FeedbackIcon fontSize="large" />
        </Avatar>
        <Typography variant="h4" sx={{ 
          fontWeight: 700,
          color: 'text.primary'
        }}>
          Share Your Feedback
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We value your input to help us improve
        </Typography>
      </Box>

      <Card sx={{ 
        borderRadius: 3,
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
      }}>
        <CardContent sx={{ p: 4 }}>
          {submitted ? (
            <Box sx={{ textAlign: 'center', p: 4 }}>
              <CheckCircleIcon sx={{ 
                fontSize: 60, 
                color: 'success.main',
                mb: 2
              }} />
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Thank You!
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Your feedback has been submitted successfully. We appreciate your time.
              </Typography>
              <Button 
                variant="outlined"
                onClick={() => {
                  setSubmitted(false);
                  setActiveStep(0);
                }}
              >
                Submit Another Feedback
              </Button>
            </Box>
          ) : (
            <>
              <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {activeStep === 0 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    What type of feedback do you have?
                  </Typography>
                  <RadioGroup 
                    name="type" 
                    value={feedback.type}
                    onChange={handleChange}
                    sx={{ gap: 2 }}
                  >
                    <Grid container spacing={2}>
                      {feedbackTypes.map((type) => (
                        <Grid item xs={12} sm={4} key={type.value}>
                          <Paper
                            elevation={feedback.type === type.value ? 3 : 1}
                            sx={{
                              p: 3,
                              borderRadius: 2,
                              border: '1px solid',
                              borderColor: feedback.type === type.value ? 'primary.main' : 'divider',
                              cursor: 'pointer',
                              '&:hover': {
                                borderColor: 'primary.main'
                              }
                            }}
                            onClick={() => setFeedback(prev => ({
                              ...prev,
                              type: type.value
                            }))}
                          >
                            <Box sx={{ 
                              display: 'flex', 
                              flexDirection: 'column',
                              alignItems: 'center',
                              textAlign: 'center'
                            }}>
                              {type.icon}
                              <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 600 }}>
                                {type.label}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                {type.description}
                              </Typography>
                            </Box>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </RadioGroup>
                </Box>
              )}

              {activeStep === 1 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    How would you rate your experience?
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    mb: 4
                  }}>
                    <Rating
                      name="rating"
                      value={feedback.rating}
                      onChange={(event, newValue) => {
                        setFeedback(prev => ({
                          ...prev,
                          rating: newValue
                        }));
                      }}
                      IconContainerComponent={IconContainer}
                      highlightSelectedOnly
                      size="large"
                    />
                  </Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Tell us more about your experience
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Your feedback"
                    name="message"
                    value={feedback.message}
                    onChange={handleChange}
                    error={!!errors.message}
                    helperText={errors.message}
                    required
                    sx={{ mb: 2 }}
                  />
                </Box>
              )}

              {activeStep === 2 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Final Details
                  </Typography>
                  <TextField
                    fullWidth
                    label="Email address (optional)"
                    name="email"
                    type="email"
                    value={feedback.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email || "We might need to contact you for more details"}
                    sx={{ mb: 3 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color="action" />
                        </InputAdornment>
                      )
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Your feedback is anonymous unless you provide contact information.
                  </Typography>
                </Box>
              )}

              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                mt: 4,
                pt: 2,
                borderTop: '1px solid',
                borderColor: 'divider'
              }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ 
                    visibility: activeStep === 0 ? 'hidden' : 'visible',
                    minWidth: 120
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  endIcon={activeStep === steps.length - 1 ? <SendIcon /> : null}
                  sx={{ 
                    minWidth: 120,
                    ml: 'auto'
                  }}
                >
                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </Box>
            </>
          )}
        </CardContent>
      </Card>

      <Box sx={{ 
        mt: 4,
        textAlign: 'center'
      }}>
        <Typography variant="body2" color="text.secondary">
          Need immediate help? <Button variant="text" size="small">Contact our support team</Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default Feedback;