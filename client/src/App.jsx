import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import Companies from './pages/Companies';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import ResumeBuilder from './pages/ResumeBuilder';
import InterviewPrep from './pages/InterviewPrep';
import SalaryInsights from './pages/SalaryInsights';
import CampusDrives from './pages/CampusDrives';
import TPOAnalytics from './pages/TPOAnalytics';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentProfile from './pages/student/StudentProfile';
import MyApplications from './pages/student/MyApplications';
import SavedJobs from './pages/student/SavedJobs';

// Recruiter Pages
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';
import PostJob from './pages/recruiter/PostJob';
import ManageJobs from './pages/recruiter/ManageJobs';
import JobApplications from './pages/recruiter/JobApplications';
import CompanyProfile from './pages/recruiter/CompanyProfile';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageJobsAdmin from './pages/admin/ManageJobsAdmin';
import AllApplicationsAdmin from './pages/admin/AllApplicationsAdmin';

// Route Protection
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Public Routes with Main Header & Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/about" element={<About />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
        <Route path="/interview-prep" element={<InterviewPrep />} />
        <Route path="/salary-insights" element={<SalaryInsights />} />
        <Route path="/campus-drives" element={<CampusDrives />} />
        <Route path="/tpo-analytics" element={<TPOAnalytics />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Student Protected Dashboard Routes */}
      <Route
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/applications" element={<MyApplications />} />
        <Route path="/student/saved-jobs" element={<SavedJobs />} />
      </Route>

      {/* Recruiter Protected Dashboard Routes */}
      <Route
        element={
          <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter/post-job" element={<PostJob />} />
        <Route path="/recruiter/manage-jobs" element={<ManageJobs />} />
        <Route path="/recruiter/jobs/:jobId/applications" element={<JobApplications />} />
        <Route path="/recruiter/company" element={<CompanyProfile />} />
      </Route>

      {/* Admin Protected Dashboard Routes */}
      <Route
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/jobs" element={<ManageJobsAdmin />} />
        <Route path="/admin/applications" element={<AllApplicationsAdmin />} />
      </Route>

      {/* 404 Catch-All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
