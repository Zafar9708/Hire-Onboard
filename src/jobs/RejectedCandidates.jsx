import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Tabs,
  Tab,
  TextField,
  IconButton,
  Button,
  Grid,
  Paper,
  Divider
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  ArrowBack as BackIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  CalendarToday as DateIcon,
  ThumbDown as RejectIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const RejectedCandidates = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState('');

  const rejectedCandidates = [
    {
      id: 1,
      name: 'R1 Rejected',
      position: 'Frontend Developer',
      rejectedAt: '2023-05-15',
      rejectedBy: 'Ashsis Diwedi (Tech Lead)',
      reason: 'Technical skills not meeting requirements',
      stage: 'Technical Round',
      experience: '3 years',
      skills: ['React', 'JavaScript', 'CSS'],
      avatar: 'R1',
      type: 'R1'
    },
    {
      id: 2,
      name: 'R2 Rejected',
      position: 'Backend Engineer',
      rejectedAt: '2023-06-02',
      rejectedBy: 'Ankit Yadav (Senior Engineer)',
      reason: 'Lack of system design knowledge',
      stage: 'System Design Round',
      experience: '5 years',
      skills: ['Node.js', 'MongoDB', 'AWS'],
      avatar: 'R2',
      type: 'R2'
    },
    {
      id: 3,
      name: 'Client Rejected',
      position: 'UX Designer',
      rejectedAt: '2023-06-10',
      rejectedBy: 'Client Feedback',
      reason: 'Portfolio not matching client expectations',
      stage: 'Client Review',
      experience: '4 years',
      skills: ['Figma', 'UI/UX', 'Prototyping'],
      avatar: 'CR',
      type: 'Client'
    },
    {
      id: 4,
      name: 'HR Rejected',
      position: 'Product Manager',
      rejectedAt: '2023-06-18',
      rejectedBy: 'HR Team',
      reason: 'Cultural fit concerns',
      stage: 'HR Round',
      experience: '6 years',
      skills: ['Agile', 'Scrum', 'Product Strategy'],
      avatar: 'HR',
      type: 'HR'
    },
    {
      id: 5,
      name: 'R2 Rejected',
      position: 'DevOps Engineer',
      rejectedAt: '2023-06-22',
      rejectedBy: 'Recruiter',
      reason: 'Salary expectations mismatch',
      stage: 'Initial Screening',
      experience: '4 years',
      skills: ['Docker', 'Kubernetes', 'CI/CD'],
      avatar: 'SR',
      type: 'R2'
    },
    {
      id: 6,
      name: 'R1 Rejected',
      position: 'Mobile Developer',
      rejectedAt: '2023-06-25',
      rejectedBy: 'Tech Lead',
      reason: 'Poor problem solving skills',
      stage: 'Technical Round',
      experience: '2 years',
      skills: ['React Native', 'iOS', 'Android'],
      avatar: 'MD',
      type: 'R1'
    }
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredCandidates = rejectedCandidates.filter(candidate => {
    let tabFilter = true;
    switch (tabValue) {
      case 1: tabFilter = candidate.type === 'R1'; break;
      case 2: tabFilter = candidate.type === 'R2'; break;
      case 3: tabFilter = candidate.type === 'Client'; break;
      case 4: tabFilter = candidate.type === 'HR'; break;
      default: tabFilter = true;
    }

    const searchFilter =
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.stage.toLowerCase().includes(searchQuery.toLowerCase());

    return tabFilter && searchFilter;
  });

  const getRejectionColor = (type) => {
    switch (type) {
      case 'R1': return '#1976d2';
      case 'R2': return '#2196f3';
      case 'Client': return '#00bcd4';
      case 'HR': return '#607d8b';
      default: return '#1976d2';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 2, color: 'primary.main' }}>
          <BackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Rejected Candidates
        </Typography>
        <Chip label={`${filteredCandidates.length} rejected`} sx={{
          ml: 2,
          fontWeight: 'bold',
          fontSize: '0.875rem',
          height: '28px',
          backgroundColor: '#e3f2fd',
          color: '#1976d2'
        }} />
      </Box>

      {/* Search Bar */}
      <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextField
            placeholder="Search rejected candidates..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
              sx: { borderRadius: 2 }
            }}
            sx={{ width: '400px' }}
          />
          <Box>
            <Button variant="outlined" startIcon={<FilterIcon />} sx={{ mr: 2 }}>Filters</Button>
            <Button variant="outlined" startIcon={<RefreshIcon />}>Refresh</Button>
          </Box>
        </Box>
      </Paper>

      {/* Tabs */}
      <Paper elevation={1} sx={{ mb: 3, borderRadius: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto"
          sx={{
            '& .MuiTabs-indicator': {
              height: 4,
              backgroundColor: '#1976d2',
              borderRadius: '4px 4px 0 0'
            }
          }}>
          <Tab label="All Rejected" />
          <Tab label="R1 Rejects" />
          <Tab label="R2 Rejects" />
          <Tab label="Client Rejects" />
          <Tab label="HR Rejects" />
        </Tabs>
      </Paper>

      {/* Grid of Equal Height Cards */}
      <Grid container spacing={3}>
        {filteredCandidates.map(candidate => (
          <Grid item xs={12} sm={6} md={4} key={candidate.id} sx={{ display: 'flex' }}>
            <Card sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '100%',
              height: '100%',
              borderRadius: 3,
              boxShadow: 3,
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6
              }
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{
                    bgcolor: getRejectionColor(candidate.type),
                    width: 48,
                    height: 48,
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    mr: 2,
                    color: 'white'
                  }}>
                    {candidate.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{candidate.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{candidate.position}</Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <WorkIcon sx={{ mr: 1, fontSize: '1rem' }} />
                    <Typography variant="body2"><strong>Stage:</strong> {candidate.stage}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PersonIcon sx={{ mr: 1, fontSize: '1rem' }} />
                    <Typography variant="body2"><strong>Experience:</strong> {candidate.experience}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <DateIcon sx={{ mr: 1, fontSize: '1rem' }} />
                    <Typography variant="body2"><strong>Rejected on:</strong> {candidate.rejectedAt}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                    <RejectIcon sx={{ mr: 1, fontSize: '1rem', mt: 0.5 }} />
                    <Typography variant="body2"><strong>Reason:</strong> {candidate.reason}</Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>Skills:</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {candidate.skills.map((skill, index) => (
                      <Chip key={index} label={skill} size="small" sx={{
                        borderRadius: 1,
                        fontSize: '0.7rem',
                        backgroundColor: '#e3f2fd',
                        color: '#1976d2'
                      }} />
                    ))}
                  </Box>
                </Box>
              </CardContent>

              <Box sx={{ p: 2 }}>
                <Button fullWidth variant="contained" sx={{
                  borderRadius: 2,
                  fontWeight: 600,
                  py: 1,
                  textTransform: 'none',
                  backgroundColor: '#1976d2',
                  '&:hover': { backgroundColor: '#1565c0' }
                }}>
                  View Details
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Empty state */}
      {filteredCandidates.length === 0 && (
        <Paper elevation={0} sx={{
          textAlign: 'center',
          py: 8,
          borderRadius: 3,
          backgroundColor: '#f5f5f5',
          mt: 3
        }}>
          <RejectIcon sx={{ fontSize: 60, color: '#90caf9', mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: '#1976d2' }}>
            No rejected candidates found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {searchQuery ? 'Try a different search term' : 'Try adjusting your filters'}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default RejectedCandidates;
