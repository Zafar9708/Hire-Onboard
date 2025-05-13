import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Box, Chip, Typography } from "@mui/material";

const PanelMembersSelector = ({ 
    interviewers, 
    selectedInterviewers, 
    setSelectedInterviewers 
}) => {
    return (
        <>
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Panel Members</Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Select Interviewers</InputLabel>
                <Select
                    multiple
                    value={selectedInterviewers}
                    onChange={(e) => setSelectedInterviewers(e.target.value)}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((id) => {
                                const interviewer = interviewers.find(i => i.id === id);
                                return <Chip key={id} label={interviewer?.name} />;
                            })}
                        </Box>
                    )}
                >
                    {interviewers.map((interviewer) => (
                        <MenuItem key={interviewer.id} value={interviewer.id}>
                            {interviewer.name} ({interviewer.email})
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
};

export default PanelMembersSelector;