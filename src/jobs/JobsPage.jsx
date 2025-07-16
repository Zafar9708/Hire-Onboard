

import React, { useState, useEffect } from "react";
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
  CircularProgress,
  Switch,
  Button,
  Menu,
  MenuItem,
  Grid,
  FormControl,
  InputLabel,
  Select,
  InputBase,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,


} from "@mui/material";
import {
  Star as StarIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  CheckCircle as CheckCircleIcon,
  CalendarToday as CalendarTodayIcon,
  Work as WorkIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  AccessTime as TimeIcon,
  Group as GroupIcon,
  ViewModule as ViewModuleIcon,
  TableRows as TableRowsIcon,
  ArrowDropDown as ArrowDropDownIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  Archive as ArchiveIcon,
  Close as CloseIcon,
  FileUpload as FileUploadIcon,
  ContentCopy as ContentCopyIcon,

} from "@mui/icons-material";
import { parseISO, format } from "date-fns";
import { useNavigate } from "react-router-dom";
import api, { fetchAlljobs, getAllUsers } from "../utils/api";

const statusOptions = {
  'Active': ['Closed Own', 'Closed Lost', 'On Hold', 'Archived'],
  'On Hold': ['Active', 'Closed Own', 'Closed Lost', 'Archived'],
  'Closed Own': ['Active', 'On Hold', 'Closed Lost', 'Archived'],
  'Closed Lost': ['Active', 'On Hold', 'Closed Own', 'Archived'],
  'Archived': ['Active'],
  'Default': ['Active', 'Closed Own', 'Closed Lost', 'On Hold', 'Archived']
};

