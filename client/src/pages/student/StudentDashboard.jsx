import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Send,
  Bookmark,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileCheck,
  Building2,
  Calendar,
  Layers,
} from 'lucide-react';
import { studentService } from '../../services/studentService';
import { useAuth } from '../../context/AuthContext';
import StatsCard from '../../components/StatsCard';
import StatusBadge from '../../components/StatusBadge';
import JobCard from '../../components/JobCard';
import Loader from '../../components/Loader';
import { formatDate } from '../../utils/helpers';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const res = await studentService.getDashboard();
        if (res.success) {
          setDashboardData(res.dashboard);
        }
      } catch (err) {
        console.error('Error fetching student dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <Loader message="Loading student dashboard..." />;
  }

  const {
    profileCompletion = 70,
    totalApplications = 0,
    totalSavedJobs = 0,
    statusCounts = {},
    recentApplications = [],
    recommendedJobs = [],
    recentJobs = [],
  } = dashboardData || {};

  return (
    <div className="space-y-8">
      {/* 1. Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-blue-200 mb-3 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Student Placement Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {user?.name || 'Student'}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
              {user?.college ? `${user.course || 'Degree'} at ${user.college}` : 'Explore tailored opportunities, track submissions, and take your next step.'}
            </p>
          </div>

          {/* Profile Completion Bar */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 min-w-[240px]">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-blue-100">Profile Completion</span>
              <span className="font-bold text-white">{profileCompletion}%</span>
            </div>
            <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${profileCompletion}%` }}
              ></div>
            </div>
            {profileCompletion < 100 && (
              <Link
                to="/student/profile"
                className="inline-block text-[11px] text-amber-300 hover:underline font-semibold mt-2"
              >
                + Complete profile for higher recruiter visibility
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 2. Key Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatsCard
          title="Total Applications"
          value={totalApplications}
          icon={Send}
          color="blue"
          subtitle="Submitted across companies"
        />
        <StatsCard
          title="Shortlisted / Interview"
          value={(statusCounts.shortlisted || 0) + (statusCounts.interview || 0)}
          icon={CheckCircle2}
          color="emerald"
          subtitle="Active pipeline progress"
        />
        <StatsCard
          title="Under Review"
          value={statusCounts.underReview || 0}
          icon={Clock}
          color="amber"
          subtitle="Awaiting recruiter decision"
        />
        <StatsCard
          title="Saved Jobs"
          value={totalSavedJobs}
          icon={Bookmark}
          color="purple"
          subtitle="Bookmarked for later"
        />
      </div>

      {/* 3. Recent Applications Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Applications</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Live status updates from hiring teams</p>
          </div>
          <Link
            to="/student/applications"
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            View All Applications <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentApplications.length === 0 ? (
          <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-xs">
            You have not applied to any opportunities yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] uppercase font-bold text-slate-400 dark:text-slate-400 bg-slate-50/80 dark:bg-slate-800/80 border-y border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">Opportunity</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Applied Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {recentApplications.map((app) => (
                  <tr key={app._id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                      {app.jobId?.title || 'Job Listing'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-medium">
                      {app.jobId?.companyId?.companyName || 'Company'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">{formatDate(app.appliedAt)}</td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={app.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={`/jobs/${app.jobId?._id}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                      >
                        View Job
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 4. Recommended Opportunities Matching Student Skills */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recommended For You</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Matched with your skills & courses</p>
          </div>
          <Link
            to="/jobs"
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            Explore All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(recommendedJobs.length > 0 ? recommendedJobs : recentJobs).slice(0, 3).map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
