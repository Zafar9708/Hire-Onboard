

import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                    { icon: <DashboardIcon />, text: 'Dashboard', path: '/dashboard' },
                    { icon: <GroupIcon />, text: 'JOBS', path: '/dashboard/alljobs' },
                    { icon: <GroupIcon />, text: 'Candidates', path: '/dashboard/candidate' },
                    // { icon: <GroupIcon />, text: 'Users', path: '/dashboard/users' },
                    { icon: <SettingsIcon />, text: 'Tasks', path: '/dashboard/tasks' },
                    { icon: <BarChartIcon />, text: 'Reports', path: '/dashboard/reports' },
                    { icon: <NotificationsIcon />, text: 'Notifications', path: '/dashboard/notifications' },
                    { icon: <HelpIcon />, text: 'Help', path: '/dashboard/help' },
                    { icon: <FeedbackIcon />, text: 'Feedback', path: '/dashboard/feedback' }
                ].map((item, index) => (
                    <Button
                        key={index}
                        onClick={() => handleNavigation(item.path)}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            color: 'white',
                            py: 1.5,
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            }
                        }}
                        disableRipple
                    >
                        {item.icon}
                        <Typography variant="caption" sx={{ mt: 0.5 }}>
                            {item.text}
                        </Typography>
                    </Button>
                ))}
            </Box>
        </Box>
    );
};

export default Sidebar;