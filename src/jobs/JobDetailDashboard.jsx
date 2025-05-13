import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Box, Typography, Card, CardContent, Divider, Button, TextField, Avatar, Stack, IconButton } from "@mui/material";
import { AccessTime as TimeIcon, HowToReg as OfferIcon, WorkOutline as PositionIcon, People as CandidateIcon, RateReview as ReviewIcon, Description as JobDescIcon, NoteAdd as NoteIcon, ChevronRight as ArrowIcon, Add as AddIcon, Close as CloseIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [showNoteForm, setShowNoteForm] = useState(false);
    const {id: jobId } = useParams(); // 👈 get the job ID from URL
    const [job, setJob] = useState(null);

    useEffect(() => {
        const fetchJobById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/jobs/byId/${jobId}`);
                console.log(response.data); 
                setJob(response.data.job);
            } catch (error) {
                console.error("Error fetching job:", error);
            }
        };

        if (jobId) {
            fetchJobById();
        }
    }, [jobId]);


    // Mock data - replace with real data
    const stats = {
        upcomingInterviews: 3,
        timeToHire: "15 days",
        targetHireDate: "2023-12-15",
        offerAcceptanceRate: "78%",
        offeredPositions: 12,
        openPositions: 18,
        pipeline: {
            sourced: 24,
            screening: 18,
            interviews: 12,
            preboarding: 6,
            hired: 15,
            archived: 9,
        },
        pendingReview: {
            sourced: 5,
            screening: 3,
            interviews: 2,
        },
    };



    const handleAddNote = () => {
        if (newNote.trim()) {
            setNotes([
                ...notes,
                {
                    id: Date.now(),
                    content: newNote,
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
            ]);
            setNewNote("");
            setShowNoteForm(false);
        }
    };

    const handleDeleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
                gap: 2,
                p: 0,
                height: "100vh",
                overflow: "hidden",
            }}
        >
            {/* Main Content - 70% width */}
            <Box sx={{ flex: { xs: 1, lg: 7 }, display: "flex", flexDirection: "column", gap: 2 }}>
                {/* Stats Cards - Compact Grid */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, 1fr)",
                            md: "repeat(4, 1fr)",
                        },
                        gap: 2,
                    }}
                >
                    {[
                        {
                            title: "Upcoming Interviews",
                            value: stats.upcomingInterviews,
                            icon: <TimeIcon color="primary" />
                        },
                        {
                            title: "Time to Hire",
                            value: stats.timeToHire,
                            subtitle: `Target: ${stats.targetHireDate}`,
                            icon: <TimeIcon color="primary" />
                        },
                        {
                            title: "Offer Acceptance Rate",
                            value: stats.offerAcceptanceRate,
                            icon: <OfferIcon color="primary" />
                        },
                        {
                            
                            title: "Offered/Open",
                            value: `${stats.offeredPositions}/${stats.openPositions}`,
                            icon: <PositionIcon color="primary" />
                        },
                    ].map((stat, index) => (
                        <Card key={index} sx={{ minHeight: 120 }}>
                            <CardContent sx={{ p: 2 }}>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    {stat.title}
                                </Typography>
                                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                    {stat.value}
                                </Typography>
                                {stat.subtitle && (
                                    <Typography variant="caption" color="text.secondary">
                                        {stat.subtitle}
                                    </Typography>
                                )}
                                <Box sx={{ position: 'absolute', right: 16, bottom: 16, opacity: 0.2 }}>
                                    {stat.icon}
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>

                {/* Candidate Pipeline */}
                <Card>
                    <CardContent sx={{ p: 2 }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 1,
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center", fontWeight: 600 }}>
                                <CandidateIcon sx={{ mr: 1, fontSize: 20 }} /> Candidate Pipeline
                            </Typography>
                            <Button size="small" endIcon={<ArrowIcon />}>View all</Button>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                textAlign: "center",
                                gap: 1,
                            }}
                        >
                            {Object.entries(stats.pipeline).map(([stage, count]) => (
                                <Box key={stage} sx={{ p: 1 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>{count}</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {stage.charAt(0).toUpperCase() + stage.slice(1)}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </CardContent>
                </Card>

                {/* Pending Review */}
                <Card>
                    <CardContent sx={{ p: 2 }}>
                        <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center", mb: 1, fontWeight: 600 }}>
                            <ReviewIcon sx={{ mr: 1, fontSize: 20 }} /> Pending Review
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                textAlign: "center",
                                gap: 1,
                            }}
                        >
                            {Object.entries(stats.pendingReview).map(([stage, count]) => (
                                <Box key={stage} sx={{ p: 1 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>{count}</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {stage.charAt(0).toUpperCase() + stage.slice(1)}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </CardContent>
                </Card>

                {/* Job Descriptions */}
                <Card
                    elevation={3}
                    sx={{
                        borderRadius: 3,
                        mb: 3,
                        backgroundColor: "#fafafa",
                    }}
                >
                    <CardContent sx={{ p: 3 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 2,
                                fontWeight: 600,
                                color: "#333",
                            }}
                        >
                            <JobDescIcon sx={{ mr: 1, fontSize: 22, color: "primary.main" }} />
                            Job Descriptions
                        </Typography>

                        {job && (
                            <Box sx={{ mb: 1 }}>
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        fontWeight: 700,
                                        color: "#2c3e50",
                                        mb: 0.5,
                                    }}
                                >JobTitle : {job.jobTitle}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    sx={{  fontWeight: 700, mb: 1 }}
                                >Depatment : {job.department} 
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        color: "#555",
                                        lineHeight: 1.6,
                                        mb: 1.5,
                                        fontWeight: 700, mb: 1
                                    }}
                                >Description : {job.jobDesc}
                                </Typography>
                                <Divider sx={{ mt: 1.5, borderColor: "#e0e0e0" }} />
                            </Box>
                        )}
                    </CardContent>
                </Card>

            </Box>

            {/* Notes Section - 30% width */}
            <Box
                sx={{
                    flex: { xs: 1, lg: 3 },
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    minWidth: 300,
                }}
            >
                <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 2,
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                <NoteIcon sx={{ mr: 1, fontSize: 20 }} /> My Notes
                            </Typography>
                            <IconButton
                                size="small"
                                color="primary"
                                onClick={() => setShowNoteForm(true)}
                                sx={{ border: '1px solid', borderColor: 'primary.main' }}
                            >
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </Box>

                        {showNoteForm && (
                            <Box sx={{ mb: 2, bgcolor: 'rgba(0, 0, 0, 0.02)', p: 2, borderRadius: 1 }}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={newNote}
                                    onChange={(e) => setNewNote(e.target.value)}
                                    placeholder="Write your note here..."
                                    variant="outlined"
                                    sx={{ mb: 1 }}
                                />
                                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                                    <Button
                                        size="small"
                                        startIcon={<CloseIcon />}
                                        onClick={() => setShowNoteForm(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        startIcon={<NoteIcon />}
                                        onClick={handleAddNote}
                                    >
                                        Save Note
                                    </Button>
                                </Box>
                            </Box>
                        )}

                        <Box sx={{ flex: 1, overflowY: 'auto', pr: 1 }}>
                            {notes.length > 0 ? (
                                <Stack spacing={2}>
                                    {notes.map((note) => (
                                        <Card key={note.id} variant="outlined" sx={{ p: 1.5 }}>
                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                {note.content}
                                            </Typography>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography variant="caption" color="text.secondary">
                                                    {note.date} • {note.time}
                                                </Typography>
                                                <IconButton
                                                    size="small"
                                                    color="error"
                                                    onClick={() => handleDeleteNote(note.id)}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </Card>
                                    ))}
                                </Stack>
                            ) : (
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%',
                                    textAlign: 'center',
                                    p: 3,
                                    color: 'text.secondary'
                                }}>
                                    <NoteIcon sx={{ fontSize: 40, mb: 1, opacity: 0.5 }} />
                                    <Typography variant="body2">
                                        No notes yet. Click the + button to add your first note!
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default Dashboard;

