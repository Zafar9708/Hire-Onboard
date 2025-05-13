

import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const StepIndicator = ({ activeStep, completedSteps = [] }) => {
  const steps = ["JOB DESCRIPTION", "JOB DETAILS", "PUBLISH OPTIONS"];

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3, mt: 2 }}>
      {steps.map((label, index) => (
        <React.Fragment key={index}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              sx={{
                bgcolor: activeStep === index || completedSteps.includes(index) ? "#1976d2" : "#cfd8dc",
                color: "white",
                width: 30,
                height: 30,
              }}
            >
              {completedSteps.includes(index) ? <CheckIcon fontSize="small" /> : index + 1}
            </Avatar>
            <Typography
              variant="body2"
              sx={{
                color: activeStep === index || completedSteps.includes(index) ? "#1976d2" : "#90a4ae",
                fontWeight: activeStep === index ? 600 : 400,
              }}
            >
              {label}
            </Typography>
          </Box>
          {index < steps.length - 1 && (
            <Box sx={{ width: 30, height: 2, backgroundColor: "#1976d2" }} />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default StepIndicator;