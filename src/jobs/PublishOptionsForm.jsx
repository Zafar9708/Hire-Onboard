

import React, { useState } from "react";
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  Avatar,
  CircularProgress
} from "@mui/material";

const jobBoards = [
  {
    name: "Naukri",
    logo: "/logos/naukri.png",
    url: "https://www.naukri.com/",
  },
  {
    name: "Glassdoor",
    logo: "/logos/glassdoor.png",
    url: "https://www.glassdoor.com/",
  },
  {
    name: "Foundit",
    logo: "/logos/foundit.jpg",
    url: "https://www.foundit.in/",
  },
];

const PublishOptionsForm = ({ onBack, onPublish, initialOptions, isEditMode }) => {
  const [publishOptions, setPublishOptions] = useState({
    careerSite: initialOptions.careerSite || false,
    internalEmployees: initialOptions.internalEmployees || false,
    referToEmployees: initialOptions.referToEmployees || false
  });
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    setLoading(true);
    try {
      await onPublish(publishOptions);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
      <Typography variant="h6" gutterBottom>
        {isEditMode ? "Update Options" : "Step 3: Publish Options"}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={publishOptions.careerSite}
              onChange={(e) =>
                setPublishOptions({ ...publishOptions, careerSite: e.target.checked })
              }
            />
          }
          label="Publish this job on career site"
        />

        <FormControlLabel
          control={
            <Switch
              checked={publishOptions.internalEmployees}
              onChange={(e) =>
                setPublishOptions({ ...publishOptions, internalEmployees: e.target.checked })
              }
            />
          }
          label="Post this job for internal employees"
        />

        <FormControlLabel
          control={
            <Switch
              checked={publishOptions.referToEmployees}
              onChange={(e) =>
                setPublishOptions({ ...publishOptions, referToEmployees: e.target.checked })
              }
            />
          }
          label="Refer this job to employees"
        />
      </Box>

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Share this job on:
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
          {jobBoards.map((board) => (
            <a
              key={board.name}
              href={board.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-block", transition: "transform 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <Avatar
                alt={board.name}
                src={board.logo}
                sx={{ width: 64, height: 64 }}
              />
            </a>
          ))}
        </Box>
      </Box>

      <Box sx={{ mt: 5, display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={onBack} disabled={loading}>
          Back
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handlePublish}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : isEditMode ? (
            "Update Changes"
          ) : (
            "Publish"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default PublishOptionsForm;