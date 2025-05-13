import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import EmailTemplateTab from "./EmailTemplatesTab";
import NotesTab from "./NotesTab";

const InterviewTabs = ({ tabValue, setTabValue, candidate, user }) => {
    return (
        <>
            <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
                <Tab label="Email Template" />
                <Tab label="Notes for Interview Panel" />
            </Tabs>
            <Box sx={{ pt: 2 }}>
                {tabValue === 0 && <EmailTemplateTab candidate={candidate} user={user} />}
                {tabValue === 1 && <NotesTab />}
            </Box>
        </>
    );
};

export default InterviewTabs;