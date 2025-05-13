
// import React, { useEffect, useState } from "react";
// import { Box, Tabs, Tab, Button, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import JobCard from "../jobs/JobCard";

// const Dashboard = () => {
//     const navigate = useNavigate();

//     // States to store user details from localStorage
//     const [userName, setUserName] = useState(localStorage.getItem("user_name") || "Loading...");
//     const [userEmail, setUserEmail] = useState(localStorage.getItem("user_email") || "Loading...");
//     const [selectedTab, setSelectedTab] = useState(0);
//     const [subTab, setSubTab] = useState(0); // State for sub-tabs under HOME

//     useEffect(() => {
//         // Check if user is logged in, if not, redirect to login
//         if (!localStorage.getItem("access_token")) {
//             navigate("/login");
//         }
//     }, [navigate]);

//     // Extract initials from user name
//     const getInitials = (name) => {
//         const nameParts = name.split(" ");
//         const initials = nameParts.map(part => part[0].toUpperCase()).join("");
//         return initials;
//     };

//     // Handle tab change
//     const handleTabChange = (event, newValue) => {
//         setSelectedTab(newValue);
//     };

//     // Handle sub-tab change under HOME
//     const handleSubTabChange = (newValue) => {
//         setSubTab(newValue);
//     };

//     return (
//         <div className="flex min-h-screen">
//             {/* Sidebar */}
//             <Sidebar />

//             {/* Main Content */}
//             <Box className="flex-1 p-0 mr-2 bg-gray-100">
//                 {/* Header Section */}
//                 <Header userName={userName} getInitials={getInitials} />

//                 {/* Tabs for Navigation */}
//                 <Box className="mb-6">
//                     <Tabs value={selectedTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" className="shadow-md">
//                         <Tab label="HOME" />
//                         <Tab label="JOBS" />
//                         <Tab label="CANDIDATES" />
//                         <Tab label="PREONBOARDING" />
//                         <Tab label="REPORTS" />
//                         <Tab label="CAREERSITE" />
//                         <Tab label="APPS" />
//                         <Tab label="SETTINGS" />
//                     </Tabs>
//                 </Box>

//                 {/* Conditionally render content based on selected tab */}
//                 <Box className="p-4">
//                     {selectedTab === 0 && (
//                         <div>
//                             {/* HOME Tab Content */}
//                             <div className="flex space-x-4 mb-6">
//                                 {/* Sub-tabs under HOME */}
//                                 <Button
//                                     onClick={() => handleSubTabChange(0)}
//                                     className={`text-blue-500 ${subTab === 0 ? "font-bold" : ""}`}
//                                 >
//                                     Dashboard
//                                 </Button>
//                                 <Button
//                                     onClick={() => handleSubTabChange(1)}
//                                     className={`text-blue-500 ${subTab === 1 ? "font-bold" : ""}`}
//                                 >
//                                     Insights
//                                 </Button>
//                                 <Button
//                                     onClick={() => handleSubTabChange(2)}
//                                     className={`text-blue-500 ${subTab === 2 ? "font-bold" : ""}`}
//                                 >
//                                     Interviews
//                                 </Button>
//                                 <Button
//                                     onClick={() => handleSubTabChange(3)}
//                                     className={`text-blue-500 ${subTab === 3 ? "font-bold" : ""}`}
//                                 >
//                                     Product Updates
//                                 </Button>
//                             </div>

//                             {/* Content based on selected sub-tab under HOME */}
//                             {subTab === 0 && (
//                                 <div>
//                                     <Typography variant="h6" className="text-gray-800">Dashboard Content</Typography>
//                                     <Typography className="text-gray-600 mt-2">This is your dashboard where you can monitor various metrics and activities.</Typography>
//                                 </div>
//                             )}
//                             {/* Additional sub-tab content */}
//                         </div>
//                     )}

//                     {selectedTab === 1 && <JobCard />}
//                     {/* Add content for other tabs as needed */}
//                 </Box>
//             </Box>
//         </div>
//     );
// };

// export default Dashboard;


//-----------------------------

import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import JobCard from "../jobs/JobCard";

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
                                        <Typography variant="h6" sx={{ 
                                            color: 'text.primary',
                                            mb: 2
                                        }}>
                                            Dashboard Overview
                                        </Typography>
                                        <Typography>
                                            Your dashboard content goes here. All content will be properly aligned 
                                            within the container with consistent spacing and width.
                                        </Typography>
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
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;