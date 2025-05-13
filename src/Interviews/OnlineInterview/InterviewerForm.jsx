import React, { useState } from "react";
import { Box, TextField, Button, Grid, IconButton } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

const InterviewerForm = ({ onAddInterviewer }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddInterviewer({ name, email, phone });
        setName("");
        setEmail("");
        setPhone("");
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        fullWidth
                        label="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Button type="submit" variant="contained" sx={{ height: '100%' }}>
                        <AddIcon />
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default InterviewerForm;