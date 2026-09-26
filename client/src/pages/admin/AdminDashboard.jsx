import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  Users,
  Briefcase,
  GraduationCap,
  Building,
  FileCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import StatsCard from '../../components/StatsCard';
import StatusBadge from '../../components/StatusBadge';
import Loader from '../../components/Loader';
import { formatDate } from '../../utils/helpers';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await adminService.getStats();
        if (res.success) {
          setStats(res.stats);
        }
      } catch (err) {
        console.error('Admin stats error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <Loader message="Loading platform analytics..." />;
  }

  const {
    totalStudents = 0,
    totalRecruiters = 0,
    totalCompanies = 0,
    totalJobs = 0,
    totalInternships = 0,
    totalAllOpportunities = 0,
    totalApplications = 0,
    activeJobsCount = 0,
    closedJobsCount = 0,
    recentUsers = [],
    recentJobs = [],
  } = stats || {};

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-full">
            System Administration
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            Platform Overview & Analytics
          </h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Real-time analytics across students, campus recruiters, job postings, and applications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/users"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold border border-slate-700 transition"
          >
            Manage Users
          </Link>
          <Link
            to="/admin/jobs"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition shadow-md"
          >
            Moderate Jobs
          </Link>
        </div>
      </div>

      {/* 5 Stats Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatsCard
          title="Students"
          value={totalStudents}
          icon={GraduationCap}
          color="blue"
          subtitle="Registered Candidates"
        />
        <StatsCard
          title="Recruiters"
          value={totalRecruiters}
          icon={Building}
          color="indigo"
          subtitle="Employer Accounts"
        />
        <StatsCard
          title="Internships"
          value={totalInternships}
          icon={Briefcase}
          color="purple"
          subtitle="Active Training Roles"
        />
        <StatsCard
          title="Full-time Jobs"
          value={totalJobs}
          icon={CheckCircle2}
          color="emerald"
          subtitle="Fresher Openings"
        />
        <StatsCard
          title="Applications"
          value={totalApplications}
          icon={FileCheck}
          color="amber"
          subtitle="Platform Volume"
        />
      </div>

      {/* 2 Column Section: Recent Users & Recent Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Registrations */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Recent User Registrations</h2>
            <Link
              to="/admin/users"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentUsers.slice(0, 5).map((u) => (
              <div
                key={u._id}
                className="p-3 bg-slate-50/80 dark:bg-slate-800/60 rounded-2xl flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{u.name}</h4>
                  <p className="text-[11px] text-slate-400">{u.email}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      u.role === 'student'
                        ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                        : u.role === 'recruiter'
                        ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300'
                        : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                    }`}
                  >
                    {u.role}
                  </span>
                  <span className="block text-[10px] text-slate-400 mt-0.5">
                    {formatDate(u.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Posted Opportunities */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Recent Postings</h2>
            <Link
              to="/admin/jobs"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              Manage <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentJobs.slice(0, 5).map((j) => (
              <div
                key={j._id}
                className="p-3 bg-slate-50/80 dark:bg-slate-800/60 rounded-2xl flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{j.title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {j.companyId?.companyName || 'Company'} • {j.type}
                  </p>
                </div>
                <StatusBadge status={j.status} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
