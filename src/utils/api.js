// src/utils/api.js
import axios from "axios";

// Base URL for the API
const BASE_URL = "https://hire-onboardbackend-production.up.railway.app/api";

// Create an axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to create a job
 export const createJob = async (jobData) => {
  try {
    const token = localStorage.getItem("access_token");
    console.log("Authorization header:", `Bearer ${token}`); 

    const response = await api.post("https://hire-onboardbackend-production.up.railway.app/api/jobs", jobData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || err.message);
  }
};


// to fetch data
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("access_token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;



// Function to fetch job templates
export const fetchJobTemplates = async () => {
    try {
      const response = await api.get("/jobs/jobTemplates");
      return response.data; 
    } catch (err) {
      throw new Error(err.response?.data?.error || err.message);
    }
  };


//function to fetchDeparments

export const fetchDepartments=async ()=>{
    try{
        const response = await api.get("/departments");
        return response.data
 
    }
    catch(err){
        throw new Error(err.response?.data?.error || err.message)
    }
}
//to add departments
export const addDepartment = async (name) => {
  const res = await api.post('/departments', { name });
  return res.data.departments;
};

// Function to submit job form details 
export const submitJobForm = async (jobData) => {
    try {
      const response = await api.post("/jobform/create", jobData);
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || err.message);
    }
  };


export const fetchJobFormOptions = async () => {
    try {
      const response = await api.get("/jobform/options");
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || err.message);
    }
  };
export const getAllUsers = async () => {
    try {
      const response = await api.get("https://hire-onboardbackend-production.up.railway.app/user/allUsers");
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || err.message);
    }
  };

export const addNewLocation = async (locationName) => {
  try {
    const response = await fetch('https://hire-onboardbackend-production.up.railway.app/api/locations', {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}` // Add if using auth
      },
      body: JSON.stringify({ 
        name: locationName.trim() // Ensure we send trimmed name
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add location');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding location:', error);
    throw error;
  }
};

export const fetchLocations = async () => {
  try {
    const response = await fetch('https://hire-onboardbackend-production.up.railway.app/api/locations');
    if (!response.ok) throw new Error('Failed to fetch locations');
    const data = await response.json();
    return data.data; // Assuming your API returns { success: true, data: [...] }
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
};
  

export const uploadResume = async (file, jobId) => {
    const formData = new FormData();
    formData.append('resume', file);
    if (jobId) formData.append('jobId', jobId);
    
    const response = await api.post('https://hire-onboardbackend-production.up.railway.app/api/resumes/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    });
    return response.data.data; // Assuming your API returns { data: { ...resumeData } }
};

export const createCandidate = async (formData) => {
    const response = await api.post('https://hire-onboardbackend-production.up.railway.app/api/candidates', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    });
    return response.data;
};

// Function to fetch resume by candidate ID
export const fetchCandidateResume = async (candidateId) => {
  try {
    const response = await api.get(`/candidates/${candidateId}/resume`);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || err.message);
  }
};

export const fetchAlljobs = async ()=>{
  try {
    const response = await api.get(`https://hire-onboardbackend-production.up.railway.app/api/jobs`);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || err.message);
  }
};
export const getAllLocations = async ()=>{
  try {
    const response = await api.get(`https://hire-onboardbackend-production.up.railway.app/api/locations`);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || err.message);
  }
};
export const getAllDepartments = async ()=>{
  try {
    const response = await api.get(`https://hire-onboardbackend-production.up.railway.app/api/departments`);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || err.message);
  }
};
export const getAllRecuiter = async ()=>{
  try {
    const response = await api.get(`https://hire-onboardbackend-production.up.railway.app/api/employees`);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || err.message);
  }
};


export const updateJob = async (id, jobData) => {
  try {
    const response = await api.put(`/jobs/${id}`, jobData);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || err.message);
  }
};


export const fetchAlljobsByStatus = async (status)=>{
  try {
    const response = await api.get(`/jobs/byStatus/${status}`);
    return response.data.jobs;
  } catch (err) {
    throw new Error(err.response?.data?.error || err.message);
  }
}