const departmentOptions = ["Developer", "Tester", "QA", "UI/UX", "DevOps", "Support"];
const locationOptions = ["Mumbai", "Gurgaon", "Delhi", "Bengaluru", "Pune"];
const businessUnitOptions = ["Internal", "External"];

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [archivedJobs, setArchivedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("card");
  const [showPriority, setShowPriority] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [statusMenuAnchorEl, setStatusMenuAnchorEl] = useState(null);
  const [currentJobId, setCurrentJobId] = useState(null);
  const [showArchived, setShowArchived] = useState(false);
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);
  const [jobToArchive, setJobToArchive] = useState(null);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [recruiters, setRecruiters] = useState([]);
  const [salesPersons, setSalesPersons] = useState([]);
  const [statusChangeDialog, setStatusChangeDialog] = useState({
    open: false,
    newStatus: '',
    reason: '',
    jobId: null
  });
  const navigate = useNavigate();

  const formatJobNumber = (index) => {
    const number = index + 1;
    return `WR${number.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const jobsResponse = await fetchAlljobs();
        const allJobs = jobsResponse.jobs;

        const jobsWithNumbers = allJobs.map((job, index) => ({
          ...job,
          formattedJobNumber: formatJobNumber(index)
        }));

        const activeJobs = jobsWithNumbers.filter(job => job.status !== 'Archived');
        const archived = jobsWithNumbers.filter(job => job.status === 'Archived');

        setJobs(activeJobs);
        setArchivedJobs(archived);

        const usersResponse = await getAllUsers();
        const allUsers = usersResponse.users;

        const jobRecruiters = allJobs.flatMap(job =>
          Array.isArray(job.jobFormId?.recruitingPerson) ?
            job.jobFormId.recruitingPerson :
            job.jobFormId?.recruitingPerson ? [job.jobFormId.recruitingPerson] : []
        ).filter(Boolean);

        const jobSalesPersons = allJobs.map(job =>
          job.jobFormId?.salesPerson
        ).filter(Boolean);

        const uniqueRecruiters = [...new Set([
          ...jobRecruiters,
          ...allUsers.filter(user => user.role === 'recruiter').map(user => user.username)
        ])];

        const uniqueSalesPersons = [...new Set([
          ...jobSalesPersons,
          ...allUsers.filter(user => user.role === 'sales').map(user => user.username)
        ])];

        setRecruiters(uniqueRecruiters);
        setSalesPersons(uniqueSalesPersons);

        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtersConfig = [
    { label: "Status", id: "status", options: ["Active", "On Hold", "Closed Own", "Closed Lost"] },
    { label: "Business Unit", id: "businessUnit", options: businessUnitOptions },
    { label: "Department", id: "department", options: departmentOptions },
    { label: "Recruiter", id: "recruiter", options: recruiters },
    { label: "Location", id: "location", options: locationOptions },
  ];

  useEffect(() => {
    const jobsToFilter = showArchived ? archivedJobs : jobs;
    let result = jobsToFilter;

    if (showPriority && !showArchived) {
      result = result.filter(job => job.jobFormId?.markPriority);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(job => {
        // Safely get all searchable fields with fallbacks
        const jobTitle = job.jobTitle || '';
        const jobNumber = job.formattedJobNumber || '';
        const location = (job.jobFormId?.location || '').toString();
        const department = job.department || '';
        const client = (job.jobFormId?.Client || '').toString();
        const salesPerson = (job.jobFormId?.salesPerson || '').toString();
        
        // Handle recruitingPerson which could be an array or string
        let recruitingPersons = [];
        if (Array.isArray(job.jobFormId?.recruitingPerson)) {
          recruitingPersons = job.jobFormId.recruitingPerson.map(p => p?.toString() || '');
        } else if (job.jobFormId?.recruitingPerson) {
          recruitingPersons = [job.jobFormId.recruitingPerson.toString()];
        }
    
        return (
          jobTitle.toLowerCase().includes(term) ||
          jobNumber.toLowerCase().includes(term) ||
          location.toLowerCase().includes(term) ||
          department.toLowerCase().includes(term) ||
          client.toLowerCase().includes(term) ||
          salesPerson.toLowerCase().includes(term) ||
          recruitingPersons.some(r => r.toLowerCase().includes(term))
        );
      });
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter(job => {
          switch (key) {
            case 'status':
              const targetDate = job.jobFormId?.targetHireDate ? parseISO(job.jobFormId.targetHireDate) : null;
              const isExpired = targetDate && new Date() > targetDate;
              if (value === 'Active') {
                return (job.status === 'Active' || !job.status) && !isExpired;
              } else if (value === 'Closed Lost') {
                return job.status === 'Closed Lost' || isExpired;
              }
              return job.status === value;
            case 'businessUnit':
              return job.jobFormId?.BusinessUnit === value.toLowerCase();
            case 'department':
              return job.department === value;
            case 'recruiter':
              const jobRecruiters = Array.isArray(job.jobFormId?.recruitingPerson) ?
                job.jobFormId.recruitingPerson :
                job.jobFormId?.recruitingPerson ? [job.jobFormId.recruitingPerson] : [];
              return jobRecruiters.includes(value);
            case 'salesPerson':
              return job.jobFormId?.salesPerson === value;
            case 'location':
              return job.jobFormId?.location === value;
            default:
              return true;
          }
        });
      }
    });

    setFilteredJobs(result);
  }, [jobs, archivedJobs, showArchived, showPriority, searchTerm, filters]);

  const activeJobsCount = jobs.filter(job => {
    const targetDate = job.jobFormId?.targetHireDate ? parseISO(job.jobFormId.targetHireDate) : null;
    const isExpired = targetDate && new Date() > targetDate;
    return (job.status === 'Active' || !job.status) && !isExpired;
  }).length;

  const handleCreateJobClick = () => {
    navigate("/dashboard/jobs/createJob");
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filterId, value) => {
    setFilters(prev => ({
      ...prev,
      [filterId]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters({});
    setSearchTerm("");
  };

  const handleStatusMenuClick = (event, jobId) => {
    event.stopPropagation();
    setStatusMenuAnchorEl(event.currentTarget);
    setCurrentJobId(jobId);
  };

  const handleStatusMenuClose = () => {
    setStatusMenuAnchorEl(null);
    setCurrentJobId(null);
  };

  const handleArchiveClick = (event, jobId) => {
    event.stopPropagation();
    setJobToArchive(jobId);
    setShowArchiveDialog(true);
  };

  const handleArchiveDialogClose = () => {
    setShowArchiveDialog(false);
    setJobToArchive(null);
  };

  const updateJobStatus = async (jobId, newStatus, reason) => {
    try {
      await api.patch(`/jobs/${jobId}/status`, {
        status: newStatus,
        statusReason: reason
      });

      if (newStatus === 'Archived') {
        const jobToArchive = jobs.find(job => job._id === jobId);
        if (jobToArchive) {
          setJobs(jobs.filter(job => job._id !== jobId));
          setArchivedJobs([...archivedJobs, { ...jobToArchive, status: 'Archived' }]);
        } else {
          setArchivedJobs(archivedJobs.map(job =>
            job._id === jobId ? { ...job, status: newStatus } : job
          ));
        }
      } else {
        setJobs(jobs.map(job =>
          job._id === jobId ? { ...job, status: newStatus } : job
        ));

        if (archivedJobs.some(job => job._id === jobId)) {
          const jobToActivate = archivedJobs.find(job => job._id === jobId);
          setArchivedJobs(archivedJobs.filter(job => job._id !== jobId));
          setJobs([...jobs, { ...jobToActivate, status: newStatus }]);
        }
      }

      setSnackbar({ open: true, message: `Job status updated to ${newStatus}`, severity: "success" });
    } catch (error) {
      console.error('Failed to update job status:', error);
      setSnackbar({ open: true, message: 'Failed to update job status', severity: "error" });
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (['Closed Own', 'Closed Lost', 'On Hold', 'Archived'].includes(newStatus)) {
      setStatusChangeDialog({
        open: true,
        newStatus,
        reason: '',
        jobId: currentJobId
      });
      handleStatusMenuClose();
      return;
    }

    await updateJobStatus(currentJobId, newStatus, '');
  };

  const handleStatusChangeDialogClose = () => {
    setStatusChangeDialog({
      open: false,
      newStatus: '',
      reason: '',
      jobId: null
    });
  };

  const handleStatusReasonSubmit = async () => {
    await updateJobStatus(
      statusChangeDialog.jobId,
      statusChangeDialog.newStatus,
      statusChangeDialog.reason
    );
    handleStatusChangeDialogClose();
  };

  const handleArchiveConfirm = async () => {
    try {
      await api.patch(`/jobs/${jobToArchive}`, { status: 'Archived' });

      const jobToMove = jobs.find(job => job._id === jobToArchive);
      setJobs(jobs.filter(job => job._id !== jobToArchive));
      setArchivedJobs([...archivedJobs, { ...jobToMove, status: 'Archived' }]);

      setShowArchiveDialog(false);
      setJobToArchive(null);
      setSnackbar({ open: true, message: 'Job archived successfully', severity: "success" });
    } catch (error) {
      console.error('Failed to archive job:', error);
      setSnackbar({ open: true, message: 'Failed to archive job', severity: "error" });
    }
  };

  const handleShowArchived = () => {
    setShowArchived(!showArchived);
    setFilters({});
    setSearchTerm("");
  };

  const handleImportClick = () => {
    setShowImportDialog(true);
    handleMenuClose();
  };

  const handleImportDialogClose = () => {
    setShowImportDialog(false);
    setImportFile(null);
  };

  const handleFileChange = (e) => {
    setImportFile(e.target.files[0]);
  };

  const handleImportSubmit = async () => {
    if (!importFile) {
      setSnackbar({ open: true, message: 'Please select a file to import', severity: "error" });
      return;
    }

    const formData = new FormData();
    formData.append('file', importFile);

    try {
      setLoading(true);
      const response = await api.post('/jobs/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const allJobs = response.data.jobs;
      const jobsWithNumbers = allJobs.map((job, index) => ({
        ...job,
        formattedJobNumber: formatJobNumber(index)
      }));

      const activeJobs = jobsWithNumbers.filter(job => job.status !== 'Archived');
      const archived = jobsWithNumbers.filter(job => job.status === 'Archived');

      setJobs(activeJobs);
      setArchivedJobs(archived);

      setShowImportDialog(false);
      setImportFile(null);
      setSnackbar({ open: true, message: 'Jobs imported successfully', severity: "success" });
    } catch (error) {
      console.error('Failed to import jobs:', error);
      setSnackbar({ open: true, message: 'Failed to import jobs', severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDuplicateJob = async () => {
    handleMenuClose();

    if (!currentJobId) {
      setSnackbar({ open: true, message: 'No job selected for duplication', severity: "error" });
      return;
    }

    try {
      setLoading(true);
      const response = await api.post(`/jobs/duplicate/${currentJobId}`);

      const duplicatedJob = {
        ...response.data.job,
        formattedJobNumber: formatJobNumber(jobs.length)
      };

      setJobs([duplicatedJob, ...jobs]);
      setSnackbar({ open: true, message: 'Job duplicated successfully', severity: "success" });
    } catch (error) {
      console.error('Failed to duplicate job:', error);
      setSnackbar({ open: true, message: 'Failed to duplicate job', severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'success';
      case 'On Hold': return 'warning';
      case 'Closed Own': return 'primary';
      case 'Closed Lost': return 'error';
      case 'Archived': return 'default';
      default: return 'default';
    }
  };

  const getAvailableStatusChanges = (currentStatus) => {
    return statusOptions[currentStatus] || statusOptions['Default'];
  };

  const getJobStatus = (job) => {
    const targetDate = job.jobFormId?.targetHireDate ? parseISO(job.jobFormId.targetHireDate) : null;
    const isExpired = targetDate && new Date() > targetDate;

    if (job.status) {
      return job.status;
    }
    return isExpired ? 'Closed Lost' : 'Active';
  };

  const handleJobCardClick = (jobId) => {
    navigate(`/dashboard/jobs/${jobId}`);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 1 }}>
      <Dialog open={showArchiveDialog} onClose={handleArchiveDialogClose}>
        <DialogTitle>Archive Job</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to archive this job?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleArchiveDialogClose}>Cancel</Button>
          <Button onClick={handleArchiveConfirm} color="primary" variant="contained">
            Archive
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={statusChangeDialog.open} onClose={handleStatusChangeDialogClose}>
        <DialogTitle>Change Status to {statusChangeDialog.newStatus}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={`Reason for ${statusChangeDialog.newStatus}`}
            fullWidth
            multiline
            rows={4}
            value={statusChangeDialog.reason}
            onChange={(e) => setStatusChangeDialog(prev => ({
              ...prev,
              reason: e.target.value
            }))}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStatusChangeDialogClose}>Cancel</Button>
          <Button
            onClick={handleStatusReasonSubmit}
            color="primary"
            variant="contained"
            disabled={!statusChangeDialog.reason.trim()}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showImportDialog} onClose={handleImportDialogClose}>
        <DialogTitle>Import Jobs</DialogTitle>
        <DialogContent>
          <Box sx={{ minWidth: 400, p: 2 }}>
            <Typography variant="body1" gutterBottom>
              Upload a CSV file containing job data. The file should include columns for:
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              jobTitle, jobName, department, location, BusinessUnit, Client, openings, targetHireDate, etc.
            </Typography>
            <input
              accept=".csv"
              style={{ display: 'none' }}
              id="import-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="import-file">
              <Button
                variant="outlined"
                component="span"
                startIcon={<FileUploadIcon />}
                fullWidth
                sx={{ mb: 2 }}
              >
                Select CSV File
              </Button>
            </label>
            {importFile && (
              <Typography variant="body2">
                Selected file: {importFile.name}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleImportDialogClose}>Cancel</Button>
          <Button
            onClick={handleImportSubmit}
            color="primary"
            variant="contained"
            disabled={!importFile}
          >
            Import
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Header Section */}
      <Paper elevation={0} sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        p: 2,
        mb: 2
      }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            {showArchived ? 'Archived Jobs' : `Active Jobs (${activeJobsCount})`}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {showArchived ? 'Viewing archived jobs' : 'Here you can find all the jobs of this organisation.'}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
          {!showArchived && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Switch
                checked={showPriority}
                onChange={(e) => setShowPriority(e.target.checked)}
                color="primary"
              />
              <Typography variant="body2">Priority Only</Typography>
            </Box>
          )}

          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              onClick={() => setView("card")}
              color={view === "card" ? "primary" : "default"}
              size="small"
            >
              <ViewModuleIcon />
            </IconButton>
            <IconButton
              onClick={() => setView("table")}
              color={view === "table" ? "primary" : "default"}
              size="small"
            >
              <TableRowsIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              variant={showArchived ? "outlined" : "contained"}
              color="primary"
              onClick={handleShowArchived}
              size="small"
              startIcon={<ArchiveIcon />}
            >
              {showArchived ? 'Back to Active' : 'View Archived'}
            </Button>

            {!showArchived && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreateJobClick}
                  size="small"
                  sx={{
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    height: '36px'
                  }}
                >
                  Create Job
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleMenuClick}
                  size="small"
                  sx={{
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    minWidth: '36px',
                    height: '36px',
                  }}
                >
                  <ArrowDropDownIcon fontSize="small" />
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleImportClick}>
                    <FileUploadIcon fontSize="small" sx={{ mr: 1 }} />
                    Import Jobs
                  </MenuItem>
                  <MenuItem onClick={handleDuplicateJob}>
                    <ContentCopyIcon fontSize="small" sx={{ mr: 1 }} />
                    Duplicate Job
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>On Hold</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Closed Own</MenuItem>
                  <MenuItem onClick={() => {
                    handleMenuClose();
                    setShowArchived(true);
                  }}>
                    <ArchiveIcon fontSize="small" sx={{ mr: 1 }} />
                    Archived
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Box>
      </Paper>

      {!showArchived && (
        <Paper sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            {filtersConfig.map((filter) => (
              <Grid item xs={6} sm={4} md={2} key={filter.id}>
                <FormControl fullWidth size="small" sx={{ minWidth: 195 }}>
                  <InputLabel>{filter.label}</InputLabel>
                  <Select
                    value={filters[filter.id] || ""}
                    onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                    label={filter.label}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {filter.options.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            ))}
            <Grid item xs={6} sm={4} md={2}>
              <Button
                variant="outlined"
                onClick={handleResetFilters}
                fullWidth
                size="small"
                sx={{ height: '40px' }}
                disabled={Object.keys(filters).length === 0 && !searchTerm}
              >
                Reset Filters
              </Button>
            </Grid>
          </Grid>

          {/* Search Input Section */}
          <Box sx={{ mt: 2, display: 'flex', maxWidth: '100%' }}>
            <InputBase
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={`Search ${showArchived ? 'archived' : ''} jobs by title, job name, location, department or client...`}
              sx={{
                p: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
              }}
              startAdornment={
                <IconButton size="small" sx={{ mr: 1 }}>
                  <FilterListIcon fontSize="small" />
                </IconButton>
              }
            />
          </Box>
        </Paper>
      )}

      {/* Job List Section */}
      {filteredJobs.length === 0 ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <Typography variant="h6">
            {showArchived ? 'No archived jobs found' : 'No jobs match your criteria'}
          </Typography>
        </Box>
      ) : view === "table" ? (
        <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 'none', border: '1px solid #eee' }}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Job ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Job Title</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Department</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Business Unit</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Client</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Openings</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Hire Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Recruiting Member</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Priority</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredJobs.map((job, index) => {
                const jobForm = job.jobFormId || {};
                const targetDate = jobForm.targetHireDate ? parseISO(jobForm.targetHireDate) : null;
                const status = getJobStatus(job);
                const availableStatusChanges = getAvailableStatusChanges(status);

                return (
                  <TableRow
                    key={job._id}
                    hover
                    onClick={() => handleJobCardClick(job._id)}
                    sx={{
                      cursor: 'pointer',
                      '&:nth-of-type(even)': { backgroundColor: '#fafafa' }
                    }}
                  >
                    <TableCell sx={{ fontWeight: 500 }}>{job.formattedJobNumber}</TableCell>
                    <TableCell>{job.jobTitle}</TableCell>
                    <TableCell>{job.department}</TableCell>
                    <TableCell>{jobForm.location || "Remote"}</TableCell>
                    <TableCell>{jobForm.BusinessUnit ? jobForm.BusinessUnit.charAt(0).toUpperCase() + jobForm.BusinessUnit.slice(1) : "-"}</TableCell>
                    <TableCell>{jobForm.Client ? `Client: ${jobForm.Client}` : "-"}</TableCell>
                    <TableCell align="center">{jobForm.openings || 0}</TableCell>
                    <TableCell>
                      {targetDate ? format(targetDate, 'MMM dd') : "-"}
                    </TableCell>
                    <TableCell>
                      {Array.isArray(jobForm.recruitingPerson) ?
                        jobForm.recruitingPerson.join(', ') :
                        jobForm.recruitingPerson || "-"}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={status}
                        size="small"
                        color={getStatusColor(status)}
                        variant="outlined"
                        sx={{ borderRadius: 1 }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {jobForm.markPriority ? (
                        <StarIcon color="primary" fontSize="small" />
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentJobId(job._id);
                          handleStatusMenuClick(e, job._id);
                        }}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                      <Menu
                        anchorEl={statusMenuAnchorEl}
                        open={Boolean(statusMenuAnchorEl && currentJobId === job._id)}
                        onClose={handleStatusMenuClose}
                      >
                        <Typography variant="subtitle2" sx={{ px: 2, py: 1 }}>
                          Change {status} to:
                        </Typography>
                        {availableStatusChanges.map(status => (
                          <MenuItem
                            key={status}
                            onClick={() => handleStatusChange(status)}
                            sx={{ minWidth: 150 }}
                          >
                            <CheckCircleIcon
                              color={getStatusColor(status)}
                              sx={{ mr: 1, fontSize: '1rem' }}
                            />
                            {status}
                          </MenuItem>
                        ))}
                      </Menu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 3,
          p: 1
        }}>
          {filteredJobs.map((job) => {
            const jobForm = job.jobFormId || {};
            const postedDate = parseISO(job.createdAt);
            const targetDate = jobForm.targetHireDate ? parseISO(jobForm.targetHireDate) : null;
            const status = getJobStatus(job);
            const availableStatusChanges = getAvailableStatusChanges(status);

            return (
              <Card
                key={job._id}
                onClick={() => handleJobCardClick(job._id)}
                sx={{
                  cursor: 'pointer',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderLeft: jobForm.markPriority ? '4px solid #FFD700' : 'none',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Box>
                      <Typography variant="subtitle2" color="primary" fontWeight="bold">
                        {job.formattedJobNumber}
                      </Typography>
                      <Typography variant="subtitle1" fontWeight="bold" noWrap>
                        {job.jobTitle}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      {jobForm.markPriority && (
                        <StarIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
                      )}
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusMenuClick(e, job._id);
                        }}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="center" mb={1} gap={1}>
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

                  <Stack direction="row" spacing={1} mb={1} flexWrap="wrap" useFlexGap>
                    <Chip
                      icon={<GroupIcon fontSize="small" />}
                      label={`${jobForm.openings || 0} openings`}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      icon={<MoneyIcon fontSize="small" />}
                      label={`${jobForm.currency || 'USD'} ${jobForm.amount || '0'}`}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      icon={<TimeIcon fontSize="small" />}
                      label={jobForm.jobType || 'Full-time'}
                      size="small"
                      variant="outlined"
                    />
                  </Stack>

                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center" gap={1}>
                      <CalendarTodayIcon color="action" fontSize="small" />
                      <Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            fontWeight: 'bold',
                            paddingX: 1,
                            borderRadius: 1,
                            display: 'inline-block'
                          }}
                        >
                          Hire Date: {targetDate ? format(targetDate, 'MMM dd') : "Not set"}
                        </Typography>

                      </Box>
                    </Box>
                    <Chip
                      label={status}
                      size="small"
                      color={getStatusColor(status)}
                      variant="outlined"
                    />
                  </Box>

                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <PersonIcon color="action" fontSize="small" />
                      <Typography variant="caption"
                        color="text.secondary"
                        sx={{
                          fontWeight: 'bold',
                          paddingX: 1,
                          borderRadius: 1,
                          display: 'inline-block'
                        }}>
                        Recruiter: {Array.isArray(jobForm.recruitingPerson) ?
                          jobForm.recruitingPerson.join(', ') :
                          jobForm.recruitingPerson || "Not assigned"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                    <Box display="flex" flexDirection="column" alignItems="flex-end">
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <BusinessIcon fontSize="small" color="action" />
                        <Typography variant="caption"
                        color="text.secondary"
                        sx={{
                          fontWeight: 'bold',
                          paddingX: 1,
                          borderRadius: 1,
                          display: 'inline-block'
                        }}>
                          Unit: {jobForm.BusinessUnit === 'external' ? 'External' : 'Internal'}
                        </Typography>
                      </Box>

                      {jobForm.BusinessUnit === 'external' && jobForm.Client && (
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <PersonIcon fontSize="small" color="action" />
                          <Typography variant="caption" fontWeight={600} >
                            Client: {jobForm.Client}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>

                </CardContent>

                <Menu
                  anchorEl={statusMenuAnchorEl}
                  open={Boolean(statusMenuAnchorEl && currentJobId === job._id)}
                  onClose={handleStatusMenuClose}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Typography variant="subtitle2" sx={{ px: 2, py: 1 }}>
                    Change {status} to:
                  </Typography>
                  {availableStatusChanges.map(status => (
                    <MenuItem
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      sx={{ minWidth: 150 }}
                    >
                      <CheckCircleIcon
                        color={getStatusColor(status)}
                        sx={{ mr: 1, fontSize: '1rem' }}
                      />
                      {status}
                    </MenuItem>
                  ))}
                </Menu>
              </Card>
            );
          })}
        </Box>
      )}
    </Container>
  );
};

export default JobsPage;