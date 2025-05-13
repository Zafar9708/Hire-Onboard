
import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  InputBase,
} from "@mui/material";
import Dashboard from "./JobDetailDashboard";
import CandidatesTab from "./CandidatesTab";
import JobInfo from "./JobInfo";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const TabPanel = ({ children, value, index }) => {
  return value === index ? (
    <Box sx={{ p: 2 }}>
      {children}
    </Box>
  ) : null;
};

const JobDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);
   const [userName, setUserName] = useState("");

  // Get username from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("user_name");
    if (storedUsername) {
      setUserName(storedUsername);
    } else {
      console.warn("No username found in localStorage");
    }
  }, []);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  const tabNames = [
    "CHECKLIST",
    "DASHBOARD",
    "CANDIDATES",
    "JOBINFO",
    "HIRING-SETUP",
    "WORKFLOW-AUTOMATION",
    "PUBLISH OPTIONS",
    "SURVEY RESPONSE",
    "ANALYTICS",
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header Section */}
      <Header userName={userName} getInitials={getInitials} />
      {/* <div className="flex items-center space-x-2 bg-white p-1 rounded-lg shadow-md w-1/3 ml-4 mt-2"> */}
        <InputBase className="w-full mt-8"  placeholder="Search..." />
      

      {/* Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="bg-gray-800 text-white w-48 p-5 space-y-5">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
          {/* Tabs */}
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            {tabNames.map((tab, index) => (
              <Tab
                key={tab}
                label={tab.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                sx={{ textTransform: "capitalize" }}
              />
            ))}
          </Tabs>

          {/* Tab Content */}
          <TabPanel value={activeTab} index={0}>
            <Typography><strong>Checklist</strong> content for job ID: {id}</Typography>
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <Dashboard />
          </TabPanel>

          <TabPanel value={activeTab} index={2}>
            <CandidatesTab />
          </TabPanel>

          <TabPanel value={activeTab} index={3}>
            <JobInfo />
          </TabPanel>

          <TabPanel value={activeTab} index={4}>
            <Typography><strong>Hiring Setup</strong> content for job ID: {id}</Typography>
          </TabPanel>

          <TabPanel value={activeTab} index={5}>
            <Typography><strong>Workflow Automation</strong> content for job ID: {id}</Typography>
          </TabPanel>

          <TabPanel value={activeTab} index={6}>
            <Typography><strong>Publish Options</strong> content for job ID: {id}</Typography>
          </TabPanel>

          <TabPanel value={activeTab} index={7}>
            <Typography><strong>Survey Response</strong> content for job ID: {id}</Typography>
          </TabPanel>

          <TabPanel value={activeTab} index={8}>
            <Typography><strong>Analytics</strong> content for job ID: {id}</Typography>
          </TabPanel>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
