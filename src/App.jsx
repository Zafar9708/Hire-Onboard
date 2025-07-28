
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import JobCreationPage from './jobs/JobCreationPage';
import JobList from './jobs/JobList';
import JobDetail from './jobs/JobDetail';
import CandidatesTab from './jobs/CandidatesTab';
import CandidateDetailsPage from './candidates/CandidateDetailsDialog';
import CandidateStagesView from './candidates/CandidateStagesView';
import Reports from './SidebarMenu/Reports';
import Notifications from './SidebarMenu/Notifications';
import MenuDashboard from './SidebarMenu/Dashboard';
import Settings from './SidebarMenu/Settings';
import Help from './SidebarMenu/Help';
import Users from './SidebarMenu/Users';
import FeedbackPage from './SidebarMenu/Feedback';
import TotalInterviews from './Interviews/TotalInterviews';
import UpcomingInterviews from './Interviews/UpcomingInterviews';
import Profile from './components/Profile';
import ProfileSettings from './components/Settings';
import Home from './components/Home';
import VendorLogin from './components/VendorLogin';
import Dashboardlayout from './layout/DashboardLayout';
import JobCard from './jobs/JobCard';
import Task from './components/Task';
import JobsPage from './jobs/JobsPage';
import RejectedCadnidates from './jobs/RejectedCandidates';
import Layout from './components/Layout';
import ScheduleOnlineInterviewForm from './Interviews/ScheduleOnlineInterviewForm';
import FeedbackForm from './components/FeedbackForm';
import ResumeAnalysisPage from './pages/ResumeAnalysisPage';
// import JobCandidates from './jobs/JobCandidates';
// import JobForm from './jobs/JobForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';




const queryClient = new QueryClient();
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
          },
        },
      },
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/jobs/:id/*" element={<JobDetail />} /> */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/dashboard1" element={<Dashboard />} />
          <Route path="/create-job" element={<JobCreationPage />} />
          <Route path="/candidates" element={<CandidatesTab />} />
          <Route path="/candidates/:id" element={<Layout />} />
          {/* <Route path="/jobs/:jobId/candidates" element={<JobCandidates />} /> */}

          <Route path="/candidates/stage/:stage" element={<CandidateStagesView />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/menudashboard" element={<MenuDashboard/>} />
          <Route path="/settings" element={<Settings/>} />
          <Route path="/help" element={<Help/>} />
          <Route path="/feedback" element={<FeedbackPage/>} />
          <Route path="/users" element={<Users/>} />
          <Route path="/interviews/all" element={<TotalInterviews />} />
          <Route path="/interviews/upcoming" element={<UpcomingInterviews />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profilesettings" element={<ProfileSettings />} />
          <Route path="/vendor-login" element={<VendorLogin />} />
          <Route path="/dashboard/allJobs" element={<JobsPage />} />
          <Route path="/rejected-candidates" element={<RejectedCadnidates />} />
          <Route path="/candidates-details" element={<Layout />} />
          <Route path="/interviews/schedule" element={<ScheduleOnlineInterviewForm />} />
          <Route path="/jobs/update/:id" element={<JobCreationPage />} />
          <Route path="/feedback/:interviewId/:interviewerId" element={<FeedbackForm />} />
          <Route path="/resumes/:resumeId" element={<ResumeAnalysisPage/>} />

          


           {/*  Protected Routes for Users */}
  {/* <Route element={<ProtectedRoute allowedRoles={['candidate']} />}> */}
    <Route
      path="/dashboard"
      element={<Dashboardlayout/>}
    >
      <Route path="" element={<MenuDashboard />} />
      <Route path="jobs" element={<JobCard />} />
      <Route path="jobs/:id/*" element={<JobDetail />} />
      <Route path="jobs/createJob" element={<JobCreationPage />} />
      <Route path="candidates" element={<CandidatesTab />} />
      <Route path="candidates/:id" element={<CandidateDetailsPage />} />
      <Route path="interviews" element={<TotalInterviews />} />
      {/* <Route path="users" element={<Users />} /> */}
      <Route path="tasks" element={<Task />} />
      <Route path="settings" element={<Settings/>} />
      <Route path="reports" element={<Reports />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="help" element={<Help/>} />
      <Route path="feedback" element={<FeedbackPage/>} />
      {/* <Route path="documents" element={<DocumentsSection />} />
      <Route path="profile" element={<Profile />} />
      <Route path="profile/edit" element={<EditProfileForm />} /> */}
    </Route>
  {/* </Route> */}

     


        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
