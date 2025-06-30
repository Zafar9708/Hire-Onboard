import React from 'react';
import { useState,useEffect } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import CandidateDetailsPage from '../candidates/CandidateDetailsDialog';
import { useNavigate } from "react-router-dom";

const Layout = () => {
    const navigate = useNavigate();
    const [userName] = useState(localStorage.getItem("user_name") || "User");

    useEffect(() => {
        if (!localStorage.getItem("access_token")) {
            navigate("/login");
        }
    }, [navigate]);

    const getInitials = (name) => {
        return name.split(" ").map(part => part[0].toUpperCase()).join("");
    };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header */}
      <Box sx={{ 
        position: 'fixed', 
        top: 0, 
        left: 190, 
        right: 0, 
        zIndex: 1100,
        height: 64 
      }}>
        <Header userName={userName} getInitials={getInitials} />
      </Box>

      {/* Main Content Area */}
      <Box sx={{ 
        display: 'flex', 
        flexGrow: 1, 
        pt: '64px', // Account for header height
        pl: '190px' // Account for sidebar width
      }}>
        {/* Sidebar */}
        <Box sx={{ 
          position: 'fixed', 
          left: 0, 
          top: 0, 
          bottom: 0, 
          width: 190,
          zIndex: 1200 
        }}>
          <Sidebar />
        </Box>

        {/* Main Content */}
        <Box sx={{ 
          flexGrow: 1, 
          p: 3,
          overflow: 'auto',
          height: 'calc(100vh - 64px)' // Full height minus header
        }}>
          <CandidateDetailsPage />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;