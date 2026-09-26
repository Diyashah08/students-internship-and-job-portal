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
  Calendar,
  Video,
  Sparkles,
  X,
  Send,
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

  // Interview Schedule Modal state
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedAppForInterview, setSelectedAppForInterview] = useState(null);
  const [interviewForm, setInterviewForm] = useState({
    interviewDate: '',
    interviewTime: '11:00 AM',
    interviewLink: '',
    interviewNotes: 'Please be ready 5 minutes early with your code editor open.',
  });

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
    if (newStatus === 'Interview') {
      const targetApp = applications.find((a) => a._id === appId);
      openScheduleModal(targetApp);
      return;
    }

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

  const openScheduleModal = (app) => {
    setSelectedAppForInterview(app);
    // Auto-generate a meeting room link if not set
    const roomCode = Math.random().toString(36).substring(2, 9);
    setInterviewForm({
      interviewDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      interviewTime: '11:00 AM',
      interviewLink: app?.interviewLink || `https://meet.google.com/interview-${roomCode}`,
      interviewNotes: app?.interviewNotes || 'Please prepare to discuss your React/MERN projects.',
    });
    setScheduleModalOpen(true);
  };

  const submitInterviewSchedule = async (e) => {
    e.preventDefault();
    if (!selectedAppForInterview) return;

    try {
      setUpdatingId(selectedAppForInterview._id);
      const res = await applicationService.updateStatus(selectedAppForInterview._id, {
        status: 'Interview',
        ...interviewForm,
      });

      if (res.success) {
        setApplications((prev) =>
          prev.map((a) =>
            a._id === selectedAppForInterview._id
              ? { ...a, status: 'Interview', ...interviewForm }
              : a
          )
        );
        setMsg(`Interview officially scheduled for ${selectedAppForInterview.studentName || 'Candidate'} & meeting invite sent!`);
        setScheduleModalOpen(false);
        setTimeout(() => setMsg(''), 4000);
      }
    } catch (err) {
      console.error('Error scheduling interview:', err);
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
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-3 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Listings
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-md border border-blue-100 dark:border-blue-900/60">
              Candidate Pipeline
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              Applicants for: {job?.title || 'Listing'}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {job?.location} • {job?.type} • Total Applicants: {applications.length}
            </p>
          </div>
        </div>
      </div>

      {msg && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/60 rounded-2xl text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{msg}</span>
        </div>
      )}

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
          All Applicants ({applications.length})
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
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-card hover:border-slate-200 dark:hover:border-slate-700 transition"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Student profile info */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-bold text-base flex items-center justify-center shadow-sm flex-shrink-0">
                      {getInitials(student.name || app.studentName)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {student.name || app.studentName || 'Applicant'}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                        <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-200">
                          <GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
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
                              className="text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md"
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
                    
                    {/* Schedule Interview Quick Button */}
                    <button
                      onClick={() => openScheduleModal(app)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold text-xs rounded-xl transition cursor-pointer"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>{app.status === 'Interview' ? 'Edit Interview' : 'Schedule Interview'}</span>
                    </button>

                    {/* Status updater */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Status:</span>
                      <select
                        value={app.status}
                        disabled={isUpdating}
                        onChange={(e) => handleStatusChange(app._id, e.target.value)}
                        className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer disabled:opacity-50"
                      >
                        {APPLICATION_STATUSES.map((st) => (
                          <option key={st} value={st} className="dark:bg-slate-800">
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
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white text-blue-700 dark:text-blue-300 font-bold text-xs rounded-xl transition"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        View Resume
                      </a>
                    )}
                  </div>
                </div>

                {/* Scheduled Interview Details Card if Interview Stage */}
                {app.status === 'Interview' && (
                  <div className="mt-4 p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
                        <Video className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span>Scheduled Interview Date & Video Link</span>
                      </div>
                      <div className="text-slate-600 dark:text-slate-300 flex items-center gap-3">
                        <span>📅 {app.interviewDate || 'Date set'}</span>
                        <span>⏰ {app.interviewTime || '11:00 AM'}</span>
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
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5"
                      >
                        <Video className="w-3.5 h-3.5" />
                        Join Meeting ↗
                      </a>
                    )}
                  </div>
                )}

                {/* Cover Letter toggle */}
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : app._id)}
                    className="font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
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
                  <div className="mt-3 p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                    <span className="font-bold block mb-1">Candidate Cover Letter:</span>
                    {app.coverLetter || 'No cover letter attached with this submission.'}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* RECRUITER INTERVIEW SCHEDULER MODAL */}
      {scheduleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Schedule Candidate Interview</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Candidate: {selectedAppForInterview?.studentName || 'Student'}</p>
                </div>
              </div>
              <button
                onClick={() => setScheduleModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={submitInterviewSchedule} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Interview Date</label>
                  <input
                    type="date"
                    required
                    value={interviewForm.interviewDate}
                    onChange={(e) => setInterviewForm({ ...interviewForm, interviewDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Interview Time</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 11:30 AM IST"
                    value={interviewForm.interviewTime}
                    onChange={(e) => setInterviewForm({ ...interviewForm, interviewTime: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Video Meeting Link (Google Meet / Zoom / Teams)</label>
                  <button
                    type="button"
                    onClick={() => {
                      const room = Math.random().toString(36).substring(2, 9);
                      setInterviewForm({ ...interviewForm, interviewLink: `https://meet.google.com/${room}` });
                    }}
                    className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline font-semibold cursor-pointer"
                  >
                    Auto-Generate
                  </button>
                </div>
                <input
                  type="url"
                  required
                  value={interviewForm.interviewLink}
                  onChange={(e) => setInterviewForm({ ...interviewForm, interviewLink: e.target.value })}
                  placeholder="https://meet.google.com/xyz-abc"
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-indigo-500 outline-none font-mono text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Instructions / Notes for Candidate</label>
                <textarea
                  rows={3}
                  value={interviewForm.interviewNotes}
                  onChange={(e) => setInterviewForm({ ...interviewForm, interviewNotes: e.target.value })}
                  placeholder="e.g. Technical coding round on React & Data Structures. Please keep your camera on."
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-indigo-500 outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setScheduleModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-500/20 flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Confirm & Send Invite</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApplications;
