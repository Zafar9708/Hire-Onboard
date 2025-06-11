// src/utils/api.js
import axios from "axios";

// Base URL for the API
const BASE_URL = "http://localhost:8000/api";

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

    const response = await api.post("/jobs", jobData, {
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
      const response = await api.get("http://localhost:8000/user/allUsers");
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || err.message);
    }
  };
  



export const createCandidate = async (formData) => {
  try {
    const response = await api.post('/candidates', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.status===201) {
      return  response.data;
    }

    
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const uploadResume = async (resumeFile) => {
  try {
    const formData = new FormData();
    formData.append("resume", resumeFile);
    
    const response = await api.post("/resumes/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || err.message);
  }
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
    const response = await api.get(`/jobs`);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || err.message);
  }
}
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
      const response = await fetch('http://localhost:8000/api/candidates/send-bulk-emails', {
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