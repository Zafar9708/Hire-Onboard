
import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import JobCard from "../jobs/JobCard";
import SettingsPanel from "../SidebarMenu/Settings";
import Reports from "../SidebarMenu/Reports";
import Task from "./Task";

const Dashboard = () => {
    const navigate = useNavigate();
    const [userName] = useState(localStorage.getItem("user_name") || "User");
    const [selectedTab, setSelectedTab] = useState(0);
    const [subTab, setSubTab] = useState(0);

    useEffect(() => {
        if (!localStorage.getItem("access_token")) {
            navigate("/login");
        }
    }, [navigate]);

    const getInitials = (name) => {
        return name.split(" ").map(part => part[0].toUpperCase()).join("");
    };

    return (
        <Box sx={{ 
            display: 'flex', 
            minHeight: '100vh',
            overflow: 'hidden' // Prevent double scrollbars
        }}>
            <Header userName={userName} getInitials={getInitials} />
            <Sidebar />
            
            <Box 
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    marginLeft: '155px',
                    marginTop: '64px',
                    backgroundColor: '#f5f5f5',
                    height: 'calc(100vh - 64px)',
                    overflowY: 'auto', // Enable scrolling
                    '&::-webkit-scrollbar': { // Hide scrollbar but keep functionality
                        display: 'none'
                    },
                    msOverflowStyle: 'none', // IE and Edge
                    scrollbarWidth: 'none' // Firefox
                }}
            >
                <Box sx={{ 
                    maxWidth: '100%',
                    width: '100%',
                    margin: '0 auto',
                    px: 2
                }}>
                    <Tabs 
                        value={selectedTab} 
                        onChange={(e, newValue) => setSelectedTab(newValue)} 
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{ 
                            mb: 3,
                            maxWidth: '100%',
                            '.MuiTabs-scroller': {
                                overflow: 'auto !important'
                            }
                        }}
                    >
                        <Tab label="HOME" />
                        <Tab label="JOBS" />
                        <Tab label="CANDIDATES" />
                        <Tab label="PREONBOARDING" />
                        <Tab label="REPORTS" />
                        <Tab label="CAREERSITE" />
                        <Tab label="APPS" />
                        <Tab label="SETTINGS" />
                    </Tabs>

                    <Box sx={{ 
                        p: 2,
                        width: '100%',
                        maxWidth: '100%',
                        boxSizing: 'border-box'
                    }}>
                        {selectedTab === 0 && (
                            <Box sx={{ mb: 3 }}>
                                <Box sx={{ 
                                    display: 'flex', 
                                    gap: 2, 
                                    mb: 3,
                                    overflowX: 'auto',
                                    '&::-webkit-scrollbar': {
                                        display: 'none'
                                    }
                                }}>
                                    {['Dashboard', 'Insights', 'Interviews', 'Product Updates'].map((label, index) => (
                                        <Button
                                            key={index}
                                            onClick={() => setSubTab(index)}
                                            sx={{
                                                color: subTab === index ? 'primary.main' : 'text.secondary',
                                                fontWeight: subTab === index ? 'bold' : 'normal',
                                                whiteSpace: 'nowrap',
                                                flexShrink: 0
                                            }}
                                        >
                                            {label}
                                        </Button>
                                    ))}
                                </Box>
                                
                                {subTab === 0 && (
                                    <Box sx={{
                                        width: '100%',
                                        backgroundColor: 'white',
                                        borderRadius: 2,
                                        p: 3,
                                        boxShadow: 1
                                    }}>
                                        <Task/>
                                    </Box>
                                )}
                            </Box>
                        )}
                        
                        {selectedTab === 1 && (
                            <Box sx={{
                                width: '100%',
                                maxWidth: '100%',
                                overflow: 'hidden'
                            }}>
                                <JobCard />
                            </Box>
                        )}
                        {selectedTab === 4 && (
                            <Box sx={{
                                mr:120,
                                width: '100%',
                                maxWidth: '100%',
                                overflow: 'hidden'
                            }}>
                                <Reports />
                            </Box>
                        )}

                          {selectedTab === 7 && (
                            <Box sx={{
                                width: '100%',
                                maxWidth: '100%',
                                overflow: 'hidden'
                            }}>
                                <SettingsPanel />
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;