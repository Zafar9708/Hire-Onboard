
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



const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs/:id/*" element={<JobDetail />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-job" element={<JobCreationPage />} />
          <Route path="/candidates" element={<CandidatesTab />} />
          <Route path="/candidates/:id" element={<CandidateDetailsPage />} />
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


        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
