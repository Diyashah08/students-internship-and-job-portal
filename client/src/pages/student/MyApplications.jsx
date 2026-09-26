import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileCheck,
  Building2,
  MapPin,
  Calendar,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileText,
  Filter,
  Video,
} from 'lucide-react';
import { applicationService } from '../../services/applicationService';
import StatusBadge from '../../components/StatusBadge';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';
import { formatDate, getCompanyLogo } from '../../utils/helpers';
import { APPLICATION_STATUSES } from '../../utils/constants';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedAppId, setExpandedAppId] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const res = await applicationService.getMyApplications();
        if (res.success) {
          setApplications(res.applications || []);
        }
      } catch (err) {
        console.error('Error fetching student applications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const filtered = applications.filter((app) => {
    if (statusFilter === 'all') return true;
    return app.status === statusFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">My Applications</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Track the status of your internship and job applications across all companies.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            statusFilter === 'all'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          All ({applications.length})
        </button>
        {APPLICATION_STATUSES.map((status) => {
          const count = applications.filter((a) => a.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                statusFilter === status
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {status} ({count})
            </button>
          );
        })}
      </div>

      {/* Content */}
      {loading ? (
        <Loader message="Loading your applications..." />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={FileCheck}
          title="No applications in this category"
          description="You haven't submitted any applications with this status yet."
          actionText="Explore Open Opportunities"
          actionLink="/jobs"
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((app) => {
            const job = app.jobId || {};
            const company = job.companyId || {};
            const isExpanded = expandedAppId === app._id;

            return (
              <div
                key={app._id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-card hover:border-slate-200 dark:hover:border-slate-700 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={getCompanyLogo(company.logo, company.companyName)}
                      alt={company.companyName}
                      className="w-12 h-12 rounded-2xl object-contain bg-white p-1 border border-slate-100 dark:border-slate-800 shadow-sm"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = getCompanyLogo('', company.companyName);
                      }}
                    />
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {job.title || 'Opportunity'}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                        <span className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          {company.companyName || 'Company'}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {job.location || 'India'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          Applied {formatDate(app.appliedAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <StatusBadge status={app.status} size="md" />

                    <Link
                      to={`/jobs/${job._id}`}
                      className="p-2 rounded-xl text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      title="View Job Details"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Scheduled Video Interview Card */}
                {app.status === 'Interview' && (
                  <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/40 border border-blue-200/90 dark:border-blue-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                        <Video className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>Interview Scheduled with {company.companyName || 'Recruiter'}</span>
                      </div>
                      <div className="text-slate-600 dark:text-slate-300 flex items-center gap-3">
                        <span>📅 {app.interviewDate || 'Upcoming Date'}</span>
                        {app.interviewTime && <span>⏰ {app.interviewTime}</span>}
                      </div>
                      {app.interviewNotes && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">"{app.interviewNotes}"</p>
                      )}
                    </div>

                    {app.interviewLink && (
                      <a
                        href={app.interviewLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 whitespace-nowrap self-start sm:self-auto"
                      >
                        <Video className="w-3.5 h-3.5" />
                        Join Video Interview ↗
                      </a>
                    )}
                  </div>
                )}

                {/* Cover Letter toggle */}
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <button
                    onClick={() => setExpandedAppId(isExpanded ? null : app._id)}
                    className="font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    {isExpanded ? 'Hide Submission Details' : 'View Submitted Cover Letter & Resume'}
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <span className="text-slate-400 dark:text-slate-500">
                    Type: <strong className="text-slate-600 dark:text-slate-300">{job.type || 'Internship'}</strong>
                  </span>
                </div>

                {isExpanded && (
                  <div className="mt-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 text-xs space-y-2">
                    <div>
                      <span className="font-bold text-slate-700 dark:text-slate-200">Cover Letter:</span>
                      <p className="text-slate-600 dark:text-slate-300 mt-1 whitespace-pre-line leading-relaxed">
                        {app.coverLetter || 'No cover letter provided with this submission.'}
                      </p>
                    </div>

                    {app.resume && (
                      <div className="pt-2">
                        <span className="font-bold text-slate-700 dark:text-slate-200">Submitted Resume:</span>{' '}
                        <a
                          href={app.resume}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 dark:text-blue-400 underline ml-1 font-semibold"
                        >
                          View Resume ↗
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
