

// import React, { useState } from "react";
// import { Box, Typography } from "@mui/material";
// import StepIndicator from "./StepIndicator";
// import JobDescriptionForm from "./JobDescriptionForm";
// import JobDetailsForm from "./JobDetailsForm";
// import PublishOptionsForm from "./PublishOptionsForm";
// import { createJob } from "../utils/api";
// import { useNavigate } from "react-router-dom";

// const JobCreationPage = () => {
//   const [step, setStep] = useState(0);
//   const [completedSteps, setCompletedSteps] = useState([]);
//   const navigate = useNavigate();
  
//   const [formData, setFormData] = useState({
//     jobTitle: '',
//     department: '',
//     experience: '',
//     jobDesc: '',
//     BusinessUnit: '',
//     Client: '',
//     jobType: '',
//     location: '',
//     openings: '',
//     targetHireDate: null,
//     currency: '',
//     amount: '',
//     allowReapply: false,
//     reapplyDate: null,
//     markPriority: false,
//     hiringFlow: [
//       "Technical Round",
//       "Manager Interview",
//       "HR Round"
//     ],
//     careerSite: false,
//     internalEmployees: false,
//     referToEmployees: false,
//     SalesPerson:'',
//     recruitingPerson:''
//   });

//   const handleJobDescriptionSubmit = (data) => {
//     setFormData(prev => ({
//       ...prev,
//       ...data
//     }));
//     setCompletedSteps((prev) => [...new Set([...prev, 0])]);
//     setStep(1);
//   };

//   const handleJobDetailsSubmit = (data, action) => {
//     if (action === "back") {
//       setStep(0);
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         ...data
//       }));
//       setCompletedSteps((prev) => [...new Set([...prev, 1])]);
//       setStep(2);
//     }
//   };

//   const handlePublishBack = () => {
//     setStep(1);
//   };

//   const handlePublish = async (options) => {
//     const finalData = {
//       ...formData,
//       ...options
//     };
    
//     try {
//       const result = await createJob(finalData);
//       alert("Job Published Successfully ✅");
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Error submitting job:", error);
//       alert(error.response?.data?.error || "Failed to publish job. Please try again.");
//     }
//   };

//   return (
//     <Box sx={{ padding: 3, backgroundColor: "#F4F6F9", minHeight: "100vh" }}>
//       <Typography variant="h4" sx={{ color: "primary.main", fontWeight: "bold" }} align="center">
//         Create a New Job
//       </Typography>

//       <StepIndicator activeStep={step} completedSteps={completedSteps} />

//       {step === 0 && (
//         <JobDescriptionForm 
//           onContinue={handleJobDescriptionSubmit} 
//           initialData={{
//             jobTitle: formData.jobTitle,
//             department: formData.department,
//             experience: formData.experience,
//             jobDesc: formData.jobDesc
//           }}
//         />
//       )}

//       {step === 1 && (
//         <JobDetailsForm 
//           onContinue={handleJobDetailsSubmit} 
//           initialData={{
//             BusinessUnit: formData.BusinessUnit,
//             Client: formData.Client,
//             jobType: formData.jobType,
//             location: formData.location,
//             openings: formData.openings,
//             targetHireDate: formData.targetHireDate,
//             currency: formData.currency,
//             amount: formData.amount,
//             allowReapply: formData.allowReapply,
//             reapplyDate: formData.reapplyDate,
//             markPriority: formData.markPriority,
//             hiringFlow: formData.hiringFlow,
//             SalesPerson: formData.SalesPerson,
//             recruitingPerson: formData.recruitingPerson,
//           }}
//         />
//       )}

//       {step === 2 && (
//         <PublishOptionsForm
//           onBack={handlePublishBack}
//           onPublish={handlePublish}
//           initialOptions={{
//             careerSite: formData.careerSite,
//             internalEmployees: formData.internalEmployees,
//             referToEmployees: formData.referToEmployees
//           }}
//         />
//       )}
//     </Box>
//   );
// };

// export default JobCreationPage;


//------------


