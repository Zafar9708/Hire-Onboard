import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const emailTemplatesList = [
  { label: "Default Template", value: "default" },
  { label: "First Round Invite", value: "firstRound" },
  { label: "Technical Interview", value: "technical" },
  { label: "HR Discussion", value: "hr" },
  { label: "Manager Round", value: "manager" },
];

const EmailTemplateTab = ({ interviewType, username, jobTitle, loggedInUsername }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState("default");
  const [subject, setSubject] = useState(
    `${interviewType === "online" ? "Online" : "Offline"} Interview - ${username}, ${jobTitle} | ${loggedInUsername}`
  );
  const [body, setBody] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handlePreview = () => {
    setPreviewOpen(true);
  };

  const handleSend = () => {
    // Here you can add send logic
    setPreviewOpen(false);
    alert("Email sent!");
  };

  return (
    <Box mt={2}>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="Email Template" />
        <Tab label="Note for Interview Panel" />
      </Tabs>

      {activeTab === 0 && (
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>Email Template</Typography>
          <TextField
            select
            label="Select Template"
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            fullWidth
            margin="normal"
          >
            {emailTemplatesList.map((template) => (
              <MenuItem key={template.value} value={template.value}>
                {template.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Subject"
            fullWidth
            margin="normal"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <Typography variant="subtitle1" mt={2} mb={1}>Body</Typography>
          <ReactQuill
            value={body}
            onChange={setBody}
            theme="snow"
            style={{ height: "200px", marginBottom: "16px" }}
          />

          <Box display="flex" gap={2} mt={2}>
            <Button variant="outlined">Cancel</Button>
            <Button variant="contained" color="primary" onClick={handlePreview}>
              Preview Email
            </Button>
          </Box>

          {/* Preview Dialog */}
          <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="md" fullWidth>
            <DialogTitle>Email Preview</DialogTitle>
            <DialogContent dividers>
              <Typography variant="subtitle2" gutterBottom><strong>Subject:</strong> {subject}</Typography>
              <Typography dangerouslySetInnerHTML={{ __html: body }} />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setPreviewOpen(false)}>Close</Button>
              <Button variant="contained" onClick={handleSend}>Send</Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}

      {activeTab === 1 && (
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>Note for Interview Panel</Typography>
          <TextField
            label="Write your note here"
            multiline
            rows={6}
            fullWidth
            margin="normal"
          />
        </Box>
      )}
    </Box>
  );
};

export default EmailTemplateTab;
