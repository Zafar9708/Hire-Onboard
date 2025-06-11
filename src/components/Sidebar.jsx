

import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import WorkIcon from '@mui/icons-material/Work';
import FeedbackIcon from '@mui/icons-material/Feedback';
import TaskIcon from '@mui/icons-material/Task';
import TodaykIcon from '@mui/icons-material/Today';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {

    const [activeIndex, setActiveIndex] = useState(0)
    const navigate = useNavigate();
    const loacation = useLocation();

    const handleNavigation = (path,index) => {
        setActiveIndex(index)
        navigate(path);
    };

    return (
        <Box
            className="fixed top-0 left-0 bg-gray-800 text-white w-48 h-screen"
            sx={{
                zIndex: 1200,
                marginTop: '0px',
                boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
                overflow: 'hidden', // Prevent scrolling
                display: 'flex',
                flexDirection: 'column',
                py: 2,
                px: 2,
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'violet',
                    mt:0.5,
                    mb: 3,
                    fontSize: '1.30rem'
                }}
            >
                Hire & Onboard
            </Typography>
            <Box sx={{
                display: 'flex',
                overflowY: 'auto',
                scrollbarWidth: 'none', // For Firefox
                '&::-webkit-scrollbar': {
                    display: 'none', // For Chrome, Safari, and Opera
                }, flexDirection: 'column', gap: 2
            }}>
                {[
                    { icon: <DashboardIcon />, text: 'Dashboard', path: '/dashboard' },
                    { icon: <WorkIcon />, text: 'JOBS', path: '/dashboard/jobs' },
                    { icon: <GroupIcon />, text: 'Candidates', path: '/dashboard/candidates' },
                    // { icon: <GroupIcon />, text: 'Users', path: '/dashboard/users' },
                    { icon: <TodaykIcon />, text: 'Interviews', path: '/dashboard/interviews' },
                    { icon: <NotificationsIcon />, text: 'Notifications', path: '/dashboard/notifications' },
                    { icon: <BarChartIcon />, text: 'Reports', path: '/dashboard/reports' },
                    { icon: <TaskIcon />, text: 'Tasks', path: '/dashboard/tasks' },
                    { icon: <SettingsIcon />, text: 'Settings', path: '/dashboard/settings' },
                    { icon: <HelpIcon />, text: 'Help', path: '/dashboard/help' },
                    { icon: <FeedbackIcon />, text: 'Feedback', path: '/dashboard/feedback' }
                ].map((item, index) => {
                    const isActive = location.pathname === item.path || (index !== 0 && location.pathname.startsWith(item.path));
                    return (
                    <Button
                        key={index}
                        onClick={() => handleNavigation(item.path,index)}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            color: isActive ? 'primary.contrastText' : 'white', // Change text color based on active state
                            backgroundColor: isActive? 'primary.main' : 'transparent',
                            py: 1.5,
                            '&:hover': {
                                backgroundColor: 'primary.light',
                            }
                        }}
                        disableRipple
                    >
                        {item.icon}
                        <Typography variant="caption" sx={{ mt: 0.5 }}>
                            {item.text}
                        </Typography>
                    </Button>
                )})}
            </Box>
        </Box>
    );
};

export default Sidebar;