import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import StepIndicator from "./StepIndicator";
import JobDescriptionForm from "./JobDescriptionForm";
import JobDetailsForm from "./JobDetailsForm";
import PublishOptionsForm from "./PublishOptionsForm";
import { createJob, updateJob, fetchJobDetails } from "../utils/api";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const JobCreationPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(!!id); // Load immediately if we have an ID
  
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
    hiringFlow: ["Technical Round", "Manager Interview", "HR Round"],
    careerSite: false,
    internalEmployees: false,
    referToEmployees: false,
    SalesPerson: '',
    recruitingPerson: ''
  });

  useEffect(() => {
    if (id) {
      const loadJobData = async () => {
        try {
          let jobData;
          if (location.state?.job) {
            jobData = location.state.job;
          } else {
            const response = await fetchJobDetails(id);
            jobData = response.job;
          }
          
          setFormData({
            jobTitle: jobData.jobTitle || '',
            department: jobData.department || '',
            experience: jobData.experience || '',
            jobDesc: jobData.jobDesc || '',
            BusinessUnit: jobData.jobFormId?.BusinessUnit || '',
            Client: jobData.jobFormId?.Client || '',
            jobType: jobData.jobFormId?.jobType || '',
            location: jobData.jobFormId?.location || '',
            openings: jobData.jobFormId?.openings || '',
            targetHireDate: jobData.jobFormId?.targetHireDate || null,
            currency: jobData.jobFormId?.currency || '',
            amount: jobData.jobFormId?.amount || '',
            allowReapply: jobData.jobFormId?.allowReapply || false,
            reapplyDate: jobData.jobFormId?.reapplyDate || null,
            markPriority: jobData.jobFormId?.markPriority || false,
            hiringFlow: jobData.jobFormId?.hiringFlow || ["Technical Round", "Manager Interview", "HR Round"],
            careerSite: jobData.careerSite || false,
            internalEmployees: jobData.internalEmployees || false,
            referToEmployees: jobData.referToEmployees || false,
            SalesPerson: jobData.jobFormId?.SalesPerson || '',
            recruitingPerson: jobData.jobFormId?.recruitingPerson || ''
          });
          setIsEditMode(true);
        } catch (error) {
          console.error("Error loading job data:", error);
        } finally {
          setLoading(false);
        }
      };
      
      loadJobData();
    }
  }, [id, location.state]);

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
      setLoading(true);
      if (isEditMode) {
        await updateJob(id, finalData);
        alert("Job Updated Successfully ✅");
      } else {
        await createJob(finalData);
        alert("Job Published Successfully ✅");
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting job:", error);
      alert(error.response?.data?.error || "Failed to publish job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: "#F4F6F9", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ color: "primary.main", fontWeight: "bold" }} align="center">
        {isEditMode ? "Update Job Posting" : "Create a New Job"}
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
            hiringFlow: formData.hiringFlow,
            SalesPerson: formData.SalesPerson,
            recruitingPerson: formData.recruitingPerson,
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
          isEditMode={isEditMode}
        />
      )}
    </Box>
  );
};

export default JobCreationPage;

//--------added wr

// import React, { useState, useEffect } from "react";
// import { Box, Typography, CircularProgress } from "@mui/material";
// import StepIndicator from "./StepIndicator";
// import JobDescriptionForm from "./JobDescriptionForm";
// import JobDetailsForm from "./JobDetailsForm";
// import PublishOptionsForm from "./PublishOptionsForm";
// import { createJob, updateJob, fetchJobDetails, fetchAlljobs } from "../utils/api";
// import { useNavigate, useParams, useLocation } from "react-router-dom";

// const JobCreationPage = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [step, setStep] = useState(0);
//   const [completedSteps, setCompletedSteps] = useState([]);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [loading, setLoading] = useState(!!id);
//   const [nextJobNumber, setNextJobNumber] = useState('');
  
//   const [formData, setFormData] = useState({
//     jobTitle: '',
//     department: '',
//     experience: '',
//     jobDesc: '',
//     jobName: '',
//     BusinessUnit: '',
//     Client: '',
//     jobType: '',
//     location: '',
//     openings: '',
//     targetHireDate: null,
//     currency: '',
//     amount: '',
//     allowReapply: false,
//     reapplyDate: null,
//     markPriority: false,
//     hiringFlow: ["Technical Round", "Manager Interview", "HR Round"],
//     careerSite: false,
//     internalEmployees: false,
//     referToEmployees: false,
//     SalesPerson: '',
//     recruitingPerson: ''
//   });

//   useEffect(() => {
//     const fetchNextJobNumber = async () => {
//       try {
//         const response = await fetchAlljobs();
//         const allJobs = response.jobs;
        
//         const jobNumbers = allJobs
//           .map(job => job.jobName)
//           .filter(name => name && name.startsWith('WR'))
//           .map(name => parseInt(name.replace('WR', ''), 10))
//           .filter(num => !isNaN(num));
        
//         const nextNum = jobNumbers.length > 0 ? Math.max(...jobNumbers) + 1 : 1;
//         setNextJobNumber(`WR${nextNum.toString().padStart(2, '0')}`);
//         setFormData(prev => ({ ...prev, jobName: `WR${nextNum.toString().padStart(2, '0')}` }));
//       } catch (error) {
//         console.error('Error fetching jobs:', error);
//         setNextJobNumber('WR01');
//         setFormData(prev => ({ ...prev, jobName: 'WR01' }));
//       }
//     };

//     if (!id) {
//       fetchNextJobNumber();
//     }
//   }, [id]);

