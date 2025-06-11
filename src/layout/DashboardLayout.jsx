import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Outlet } from 'react-router-dom';
import Header from "../components/Header";

import { ArrowBack as BackIcon, } from "@mui/icons-material"


const MainLayout = ({ children }) => {
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
        <Box sx={{
            display: 'flex',
            minHeight: '100vh',
            overflow: 'hidden'
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
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    },
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none'
                }}
            >

                <Box sx={{
                    maxWidth: '100%',
                    width: '100%',
                    margin: '0 auto',
                    px: 2
                }}>
                    <Box sx={{ display: 'flex', paddingLeft: '10px', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Button startIcon={<BackIcon />} onClick={() => navigate(-1)} variant="outlined">
                            Back
                        </Button>
                    </Box>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default MainLayout;