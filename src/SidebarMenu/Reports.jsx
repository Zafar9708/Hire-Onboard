import React, { useState } from 'react';
import { 
    Box, 
    Typography, 
    Paper, 
    Grid, 
    Card, 
    CardContent, 
    Divider,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    ToggleButton,
    ToggleButtonGroup,
    IconButton,
    Tooltip
} from '@mui/material';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip as RechartsTooltip, 
    Legend, 
    ResponsiveContainer, 
    PieChart, 
    Pie, 
    Cell,
    LineChart,
    Line,
    AreaChart,
    Area
} from 'recharts';
import {
    BarChart as BarChartIcon,
    PieChart as PieChartIcon,
    ShowChart as LineChartIcon,
    AreaChart as AreaChartIcon,
    TableChart as TableIcon,
    Refresh as RefreshIcon
} from '@mui/icons-material';

const Reports = () => {
    // Sample data for the charts
    const jobStatusData = [
        { name: 'Open', value: 35 },
        { name: 'In Progress', value: 25 },
        { name: 'Closed', value: 20 },
        { name: 'On Hold', value: 15 },
        { name: 'Cancelled', value: 5 },
    ];

    const candidateStatusData = [
        { name: 'Sourced', candidates: 120 },
        { name: 'Screening', candidates: 80 },
        { name: 'Interview', candidates: 45 },
        { name: 'Offer', candidates: 15 },
        { name: 'Hired', candidates: 10 },
    ];

    const hiringTrendData = [
        { month: 'Jan', hires: 5 },
        { month: 'Feb', hires: 8 },
        { month: 'Mar', hires: 12 },
        { month: 'Apr', hires: 7 },
        { month: 'May', hires: 15 },
        { month: 'Jun', hires: 10 },
    ];

    const candidateSourcesData = [
        { name: 'LinkedIn', candidates: 85 },
        { name: 'Job Boards', candidates: 65 },
        { name: 'Referrals', candidates: 45 },
        { name: 'Career Site', candidates: 30 },
        { name: 'Agencies', candidates: 15 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    const [timeRange, setTimeRange] = useState('last6months');
    const [chartViews, setChartViews] = useState({
        jobStatus: 'pie',
        candidateStatus: 'bar',
        hiringTrend: 'bar',
        candidateSources: 'bar'
    });

    const handleTimeRangeChange = (event) => {
        setTimeRange(event.target.value);
    };

    const handleChartViewChange = (chartName, newView) => {
        setChartViews(prev => ({
            ...prev,
            [chartName]: newView
        }));
    };

    const renderJobStatusChart = () => {
        switch(chartViews.jobStatus) {
            case 'pie':
                return (
                    <PieChart>
                        <Pie
                            data={jobStatusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                            {jobStatusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <RechartsTooltip />
                        <Legend />
                    </PieChart>
                );
            case 'bar':
                return (
                    <BarChart data={jobStatusData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                );
            case 'table':
                return (
                    <Box sx={{ height: '100%', overflow: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f5f5f5' }}>
                                    <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Status</th>
                                    <th style={{ padding: '8px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobStatusData.map((item, index) => (
                                    <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                                        <td style={{ padding: '8px', textAlign: 'left' }}>{item.name}</td>
                                        <td style={{ padding: '8px', textAlign: 'right' }}>{item.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Box>
                );
            default:
                return null;
        }
    };

    const renderCandidateStatusChart = () => {
        switch(chartViews.candidateStatus) {
            case 'bar':
                return (
                    <BarChart data={candidateStatusData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip />
                        <Legend />
                        <Bar dataKey="candidates" fill="#8884d8" />
                    </BarChart>
                );
            case 'line':
                return (
                    <LineChart data={candidateStatusData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip />
                        <Legend />
                        <Line type="monotone" dataKey="candidates" stroke="#8884d8" />
                    </LineChart>
                );
            case 'area':
                return (
                    <AreaChart data={candidateStatusData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip />
                        <Legend />
                        <Area type="monotone" dataKey="candidates" fill="#8884d8" stroke="#8884d8" />
                    </AreaChart>
                );
            case 'table':
                return (
                    <Box sx={{ height: '100%', overflow: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f5f5f5' }}>
                                    <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Stage</th>
                                    <th style={{ padding: '8px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>Candidates</th>
                                </tr>
                            </thead>
                            <tbody>
                                {candidateStatusData.map((item, index) => (
                                    <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                                        <td style={{ padding: '8px', textAlign: 'left' }}>{item.name}</td>
                                        <td style={{ padding: '8px', textAlign: 'right' }}>{item.candidates}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Box>
                );
            default:
                return null;
        }
    };

    const renderHiringTrendChart = () => {
        switch(chartViews.hiringTrend) {
            case 'bar':
                return (
                    <BarChart data={hiringTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <RechartsTooltip />
                        <Legend />
                        <Bar dataKey="hires" fill="#82ca9d" />
                    </BarChart>
                );
            case 'line':
                return (
                    <LineChart data={hiringTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <RechartsTooltip />
                        <Legend />
                        <Line type="monotone" dataKey="hires" stroke="#82ca9d" />
                    </LineChart>
                );
            case 'area':
                return (
                    <AreaChart data={hiringTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <RechartsTooltip />
                        <Legend />
                        <Area type="monotone" dataKey="hires" fill="#82ca9d" stroke="#82ca9d" />
                    </AreaChart>
                );
            case 'table':
                return (
                    <Box sx={{ height: '100%', overflow: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f5f5f5' }}>
                                    <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Month</th>
                                    <th style={{ padding: '8px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>Hires</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hiringTrendData.map((item, index) => (
                                    <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                                        <td style={{ padding: '8px', textAlign: 'left' }}>{item.month}</td>
                                        <td style={{ padding: '8px', textAlign: 'right' }}>{item.hires}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Box>
                );
            default:
                return null;
        }
    };

    const renderCandidateSourcesChart = () => {
        switch(chartViews.candidateSources) {
            case 'bar':
                return (
                    <BarChart data={candidateSourcesData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <RechartsTooltip />
                        <Legend />
                        <Bar dataKey="candidates" fill="#ffc658" />
                    </BarChart>
                );
            case 'pie':
                return (
                    <PieChart>
                        <Pie
                            data={candidateSourcesData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={120}
                            fill="#ffc658"
                            dataKey="candidates"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                            {candidateSourcesData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <RechartsTooltip />
                        <Legend />
                    </PieChart>
                );
            case 'table':
                return (
                    <Box sx={{ height: '100%', overflow: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f5f5f5' }}>
                                    <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Source</th>
                                    <th style={{ padding: '8px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>Candidates</th>
                                </tr>
                            </thead>
                            <tbody>
                                {candidateSourcesData.map((item, index) => (
                                    <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                                        <td style={{ padding: '8px', textAlign: 'left' }}>{item.name}</td>
                                        <td style={{ padding: '8px', textAlign: 'right' }}>{item.candidates}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Box sx={{ p: 3, ml: '192px' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Recruitment Analytics Dashboard
            </Typography>

            {/* Time Range Selector */}
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Time Range</InputLabel>
                    <Select
                        value={timeRange}
                        label="Time Range"
                        onChange={handleTimeRangeChange}
                    >
                        <MenuItem value="lastmonth">Last Month</MenuItem>
                        <MenuItem value="last3months">Last 3 Months</MenuItem>
                        <MenuItem value="last6months">Last 6 Months</MenuItem>
                        <MenuItem value="lastyear">Last Year</MenuItem>
                    </Select>
                </FormControl>
                <Tooltip title="Refresh Data">
                    <IconButton color="primary">
                        <RefreshIcon />
                    </IconButton>
                </Tooltip>
            </Box>

            <Grid container spacing={3}>
                {/* Job Status Chart */}
                <Grid item xs={12} md={6}>
                    <Card elevation={3}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Job Status Distribution
                                </Typography>
                                <ToggleButtonGroup
                                    value={chartViews.jobStatus}
                                    exclusive
                                    onChange={(e, newView) => handleChartViewChange('jobStatus', newView)}
                                    size="small"
                                >
                                    <ToggleButton value="pie" aria-label="pie chart">
                                        <Tooltip title="Pie Chart">
                                            <PieChartIcon fontSize="small" />
                                        </Tooltip>
                                    </ToggleButton>
                                    <ToggleButton value="bar" aria-label="bar chart">
                                        <Tooltip title="Bar Chart">
                                            <BarChartIcon fontSize="small" />
                                        </Tooltip>
                                    </ToggleButton>
                                    <ToggleButton value="table" aria-label="table view">
                                        <Tooltip title="Table View">
                                            <TableIcon fontSize="small" />
                                        </Tooltip>
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            <Box sx={{ height: 400 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    {renderJobStatusChart()}
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Candidate Status Chart */}
                <Grid item xs={12} md={6}>
                    <Card elevation={3}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Candidate Pipeline
                                </Typography>
                                <ToggleButtonGroup
                                    value={chartViews.candidateStatus}
                                    exclusive
                                    onChange={(e, newView) => handleChartViewChange('candidateStatus', newView)}
                                    size="small"
                                >
                                    <ToggleButton value="bar" aria-label="bar chart">
                                        <Tooltip title="Bar Chart">
                                            <BarChartIcon fontSize="small" />
                                        </Tooltip>
                                    </ToggleButton>
                                    <ToggleButton value="line" aria-label="line chart">
                                        <Tooltip title="Line Chart">
                                            <LineChartIcon fontSize="small" />
                                        </Tooltip>
                                    </ToggleButton>
                                    <ToggleButton value="area" aria-label="area chart">
                                        <Tooltip title="Area Chart">
                                            <AreaChartIcon fontSize="small" />
                                        </Tooltip>
                                    </ToggleButton>
                                    <ToggleButton value="table" aria-label="table view">
                                        <Tooltip title="Table View">
                                            <TableIcon fontSize="small" />
                                        </Tooltip>
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            <Box sx={{ height: 400 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    {renderCandidateStatusChart()}
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Hiring Trends Chart */}
                <Grid item xs={12}>
                    <Card elevation={3}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Hiring Trends ({timeRange.replace('last', 'Last ')})
                                </Typography>
                                <ToggleButtonGroup
                                    value={chartViews.hiringTrend}
                                    exclusive
                                    onChange={(e, newView) => handleChartViewChange('hiringTrend', newView)}
                                    size="small"
                                >
                                    <ToggleButton value="bar" aria-label="bar chart">
                                        <Tooltip title="Bar Chart">
                                            <BarChartIcon fontSize="small" />
                                        </Tooltip>
                                    </ToggleButton>
                                    <ToggleButton value="line" aria-label="line chart">
                                        <Tooltip title="Line Chart">
                                            <LineChartIcon fontSize="small" />
                                        </Tooltip>
                                    </ToggleButton>
                                    <ToggleButton value="area" aria-label="area chart">
                                        <Tooltip title="Area Chart">
                                            <AreaChartIcon fontSize="small" />
                                        </Tooltip>
                                    </ToggleButton>
                                    <ToggleButton value="table" aria-label="table view">
                                        <Tooltip title="Table View">
                                            <TableIcon fontSize="small" />
                                        </Tooltip>
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            <Box sx={{ height: 400 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    {renderHiringTrendChart()}
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Key Metrics */}
                <Grid item xs={12} md={4}>
                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Key Metrics
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
                                    <Typography variant="body1">Open Positions</Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>35</Typography>
                                </Paper>
                                <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
                                    <Typography variant="body1">Candidates in Pipeline</Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>270</Typography>
                                </Paper>
                                <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
                                    <Typography variant="body1">Average Time to Hire</Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>24 days</Typography>
                                </Paper>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Candidate Sources Chart */}
                <Grid item xs={12} md={8}>
                    <Card elevation={3}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Candidate Sources
                                </Typography>
                                <ToggleButtonGroup
                                    value={chartViews.candidateSources}
                                    exclusive
                                    onChange={(e, newView) => handleChartViewChange('candidateSources', newView)}
                                    size="small"
                                >
                                    <ToggleButton value="bar" aria-label="bar chart">
                                        <Tooltip title="Bar Chart">
                                            <BarChartIcon fontSize="small" />
                                        </Tooltip>
                                    </ToggleButton>
                                    <ToggleButton value="pie" aria-label="pie chart">
                                        <Tooltip title="Pie Chart">
                                            <PieChartIcon fontSize="small" />
                                        </Tooltip>
                                    </ToggleButton>
                                    <ToggleButton value="table" aria-label="table view">
                                        <Tooltip title="Table View">
                                            <TableIcon fontSize="small" />
                                        </Tooltip>
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            <Box sx={{ height: 300 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    {renderCandidateSourcesChart()}
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Reports;