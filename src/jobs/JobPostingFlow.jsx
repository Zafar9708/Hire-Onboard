import React, { useState } from 'react';
import JobDescriptionForm from './JobDescriptionForm';
import JobDetailsForm from './JobDetailsForm';
import PublishOptionsForm from './PublishOptionsForm';
import StepIndicator from './StepIndicator';
import { Box } from '@mui/material';

const JobPostingFlow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const handleContinue = (direction) => {
    if (direction === 'back') {
      setActiveStep(prev => prev - 1);
    } else {
      // Mark current step as completed
      if (!completedSteps.includes(activeStep)) {
        setCompletedSteps(prev => [...prev, activeStep]);
      }
      setActiveStep(prev => prev + 1);
    }
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <JobDescriptionForm onContinue={handleContinue} />;
      case 1:
        return <JobDetailsForm onContinue={handleContinue} />;
      case 2:
        return <PublishOptionsForm onContinue={handleContinue} />;
      default:
        return <JobDescriptionForm onContinue={handleContinue} />;
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <StepIndicator activeStep={activeStep} completedSteps={completedSteps} />
      {renderStep()}
    </Box>
  );
};

export default JobPostingFlow;