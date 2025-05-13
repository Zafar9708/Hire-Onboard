import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material";

const MeetingPlatformSelector = ({ platform, setPlatform }) => {
    return (
        <>
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Meeting Platform (optional)</Typography>
            <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Select Platform</InputLabel>
                <Select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    label="Select Platform"
                >
                    <MenuItem value="google_meet">Google Meet</MenuItem>
                    <MenuItem value="zoom">Zoom</MenuItem>
                    <MenuItem value="microsoft_teams">Microsoft Teams</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </Select>
            </FormControl>
        </>
    );
};

export default MeetingPlatformSelector;