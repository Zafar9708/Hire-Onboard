

import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import StepIndicator from "./StepIndicator";
import JobDescriptionForm from "./JobDescriptionForm";
import JobDetailsForm from "./JobDetailsForm";
import PublishOptionsForm from "./PublishOptionsForm";
import { createJob } from "../utils/api";
import { useNavigate } from "react-router-dom";

const JobCreationPage = () => {
  const [step, setStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    jobTitle: '',
    department: '',
    experience: '',
    jobDesc: '',
    BusinessUnit: '',
    Client: '',
    jobType: '',
    location: '',
    openings: '',
    targetHireDate: null,
    currency: '',
    amount: '',
    allowReapply: false,
    reapplyDate: null,
    markPriority: false,
    hiringFlow: [
      "Technical Round",
      "Manager Interview",
      "HR Round"
    ],
    careerSite: false,
    internalEmployees: false,
    referToEmployees: false
  });

  const handleJobDescriptionSubmit = (data) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
    setCompletedSteps((prev) => [...new Set([...prev, 0])]);
    setStep(1);
  };

  const handleJobDetailsSubmit = (data, action) => {
    if (action === "back") {
      setStep(0);
    } else {
      setFormData(prev => ({
        ...prev,
        ...data
      }));
      setCompletedSteps((prev) => [...new Set([...prev, 1])]);
      setStep(2);
    }
  };

  const handlePublishBack = () => {
    setStep(1);
  };

  const handlePublish = async (options) => {
    const finalData = {
      ...formData,
      ...options
    };
    
    try {
      const result = await createJob(finalData);
      console.log("Job created successfully:", result);
      alert("Job Published Successfully ✅");
      navigate("/Dashboard");
    } catch (error) {
      console.error("Error submitting job:", error);
      alert(error.response?.data?.error || "Failed to publish job. Please try again.");
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#F4F6F9", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ color: "primary.main", fontWeight: "bold" }} align="center">
        Create a New Job
      </Typography>

      <StepIndicator activeStep={step} completedSteps={completedSteps} />

      {step === 0 && (
        <JobDescriptionForm 
          onContinue={handleJobDescriptionSubmit} 
          initialData={{
            jobTitle: formData.jobTitle,
            department: formData.department,
            experience: formData.experience,
            jobDesc: formData.jobDesc
          }}
        />
      )}

      {step === 1 && (
        <JobDetailsForm 
          onContinue={handleJobDetailsSubmit} 
          initialData={{
            BusinessUnit: formData.BusinessUnit,
            Client: formData.Client,
            jobType: formData.jobType,
            location: formData.location,
            openings: formData.openings,
            targetHireDate: formData.targetHireDate,
            currency: formData.currency,
            amount: formData.amount,
            allowReapply: formData.allowReapply,
            reapplyDate: formData.reapplyDate,
            markPriority: formData.markPriority,
            hiringFlow: formData.hiringFlow
          }}
        />
      )}

      {step === 2 && (
        <PublishOptionsForm
          onBack={handlePublishBack}
          onPublish={handlePublish}
          initialOptions={{
            careerSite: formData.careerSite,
            internalEmployees: formData.internalEmployees,
            referToEmployees: formData.referToEmployees
          }}
        />
      )}
    </Box>
  );
};

export default JobCreationPage;