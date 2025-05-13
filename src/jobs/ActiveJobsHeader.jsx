import React, { useState, useEffect } from "react";
import {
  Typography,
  Switch,
  Box,
  Button,
  IconButton,
  Paper,
  Menu,
  MenuItem
} from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../utils/api";

const ActiveJobsHeader = ({ onViewChange, onPriorityToggle }) => {
  const [showPriority, setShowPriority] = useState(false);
  const [view, setView] = useState("card");
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeJobsCount, setActiveJobsCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobCount = async () => {
      try {
        const response = await api.get('/jobs');
        const jobs = response.data.jobs;
        const activeJobs = jobs.filter(job => {
          const targetDate = job.jobFormId?.targetHireDate;
          return !(targetDate && new Date() > new Date(targetDate));
        });
        setActiveJobsCount(activeJobs.length);
      } catch (error) {
        console.error("Failed to fetch jobs count:", error);
      }
    };

    fetchJobCount();
  }, []);

  // useEffect(() => {
  //     const fetchJobCount = async () => {
  //       try {
  //         const response = await api.get('/jobs');
  //         setJobs(response.data.jobs); // ✅ this sets jobs state
  //         setLoading(false);           // ✅ stop showing loader
  //       } catch (error) {
  //         console.error('Failed to fetch jobs:', error);
  //         if (error.response?.status === 401) {
  //           localStorage.removeItem('token');
  //           navigate('/login');
  //         }
  //         setLoading(false); // Still stop loader even on error
  //       }
  //     };
      
  //     fetchJobCount();
      
  //   }, []);

  const handleCreateJobClick = () => {
    navigate("/create-job");
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action) => {
    console.log("Selected action:", action);
    handleMenuClose();
  };

  const handleViewChange = (newView) => {
    setView(newView);
    onViewChange(newView);
  };

  const handlePriorityToggle = () => {
    const newValue = !showPriority;
    setShowPriority(newValue);
    onPriorityToggle(newValue);
  };

  return (
    <Paper elevation={0} className="p-4 mb-4 " sx={{
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 2
    }}>
      {/* Left: Title */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h5" className="text-blue-900 font-bold">
          Active Jobs ({activeJobsCount})
        </Typography>
        <Typography variant="body1" className="text-gray-600 mt-1">
          Here you can find all the jobs of this organisation.
        </Typography>
      </Box>

      {/* Right: Controls */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
        {/* Priority Toggle */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Switch
            checked={showPriority}
            onChange={handlePriorityToggle}
            color="primary"
          />
          <Typography variant="body2">Show only priority</Typography>
        </Box>

        {/* View Mode Buttons */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            onClick={() => handleViewChange("card")}
            color={view === "card" ? "primary" : "default"}
          >
            <ViewModuleIcon />
          </IconButton>
          <IconButton
            onClick={() => handleViewChange("table")}
            color={view === "table" ? "primary" : "default"}
          >
            <TableRowsIcon />
          </IconButton>
        </Box>

        {/* Create Job Button with Dropdown */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateJobClick}
            sx={{
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              height: '40px',
              minHeight: '40px'
            }}
          >
            Create Job
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleMenuClick}
            sx={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              minWidth: '40px',
              height: '40px',
              minHeight: '40px'
            }}
          >
            <ArrowDropDownIcon />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleMenuItemClick("import")}>Import Jobs</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("duplicate")}>Duplicate Job</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("duplicate")}>Closed Own</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("duplicate")}>On Hold</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("duplicate")}>Archived</MenuItem>


          </Menu>
        </Box>
      </Box>
    </Paper>
  );
};

export default ActiveJobsHeader;