//   useEffect(() => {
//     if (id) {
//       const loadJobData = async () => {
//         try {
//           let jobData;
//           if (location.state?.job) {
//             jobData = location.state.job;
//           } else {
//             const response = await fetchJobDetails(id);
//             jobData = response.job;
//           }
          
//           setFormData({
//             jobTitle: jobData.jobTitle || '',
//             department: jobData.department || '',
//             experience: jobData.experience || '',
//             jobDesc: jobData.jobDesc || '',
//             jobName: jobData.jobName || '',
//             BusinessUnit: jobData.jobFormId?.BusinessUnit || '',
//             Client: jobData.jobFormId?.Client || '',
//             jobType: jobData.jobFormId?.jobType || '',
//             location: jobData.jobFormId?.location || '',
//             openings: jobData.jobFormId?.openings || '',
//             targetHireDate: jobData.jobFormId?.targetHireDate || null,
//             currency: jobData.jobFormId?.currency || '',
//             amount: jobData.jobFormId?.amount || '',
//             allowReapply: jobData.jobFormId?.allowReapply || false,
//             reapplyDate: jobData.jobFormId?.reapplyDate || null,
//             markPriority: jobData.jobFormId?.markPriority || false,
//             hiringFlow: jobData.jobFormId?.hiringFlow || ["Technical Round", "Manager Interview", "HR Round"],
//             careerSite: jobData.careerSite || false,
//             internalEmployees: jobData.internalEmployees || false,
//             referToEmployees: jobData.referToEmployees || false,
//             SalesPerson: jobData.jobFormId?.SalesPerson || '',
//             recruitingPerson: jobData.jobFormId?.recruitingPerson || ''
//           });
//           setIsEditMode(true);
//         } catch (error) {
//           console.error("Error loading job data:", error);
//         } finally {
//           setLoading(false);
//         }
//       };
      
//       loadJobData();
//     }
//   }, [id, location.state]);

//   const handleJobDescriptionSubmit = (data) => {
//     setFormData(prev => ({
//       ...prev,
//       ...data
//     }));
//     setCompletedSteps((prev) => [...new Set([...prev, 0])]);
//     setStep(1);
//   };

//   const handleJobDetailsSubmit = (data, action) => {
//     if (action === "back") {
//       setStep(0);
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         ...data
//       }));
//       setCompletedSteps((prev) => [...new Set([...prev, 1])]);
//       setStep(2);
//     }
//   };

//   const handlePublishBack = () => {
//     setStep(1);
//   };

//   const handlePublish = async (options) => {
//     const finalData = {
//       ...formData,
//       ...options
//     };
    
//     try {
//       setLoading(true);
//       if (isEditMode) {
//         await updateJob(id, finalData);
//         alert("Job Updated Successfully ✅");
//       } else {
//         await createJob(finalData);
//         alert("Job Published Successfully ✅");
//       }
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Error submitting job:", error);
//       alert(error.response?.data?.error || "Failed to publish job. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
//         <CircularProgress size={60} thickness={4} />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ padding: 3, backgroundColor: "#F4F6F9", minHeight: "100vh" }}>
//       <Typography variant="h4" sx={{ color: "primary.main", fontWeight: "bold" }} align="center">
//         {isEditMode ? "Update Job Posting" : "Create a New Job"}
//       </Typography>

//       <StepIndicator activeStep={step} completedSteps={completedSteps} />

//       {step === 0 && (
//         <JobDescriptionForm 
//           onContinue={handleJobDescriptionSubmit} 
//           initialData={{
//             jobTitle: formData.jobTitle,
//             department: formData.department,
//             experience: formData.experience,
//             jobDesc: formData.jobDesc
//           }}
//           jobNumber={formData.jobName}
//         />
//       )}

//       {step === 1 && (
//         <JobDetailsForm 
//           onContinue={handleJobDetailsSubmit} 
//           initialData={{
//             BusinessUnit: formData.BusinessUnit,
//             Client: formData.Client,
//             jobType: formData.jobType || '',
//             location: formData.location || '',
//             openings: formData.openings || '',
//             targetHireDate: formData.targetHireDate,
//             currency: formData.currency || '',
//             amount: formData.amount || '',
//             allowReapply: formData.allowReapply,
//             reapplyDate: formData.reapplyDate,
//             markPriority: formData.markPriority,
//             hiringFlow: formData.hiringFlow,
//             SalesPerson: formData.SalesPerson || '',
//             recruitingPerson: formData.recruitingPerson || ''
//           }}
//         />
//       )}

//       {step === 2 && (
//         <PublishOptionsForm
//           onBack={handlePublishBack}
//           onPublish={handlePublish}
//           initialOptions={{
//             careerSite: formData.careerSite,
//             internalEmployees: formData.internalEmployees,
//             referToEmployees: formData.referToEmployees
//           }}
//           isEditMode={isEditMode}
//         />
//       )}
//     </Box>
//   );
// };

// export default JobCreationPage;