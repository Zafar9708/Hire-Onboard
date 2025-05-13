import React, { useState } from "react";
import { Box, Button, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material";

const InterviewDateTimePicker = ({ 
    date, 
    setDate, 
    startTime, 
    setStartTime, 
    duration, 
    setDuration, 
    timezone, 
    setTimezone 
}) => {
    const timezones = [
        "UTC-12:00", "UTC-11:00", "UTC-10:00", "UTC-09:00", "UTC-08:00", 
        "UTC-07:00", "UTC-06:00", "UTC-05:00", "UTC-04:00", "UTC-03:00", 
        "UTC-02:00", "UTC-01:00", "UTC±00:00", "UTC+01:00", "UTC+02:00", 
        "UTC+03:00", "UTC+04:00", "UTC+05:00", "UTC+05:30", "UTC+06:00", 
        "UTC+07:00", "UTC+08:00", "UTC+09:00", "UTC+10:00", "UTC+11:00", 
        "UTC+12:00"
    ];

    return (
        <>
            <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>Interview Date</Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button 
                    variant={date === new Date().toISOString().split('T')[0] ? "contained" : "outlined"}
                    onClick={() => setDate(new Date().toISOString().split('T')[0])}
                >
                    Today
                </Button>
                <Button 
                    variant={date === new Date(Date.now() + 86400000).toISOString().split('T')[0] ? "contained" : "outlined"}
                    onClick={() => setDate(new Date(Date.now() + 86400000).toISOString().split('T')[0])}
                >
                    Tomorrow
                </Button>
                <TextField
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ flexGrow: 1 }}
                />
            </Box>

            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Time & Duration</Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        type="time"
                        label="Start Time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth>
                        <InputLabel>Duration</InputLabel>
                        <Select
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            label="Duration"
                        >
                            <MenuItem value="30">30 minutes</MenuItem>
                            <MenuItem value="45">45 minutes</MenuItem>
                            <MenuItem value="60">1 hour</MenuItem>
                            <MenuItem value="90">1.5 hours</MenuItem>
                            <MenuItem value="120">2 hours</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <FormControl fullWidth>
                        <InputLabel>Timezone</InputLabel>
                        <Select
                            value={timezone}
                            onChange={(e) => setTimezone(e.target.value)}
                            label="Timezone"
                        >
                            {timezones.map(tz => (
                                <MenuItem key={tz} value={tz}>{tz}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </>
    );
};

export default InterviewDateTimePicker;