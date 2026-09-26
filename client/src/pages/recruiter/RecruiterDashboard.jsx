import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Users,
  PlusCircle,
  FileCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Eye,
  Building2,
  Calendar,
} from 'lucide-react';
import { recruiterService } from '../../services/adminService';
import StatsCard from '../../components/StatsCard';
import StatusBadge from '../../components/StatusBadge';
import Loader from '../../components/Loader';
import { formatDate } from '../../utils/helpers';

const RecruiterDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const res = await recruiterService.getDashboard();
        if (res.success) {
          setDashboard(res.dashboard);
        }
      } catch (err) {
        console.error('Error fetching recruiter dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <Loader message="Loading recruiter dashboard..." />;
  }

  const {
    company,
    totalJobs = 0,
    activeJobs = 0,
    closedJobs = 0,
    totalApplications = 0,
    recentApplications = [],
    recentJobs = [],
  } = dashboard || {};

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-900/60 px-3 py-1 rounded-full border border-blue-700">
            Employer Recruiting Hub
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
            {company?.companyName || 'Your Company'} Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Manage your campus postings, review collegiate applicants, and update hiring pipeline
            statuses.
          </p>
        </div>

        <Link
          to="/recruiter/post-job"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-2xl transition shadow-lg shadow-blue-500/30 whitespace-nowrap self-start md:self-center"
        >
          <PlusCircle className="w-4 h-4" />
          Post New Opportunity
        </Link>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatsCard
          title="Total Postings"
          value={totalJobs}
          icon={Briefcase}
          color="blue"
          subtitle="All created listings"
        />
        <StatsCard
          title="Active Listings"
          value={activeJobs}
          icon={CheckCircle2}
          color="emerald"
          subtitle="Open for candidates"
        />
        <StatsCard
          title="Total Applicants"
          value={totalApplications}
          icon={Users}
          color="purple"
          subtitle="Submissions received"
        />
        <StatsCard
          title="Closed Postings"
          value={closedJobs}
          icon={Clock}
          color="amber"
          subtitle="Completed cycles"
        />
      </div>

      {/* Recent Applications Feed */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Candidate Applications</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Latest student submissions for your jobs</p>
          </div>
          <Link
            to="/recruiter/manage-jobs"
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1"
          >
            Manage All Listings <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentApplications.length === 0 ? (
          <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-xs">
            No applicants received yet for your active listings.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] uppercase font-bold text-slate-400 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border-y border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">College & Degree</th>
                  <th className="py-3 px-4">Applied Position</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {recentApplications.map((app) => (
                  <tr key={app._id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                      <div>{app.studentId?.name || app.studentName || 'Student'}</div>
                      <div className="text-[11px] text-slate-400 font-normal">
                        {app.studentId?.email || app.studentEmail}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      <div>{app.studentId?.college || 'College'}</div>
                      <div className="text-[11px] text-slate-400">{app.studentId?.course || 'Degree'}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800 dark:text-slate-200">
                      {app.jobId?.title || 'Job'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">{formatDate(app.appliedAt)}</td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={app.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={`/recruiter/jobs/${app.jobId?._id}/applications`}
                        className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-bold"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Posted Listings Summary */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Active Job Postings</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Your most recent open opportunities</p>
          </div>
          <Link
            to="/recruiter/manage-jobs"
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentJobs.slice(0, 4).map((job) => (
            <div
              key={job._id}
              className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{job.title}</h4>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{job.type}</span>
                  <span>•</span>
                  <span>{job.workMode}</span>
                  <span>•</span>
                  <span>Deadline: {formatDate(job.deadline)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={job.status} size="sm" />
                <Link
                  to={`/recruiter/jobs/${job._id}/applications`}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition"
                >
                  Applicants
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
