import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Users,
  ArrowLeft,
  FileText,
  Mail,
  Phone,
  GraduationCap,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { applicationService } from '../../services/applicationService';
import StatusBadge from '../../components/StatusBadge';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';
import { formatDate, getInitials } from '../../utils/helpers';
import { APPLICATION_STATUSES } from '../../utils/constants';

const JobApplications = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [msg, setMsg] = useState('');

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const res = await applicationService.getJobApplications(jobId);
      if (res.success) {
        setJob(res.job);
        setApplications(res.applications || []);
      }
    } catch (err) {
      console.error('Error fetching job applicants:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  const handleStatusChange = async (appId, newStatus) => {
    try {
      setUpdatingId(appId);
      const res = await applicationService.updateStatus(appId, newStatus);
      if (res.success) {
        setApplications((prev) =>
          prev.map((a) => (a._id === appId ? { ...a, status: newStatus } : a))
        );
        setMsg(`Applicant status updated to ${newStatus} & candidate notified!`);
        setTimeout(() => setMsg(''), 3500);
      }
    } catch (err) {
      console.error('Status update error:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = applications.filter((app) => {
    if (statusFilter === 'all') return true;
    return app.status === statusFilter;
  });

  if (loading) {
    return <Loader message="Loading applicants..." />;
  }

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb & Job Title */}
      <div>
        <Link
          to="/recruiter/manage-jobs"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 mb-3 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Listings
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md">
              Candidate Pipeline
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
              Applicants for: {job?.title || 'Listing'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {job?.location} • {job?.type} • Total Applicants: {applications.length}
            </p>
          </div>
        </div>
      </div>

      {msg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-700 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{msg}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            statusFilter === 'all'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All Applicants ({applications.length})
        </button>
        {APPLICATION_STATUSES.map((status) => {
          const count = applications.filter((a) => a.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                statusFilter === status
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {status} ({count})
            </button>
          );
        })}
      </div>

      {/* Applicants List */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No applicants found in this stage"
          description="Candidates will appear here as they submit their applications."
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((app) => {
            const student = app.studentId || {};
            const isExpanded = expandedId === app._id;
            const isUpdating = updatingId === app._id;

            return (
              <div
                key={app._id}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-card hover:border-slate-200 transition"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Student profile info */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-bold text-base flex items-center justify-center shadow-sm flex-shrink-0">
                      {getInitials(student.name || app.studentName)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        {student.name || app.studentName || 'Applicant'}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1 font-medium text-slate-700">
                          <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                          {student.college || 'College'} • {student.course || 'Degree'} (
                          {student.graduationYear || '2025'})
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          {student.email || app.studentEmail}
                        </span>
                        {(student.phone || app.studentPhone) && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            {student.phone || app.studentPhone}
                          </span>
                        )}
                      </div>

                      {/* Skills Tags */}
                      {student.skills && student.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          {student.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions & Status Dropdown */}
                  <div className="flex flex-wrap items-center gap-3 self-end lg:self-center">
                    {/* Status updater */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-500">Status:</span>
                      <select
                        value={app.status}
                        disabled={isUpdating}
                        onChange={(e) => handleStatusChange(app._id, e.target.value)}
                        className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer disabled:opacity-50"
                      >
                        {APPLICATION_STATUSES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Resume link */}
                    {(app.resume || student.resume) && (
                      <a
                        href={app.resume || student.resume}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 font-bold text-xs rounded-xl transition"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        View Resume
                      </a>
                    )}
                  </div>
                </div>

                {/* Cover Letter toggle */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : app._id)}
                    className="font-semibold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    {isExpanded ? 'Hide Cover Letter' : 'Read Candidate Statement'}
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <span>Applied on {formatDate(app.appliedAt)}</span>
                </div>

                {isExpanded && (
                  <div className="mt-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                    <span className="font-bold block mb-1">Candidate Cover Letter:</span>
                    {app.coverLetter || 'No cover letter attached with this submission.'}
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

export default JobApplications;
