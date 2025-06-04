import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Grid,
  Box,
  CircularProgress,
  Divider,
  Chip,
  Paper,
  Stack,
  IconButton,
} from "@mui/material";
import { ViewModule, ViewList } from "@mui/icons-material"; // Table and Card Icons

const InfoItem = ({ label, value }) => (
  <Box>
    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
      {label}
    </Typography>
    <Typography variant="body1">{value || "—"}</Typography>
  </Box>
);

const JobInfo = () => {
  const { id: jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("card"); // State for view (card or table)

  useEffect(() => {
    const fetchJobById = async () => {
      try {
        const response = await axios.get(`https://hire-onboardbackend-13.onrender.com/api/jobs/byId/${jobId}`);
        setJob(response.data.job);
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) fetchJobById();
  }, [jobId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (!job) {
    return (
      <Typography align="center" mt={6} color="error">
        Failed to load job data.
      </Typography>
    );
  }

  const {
    jobTitle,
    department,
    experience,
    jobDesc,
    jobFormId,
    createdAt,
    updatedAt,
  } = job;

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <Box p={2} maxWidth="1200px" mx="auto">
      <Paper elevation={3} sx={{ borderRadius: 4, p: 4 }}>
        <Stack spacing={3}>
          {/* Main Heading */}
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography variant="h5" marginLeft={50} fontWeight={600} gutterBottom>
                JOB OVERVIEW
              </Typography>
              <Typography variant="h6" color="text.primary">
                {jobTitle}
              </Typography>
            </Box>

            {/* View Toggle */}
            <Box>
              <IconButton
                color={view === "table" ? "primary" : "default"}
                onClick={() => handleViewChange("table")}
              >
                <ViewList /> {/* Table Icon */}
              </IconButton>
              <IconButton
                color={view === "card" ? "primary" : "default"}
                onClick={() => handleViewChange("card")}
              >
                <ViewModule /> {/* Card Icon */}
              </IconButton>
            </Box>
          </Box>

          <Divider />

          {/* Conditionally render view */}
          {view === "card" ? (
            // Card View
            <Box>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Basic Info
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <InfoItem label="Department" value={department} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InfoItem label="Experience" value={experience} />
                </Grid>
                <Grid item xs={12}>
                  <InfoItem label="Job Description" value={jobDesc} />
                </Grid>
              </Grid>

              <Divider />

              <Typography variant="subtitle1" fontWeight={600} mt={2} gutterBottom>
                Job Details
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <InfoItem label="Location" value={jobFormId?.location} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InfoItem label="Job Type" value={jobFormId?.jobType} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InfoItem label="Openings" value={jobFormId?.openings} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InfoItem
                    label="Target Hire Date"
                    value={new Date(jobFormId?.targetHireDate).toLocaleDateString()}
                  />
                </Grid>
              </Grid>

              <Divider />

              <Typography variant="subtitle1" fontWeight={600} mt={2} gutterBottom>
                Compensation & Options
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <InfoItem
                    label="Compensation"
                    value={`${jobFormId?.currency || ""} ${jobFormId?.amount || ""}`}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InfoItem
                    label="Reapply Allowed"
                    value={
                      jobFormId?.allowReapply
                        ? `Yes (After ${jobFormId?.reapplyDate} days)`
                        : "No"
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InfoItem
                    label="Priority"
                    value={jobFormId?.markPriority ? "Yes" : "No"}
                  />
                </Grid>
              </Grid>

              <Divider />

              <Typography variant="subtitle1" fontWeight={600} mt={2} gutterBottom>
                Hiring Flow
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {jobFormId?.hiringFlow?.length > 0 ? (
                  jobFormId.hiringFlow.map((stage, index) => (
                    <Chip key={index} label={stage} color="primary" variant="outlined" />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No hiring stages defined.
                  </Typography>
                )}
              </Stack>

              <Divider />
            </Box>
          ) : (
            // Table View (Complete fields displayed)
            <Box>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                JOB INFO 
              </Typography>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>Field</th>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>Job Title</td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>{jobTitle}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>Department</td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>{department}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>Experience</td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>{experience}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>Job Description</td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>{jobDesc}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>Location</td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>{jobFormId?.location}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>Job Type</td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>{jobFormId?.jobType}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>Openings</td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>{jobFormId?.openings}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>Target Hire Date</td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {new Date(jobFormId?.targetHireDate).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>Compensation</td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {`${jobFormId?.currency || ""} ${jobFormId?.amount || ""}`}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>Reapply Allowed</td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {jobFormId?.allowReapply
                        ? `Yes (After ${jobFormId?.reapplyDate} days)`
                        : "No"}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>Priority</td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {jobFormId?.markPriority ? "Yes" : "No"}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>Hiring Flow</td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {jobFormId?.hiringFlow?.length > 0 ? (
                        jobFormId.hiringFlow.join(", ")
                      ) : (
                        "No stages defined."
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Box>
          )}

          {/* Footer */}
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="caption" color="text.secondary">
              Created: {new Date(createdAt).toLocaleString()}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Updated: {new Date(updatedAt).toLocaleString()}
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default JobInfo;
