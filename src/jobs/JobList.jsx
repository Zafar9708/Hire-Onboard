

import React, { useEffect, useState } from "react";
import { 
  Typography, 
  IconButton, 
  Card, 
  CardContent, 
  Chip,
  Box,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from "@mui/material";
import {
  Star as StarIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  CalendarToday as CalendarTodayIcon,
  Work as WorkIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  AccessTime as TimeIcon,
  Group as GroupIcon
} from "@mui/icons-material";
import { parseISO, format } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import JobFilters from "./JobFilters"; 
import api from "../utils/api";


const JobList = ({ showPriority, view }) => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/jobs');
        setJobs(response.data.jobs); // ✅ this sets jobs state
        setLoading(false);           // ✅ stop showing loader
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
        setLoading(false); // Still stop loader even on error
      }
    };
    
    fetchJobs();
    
  }, []);

  useEffect(() => {
    let result = jobs;
    
    // Apply priority filter if needed
    if (showPriority) {
      result = result.filter(job => job.jobFormId?.markPriority);
    }
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(job => 
        (job.jobTitle && job.jobTitle.toLowerCase().includes(term)) ||
        (job.jobFormId?.location && job.jobFormId.location.toLowerCase().includes(term)) ||
        (job.department && job.department.toLowerCase().includes(term))
      );
    }
    
    // Apply other filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter(job => {
          switch (key) {
            case 'status':
              const targetDate = job.jobFormId?.targetHireDate ? parseISO(job.jobFormId.targetHireDate) : null;
              const isExpired = targetDate && new Date() > targetDate;
              return value === 'active' ? !isExpired : isExpired;
            case 'businessUnit':
              return job.businessUnit === value;
            case 'department':
              return job.department === value;
            case 'hiringManager':
              return job.hiringManager === value;
            case 'recruiter':
              return job.recruiter === value;
            case 'location':
              return job.jobFormId?.location === value;
            default:
              return true;
          }
        });
      }
    });
    
    setFilteredJobs(result);
  }, [jobs, showPriority, searchTerm, filters]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (filteredJobs.length === 0) {
    return (
      <>
        <JobFilters onSearch={handleSearch} onFilterChange={handleFilterChange} />
        <Box display="flex" justifyContent="center" mt={4}>
          <Typography variant="h6">No jobs match your criteria</Typography>
        </Box>
      </>
    );
  }

  const activeJobsCount = jobs.filter(job => {
    const targetDate = job.jobFormId?.targetHireDate ? parseISO(job.jobFormId.targetHireDate) : null;
    return !(targetDate && new Date() > targetDate);
  }).length;

  if (view === "table") {
    return (
      <>
        <JobFilters onSearch={handleSearch} onFilterChange={handleFilterChange} />
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Job Title</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Openings</TableCell>
                <TableCell>Target Hire Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredJobs.map((job) => {
                const jobForm = job.jobFormId || {};
                const targetDate = jobForm.targetHireDate ? parseISO(jobForm.targetHireDate) : null;
                const isExpired = targetDate && new Date() > targetDate;
                return (
                  <TableRow 
                    key={job._id} 
                    hover 
                    onClick={() => navigate(`/jobs/${job._id}`)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{job.jobTitle}</TableCell>
                    <TableCell>{job.department}</TableCell>
                    <TableCell>{jobForm.location || "Remote"}</TableCell>
                    <TableCell>{jobForm.openings || 0}</TableCell>
                    <TableCell>
                      {targetDate ? format(targetDate, 'MMM dd, yyyy') : "Not set"}
                    </TableCell>
                    <TableCell>
                      {isExpired ? (
                        <Chip label="Expired" color="error" size="small" />
                      ) : (
                        <Chip label="Active" color="success" size="small" />
                      )}
                    </TableCell>
                    <TableCell>
                      {jobForm.markPriority ? (
                        <StarIcon color="primary" />
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }

  return (
    <>
      {/* <JobFilters onSearch={handleSearch} onFilterChange={handleFilterChange} /> */}
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        gap: 3,
        p: 3
      }}>
        {filteredJobs.map((job) => {
          const jobForm = job.jobFormId || {};
          const postedDate = parseISO(job.createdAt);
          const targetDate = jobForm.targetHireDate ? parseISO(jobForm.targetHireDate) : null;
          const isExpired = targetDate && new Date() > targetDate;
          const isArchived = isExpired;

          return (
            <Card 
            key={job._id}
            onClick={() => navigate(`/jobs/${job._id}`)}
            sx={{ 
              cursor: 'pointer',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderLeft: jobForm.markPriority ? '4px solid #FFD700' : 'none',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 6px 12px rgba(0,0,0,0.1)'
              },
              ...(isArchived ? {
                border: '1px solid #f44336',
                opacity: 0.9,
                backgroundColor: 'rgba(244, 67, 54, 0.05)'
              } : {})
            }}
          >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" fontWeight="bold" noWrap>
                    {job.jobTitle}
                  </Typography>
                  {jobForm.markPriority && (
                    <IconButton size="small" color="primary" sx={{ p: 0 }}>
                      <StarIcon />
                    </IconButton>
                  )}
                </Box>

                <Box display="flex" alignItems="center" mb={2} gap={1}>
                  <WorkIcon color="action" fontSize="small" />
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {job.department}
                  </Typography>
                  <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                  <LocationIcon color="action" fontSize="small" />
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {jobForm.location || "Remote"}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1} mb={2} flexWrap="wrap" useFlexGap>
                  <Chip 
                    icon={<GroupIcon fontSize="small" />}
                    label={`${jobForm.openings || 0} openings`}
                    size="small"
                    variant="outlined"
                    sx={{ borderRadius: 1 }}
                  />
                  <Chip 
                    icon={<MoneyIcon fontSize="small" />}
                    label={`${jobForm.currency || 'USD'} ${jobForm.amount || '0'}`}
                    size="small"
                    variant="outlined"
                    sx={{ borderRadius: 1 }}
                  />
                  <Chip 
                    icon={<TimeIcon fontSize="small" />}
                    label={jobForm.jobType || 'Full-time'}
                    size="small"
                    variant="outlined"
                    sx={{ borderRadius: 1 }}
                  />
                </Stack>

                <Divider sx={{ my: 1.5 }} />

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box display="flex" alignItems="center" gap={1}>
                    <CalendarTodayIcon color="action" fontSize="small" />
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Target Hire Date
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {targetDate ? format(targetDate, 'MMM dd, yyyy') : "Not set"}
                      </Typography>
                    </Box>
                  </Box>
                  {isExpired && (
                    <Chip 
                      label="Expired"
                      size="small"
                      color="error"
                      variant="outlined"
                      sx={{ borderRadius: 1 }}
                    />
                  )}
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                  <Typography variant="caption" color="text.secondary">
                    Posted: {format(postedDate, 'MMM dd, yyyy')}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    {isArchived ? (
                      <Chip 
                        label="Archived" 
                        size="small" 
                        color="error" 
                        sx={{ borderRadius: 1 }}
                      />
                    ) : (
                      <>
                        <CheckCircleIcon color="success" fontSize="small" />
                        <Typography variant="caption" color="text.secondary">
                          Active
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>

                <Box display="flex" justifyContent="flex-start" alignItems="center" mt={2}>
                  <PersonIcon fontSize="small" />
                  <Typography variant="body2" color="text.secondary" ml={1}>
                    New Candidates
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </>
  );
};

export default JobList;


