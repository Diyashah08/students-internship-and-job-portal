import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Check,
  X,
  Trash2,
  ExternalLink,
  Building,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { jobService } from '../../services/jobService';
import StatusBadge from '../../components/StatusBadge';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';
import { formatDate } from '../../utils/helpers';

const ManageJobsAdmin = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [msg, setMsg] = useState('');

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = {};
      if (statusFilter !== 'all') params.status = statusFilter;

      const res = await adminService.getJobs(params);
      if (res.success) {
        setJobs(res.jobs || []);
      }
    } catch (err) {
      console.error('Error fetching admin jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [statusFilter]);

  const handleUpdateStatus = async (jobId, newStatus) => {
    try {
      const res = await adminService.updateJobStatus(jobId, newStatus);
      if (res.success) {
        setJobs((prev) =>
          prev.map((j) => (j._id === jobId ? { ...j, status: newStatus } : j))
        );
        setMsg(`Job listing status updated to ${newStatus}`);
        setTimeout(() => setMsg(''), 3000);
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to permanently delete this opportunity?')) {
      return;
    }

    try {
      await jobService.deleteJob(jobId);
      setJobs((prev) => prev.filter((j) => j._id !== jobId));
      setMsg('Listing deleted permanently.');
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      alert('Failed to delete listing');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Job & Internship Moderation</h1>
        <p className="text-xs text-slate-500 mt-1">
          Review, approve, or remove listings submitted by employer recruiters.
        </p>
      </div>

      {msg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-700 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{msg}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        {['all', 'Active', 'Closed', 'Pending', 'Rejected'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition ${
              statusFilter === st
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {st === 'all' ? 'All Postings' : st}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader message="Loading listings..." />
      ) : jobs.length === 0 ? (
        <EmptyState title="No opportunities in this category" />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] uppercase font-bold text-slate-400 bg-slate-50/80 border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">Opportunity</th>
                  <th className="py-3.5 px-4">Employer / Company</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Deadline</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-6 text-right">Moderation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map((j) => (
                  <tr key={j._id} className="hover:bg-slate-50/60 transition">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      <Link to={`/jobs/${j._id}`} className="hover:text-blue-600">
                        {j.title}
                      </Link>
                      <span className="block text-[11px] text-slate-400 font-normal">{j.location}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-600 font-medium">
                      {j.companyId?.companyName || 'Company'}
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-slate-700">{j.type}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-500">{formatDate(j.deadline)}</td>
                    <td className="py-4 px-4">
                      <StatusBadge status={j.status} size="sm" />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {j.status !== 'Active' && (
                          <button
                            onClick={() => handleUpdateStatus(j._id, 'Active')}
                            className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold hover:bg-emerald-600 hover:text-white transition"
                            title="Approve / Activate"
                          >
                            Approve
                          </button>
                        )}
                        {j.status === 'Active' && (
                          <button
                            onClick={() => handleUpdateStatus(j._id, 'Closed')}
                            className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-200 transition"
                            title="Close"
                          >
                            Close
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(j._id)}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
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

export default ManageJobsAdmin;
