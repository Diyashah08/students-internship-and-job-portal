import React, { useState, useEffect } from 'react';
import { FileCheck, Building2, User, Calendar, ExternalLink } from 'lucide-react';
import { adminService } from '../../services/adminService';
import StatusBadge from '../../components/StatusBadge';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';
import { formatDate } from '../../utils/helpers';
import { APPLICATION_STATUSES } from '../../utils/constants';

const AllApplicationsAdmin = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const res = await adminService.getApplications();
        if (res.success) {
          setApplications(res.applications || []);
        }
      } catch (err) {
        console.error('Error fetching all applications:', err);
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
        <h1 className="text-2xl font-extrabold text-slate-900">Platform Applications Audit</h1>
        <p className="text-xs text-slate-500 mt-1">
          Complete audit trail of all submissions made by student candidates.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
            statusFilter === 'all'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All ({applications.length})
        </button>
        {APPLICATION_STATUSES.map((st) => {
          const count = applications.filter((a) => a.status === st).length;
          return (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                statusFilter === st
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {st} ({count})
            </button>
          );
        })}
      </div>

      {loading ? (
        <Loader message="Loading application records..." />
      ) : filtered.length === 0 ? (
        <EmptyState title="No applications in this category" />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] uppercase font-bold text-slate-400 bg-slate-50/80 border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">Student Applicant</th>
                  <th className="py-3.5 px-4">Applied Opportunity</th>
                  <th className="py-3.5 px-4">Target Company</th>
                  <th className="py-3.5 px-4">Submission Date</th>
                  <th className="py-3.5 px-6 text-right">Current Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((app) => (
                  <tr key={app._id} className="hover:bg-slate-50/60 transition">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      <div>{app.studentId?.name || app.studentName || 'Student'}</div>
                      <div className="text-[11px] text-slate-400 font-normal">
                        {app.studentId?.email || app.studentEmail}
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-800">
                      {app.jobId?.title || 'Job Listing'}
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      {app.jobId?.companyId?.companyName || 'Company'}
                    </td>
                    <td className="py-4 px-4 text-slate-500">{formatDate(app.appliedAt)}</td>
                    <td className="py-4 px-6 text-right">
                      <StatusBadge status={app.status} size="sm" />
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

export default AllApplicationsAdmin;
