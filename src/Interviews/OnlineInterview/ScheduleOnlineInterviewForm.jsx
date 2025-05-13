import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Card
} from "@mui/material";
import InterviewerForm from "./InterviewerForm";
import InterviewDateTimePicker from "./InterviewDateTimePicker";
import MeetingPlatformSelector from "./MeetingPlatformSelector";
import InterviewTabs from "./InterviewTabs";
import PanelMembersSelector from "./PanelMembersSelector";

const ScheduleOnlineInterviewForm = ({ open, onClose, candidate, user }) => {
    const [interviewers, setInterviewers] = useState([
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
        { id: 3, name: "Mike Johnson", email: "mike@example.com" },
        { id: 4, name: "Sarah Williams", email: "sarah@example.com" },
        { id: 5, name: "David Brown", email: "david@example.com" }
    ]);
    const [selectedInterviewers, setSelectedInterviewers] = useState([]);
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [duration, setDuration] = useState("30");
    const [timezone, setTimezone] = useState("UTC+05:30");
    const [platform, setPlatform] = useState("");
    const [tabValue, setTabValue] = useState(0);

    const handleAddInterviewer = (interviewer) => {
        const newInterviewer = {
            id: interviewers.length + 1,
            ...interviewer
        };
        setInterviewers([...interviewers, newInterviewer]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            candidateId: candidate._id,
            interviewers: selectedInterviewers,
            date,
            startTime,
            duration,
            timezone,
            platform,
            scheduledBy: user.email
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                Schedule Online Interview with {candidate.firstName} {candidate.lastName}
            </DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleSubmit}>
                    <PanelMembersSelector
                        interviewers={interviewers}
                        selectedInterviewers={selectedInterviewers}
                        setSelectedInterviewers={setSelectedInterviewers}
                    />

                    <InterviewerForm onAddInterviewer={handleAddInterviewer} />

                    <InterviewDateTimePicker
                        date={date}
                        setDate={setDate}
                        startTime={startTime}
                        setStartTime={setStartTime}
                        duration={duration}
                        setDuration={setDuration}
                        timezone={timezone}
                        setTimezone={setTimezone}
                    />

                    <MeetingPlatformSelector
                        platform={platform}
                        setPlatform={setPlatform}
                    />

                    <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Scorecard</Typography>
                    <Card variant="outlined" sx={{ p: 2, mb: 3 }}>
                        <Button variant="outlined">Configure Scorecard</Button>
                    </Card>

                    <InterviewTabs
                        tabValue={tabValue}
                        setTabValue={setTabValue}
                        candidate={candidate}
                        user={user}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">
                    Schedule Interview
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ScheduleOnlineInterviewForm;