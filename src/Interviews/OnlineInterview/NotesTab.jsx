import React from "react";
import { TextField, Box, Typography } from "@mui/material";

const NotesTab = ({ note, setNote }) => {
  return (
    <Box p={2}>
      <Typography variant="subtitle1" gutterBottom>
        Notes for Interview Panel
      </Typography>
      <TextField
        label="Write notes here..."
        multiline
        rows={6}
        fullWidth
        variant="outlined"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
    </Box>
  );
};

export default NotesTab;
