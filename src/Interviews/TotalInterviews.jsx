import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  useTheme,
  Paper,
  Typography,
} from '@mui/material';
import OnlineInterviews from './TotalOnlineInterviews';
import OfflineInterviews from './TotalOfflineInterviews';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

const TotalInterviews = () => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        borderRadius: 2,
        p: 2,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
        Total Interviews
      </Typography>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        aria-label="interview types tabs"
        variant="fullWidth"
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: theme.palette.primary.main,
            height: 3,
          },
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 500,
          },
          '& .Mui-selected': {
            color: theme.palette.primary.main,
            fontWeight: 700,
          },
        }}
      >
        <Tab
          icon={<VideoCameraFrontIcon />}
          iconPosition="start"
          label="Online Interviews"
        />
        <Tab
          icon={<MeetingRoomIcon />}
          iconPosition="start"
          label="Offline Interviews"
        />
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {tabValue === 0 && <OnlineInterviews />}
        {tabValue === 1 && <OfflineInterviews />}
      </Box>
    </Paper>
  );
};

export default TotalInterviews;
