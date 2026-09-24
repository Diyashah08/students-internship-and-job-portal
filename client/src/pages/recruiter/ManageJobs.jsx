import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Users,
  Edit,
  Trash2,
  PlusCircle,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { jobService } from '../../services/jobService';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/StatusBadge';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';
import { formatDate } from '../../utils/helpers';

const ManageJobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  const fetchRecruiterJobs = async () => {
    try {
      setLoading(true);
      const res = await jobService.getJobs({ recruiterId: user._id, status: 'all' });
      if (res.success) {
        setJobs(res.jobs || []);
      }
    } catch (err) {
      console.error('Error loading recruiter jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchRecruiterJobs();
    }
  }, [user]);

  const handleToggleStatus = async (jobId, currentStatus) => {
    try {
      setActionLoading(true);
      const nextStatus = currentStatus === 'Active' ? 'Closed' : 'Active';
      await jobService.toggleStatus(jobId, nextStatus);
      setJobs((prev) =>
        prev.map((j) => (j._id === jobId ? { ...j, status: nextStatus } : j))
      );
      setMsg({ type: 'success', text: `Listing status updated to ${nextStatus}` });
      setTimeout(() => setMsg({ type: '', text: '' }), 3000);
    } catch (err) {
      setMsg({ type: 'error', text: 'Failed to update status' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this listing and its applications?')) {
      return;
    }

    try {
      setActionLoading(true);
      await jobService.deleteJob(jobId);
      setJobs((prev) => prev.filter((j) => j._id !== jobId));
      setMsg({ type: 'success', text: 'Listing removed successfully' });
      setTimeout(() => setMsg({ type: '', text: '' }), 3000);
    } catch (err) {
      setMsg({ type: 'error', text: 'Failed to delete listing' });
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Manage Postings</h1>
          <p className="text-xs text-slate-500 mt-1">
            Track active listings, update deadlines, and review candidates.
          </p>
        </div>

        <Link
          to="/recruiter/post-job"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shadow-md shadow-blue-500/20 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          Create New Post
        </Link>
      </div>

      {msg.text && (
        <div
          className={`p-4 rounded-2xl text-xs flex items-center gap-2 ${
            msg.type === 'success'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-rose-50 text-rose-700 border border-rose-200'
          }`}
        >
          {msg.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          <span>{msg.text}</span>
        </div>
      )}

      {loading ? (
        <Loader message="Loading your job postings..." />
      ) : jobs.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No opportunities posted yet"
          description="Create your first internship or job posting to begin receiving candidate applications."
          actionText="Post Your First Opportunity"
          actionLink="/recruiter/post-job"
        />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] uppercase font-bold text-slate-400 bg-slate-50/80 border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">Opportunity Title</th>
                  <th className="py-3.5 px-4">Type & Mode</th>
                  <th className="py-3.5 px-4">Deadline</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map((job) => (
                  <tr key={job._id} className="hover:bg-slate-50/60 transition">
                    <td className="py-4 px-6">
                      <Link
                        to={`/jobs/${job._id}`}
                        className="font-bold text-slate-900 hover:text-blue-600 block text-sm"
                      >
                        {job.title}
                      </Link>
                      <span className="text-[11px] text-slate-400">{job.location}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-slate-700">{job.type}</span>
                      <span className="block text-[11px] text-slate-400">{job.workMode}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-600 font-medium">
                      {formatDate(job.deadline)}
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge status={job.status} size="sm" />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* View applicants button */}
                        <Link
                          to={`/recruiter/jobs/${job._id}/applications`}
                          className="px-3 py-1.5 bg-blue-50 text-blue-700 font-bold rounded-xl text-xs hover:bg-blue-600 hover:text-white transition flex items-center gap-1.5"
                          title="View Applications"
                        >
                          <Users className="w-3.5 h-3.5" />
                          Applicants
                        </Link>

                        {/* Toggle active / closed */}
                        <button
                          onClick={() => handleToggleStatus(job._id, job.status)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition"
                          title={job.status === 'Active' ? 'Close listing' : 'Activate listing'}
                        >
                          {job.status === 'Active' ? (
                            <ToggleRight className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <ToggleLeft className="w-5 h-5 text-slate-400" />
                          )}
                        </button>

                        {/* Edit button */}
                        <Link
                          to={`/recruiter/post-job?edit=${job._id}`}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                          title="Edit Listing"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>

                        {/* Delete button */}
                        <button
                          onClick={() => handleDelete(job._id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageJobs;