export const fetchCandidates = async () => {
  try {
    const response = await api.get("/candidates");
    return response.data.candidates;
  } catch (err) {
    throw new Error(err.response?.data?.error || err.message);
  }
};
export const fetchCandidatesByJob = async (jobId) => {
  try {
    const response = await api.get(`/candidates/getCandidateByJobs/${jobId}`);
    console.log("sabdcjnsk",response)
    return response.data.candidates;
  } catch (err) {
    throw new Error(err.response?.data?.error || err.message);
  }
};

export const fetchCandidateById = async (id) => {
  try {
    const response = await api.get(`/candidates/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || err.message);
  }
};

export const updateCandidate = async (id, candidateData) => {
  try {
    const response = await api.put(`/candidates/${id}`, candidateData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || err.message);
  }
};

export const deleteCandidate = async (id) => {
  try {
    const response = await api.delete(`/candidates/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || err.message);
  }
};



export const fetchJobDetails = async (jobId) => {
  const response = await api.get(`/jobs/byId/${jobId}`);
  return response.data;
};


//for interviews


export const fetchTimezones = () => axios.get(`${API_BASE}/timezones`);
export const fetchDurations = () => axios.get(`${API_BASE}/durations`);
export const fetchInterviewers = () => axios.get(`${API_BASE}/interviewers`);
export const fetchEmailTemplates = () => axios.get(`${API_BASE}/email-templates`);
export const addInterviewer = (data) => axios.post(`${API_BASE}/interviewers`, data);
export const scheduleInterview = (data) => axios.post(`${API_BASE}/schedule`, data);


// Move candidate to new stage
export const moveCandidate = async (candidateId, newStage, comment) => {
  try {
    const response = await axios.post(`${API_BASE}/candidate-stages/move`, {
      candidateId,
      newStage,
      comment
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get stage history for candidate
export const getStageHistory = async (candidateId) => {
  try {
    const response = await axios.get(`${API_BASE}/candidate-stages/history/${candidateId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update stage comment
export const updateStageComment = async (stageChangeId, comment) => {
  try {
    const response = await axios.patch(`${API_BASE}/candidate-stages/${stageChangeId}`, {
      comment
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Delete stage record (admin only)
export const deleteStageRecord = async (stageChangeId) => {
  try {
    const response = await axios.delete(`${API_BASE}/candidate-stages/${stageChangeId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


export const sendBulkEmails = async (emailData) => {
  try {
      const response = await fetch('https://hire-onboardbackend-production.up.railway.app/api/candidates/send-bulk-emails', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData),
      });

      if (!response.ok) {
          throw new Error('Failed to send bulk emails');
      }

      return await response.json();
  } catch (error) {
      console.error('Error sending bulk emails:', error);
      throw error;
  }
};

// for stages
export const getAllStages = async () => {
  try {
    const response = await fetch('https://hire-onboardbackend-production.up.railway.app/api/stages/all');
    if (!response.ok) {
      throw new Error('Failed to fetch stages');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching stages:', error);
    throw error;
  }
};


//----

// Fetch only Sales Persons
export const getAllEmployees = async () => {
  const response = await fetch("https://hire-onboardbackend-production.up.railway.app/api/employees");
  if (!response.ok) throw new Error("Failed to fetch employees");
  const data = await response.json();
  return data;
};

// Resume-specific functions with proper auth handling
export const downloadCandidateResume = async (candidateId) => {
  try {
    const response = await api.get(`/resumes/${candidateId}/download`, {
      responseType: 'blob',
      validateStatus: (status) => status < 500 // Don't reject for 404
    });
    
    if (response.status >= 400) {
      const error = new Error(response.data?.error || 'Download failed');
      error.response = response;
      throw error;
    }
    
    return response;
  } catch (err) {
    console.error('Download API error:', err);
    throw err;
  }
};

export const previewCandidateResume = async (candidateId) => {
  try {
    const response = await api.get(`/resumes/${candidateId}`, {
      responseType: 'blob',
      validateStatus: (status) => status < 500
    });
    
    if (response.status >= 400) {
      const error = new Error(response.data?.error || 'Preview failed');
      error.response = response;
      throw error;
    }
    
    return response;
  } catch (err) {
    console.error('Preview API error:', err);
    throw err;
  }
};

