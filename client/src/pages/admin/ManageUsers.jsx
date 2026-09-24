import React, { useState, useEffect } from 'react';
import { Users, Search, Trash2, CheckCircle2, AlertCircle, Shield } from 'lucide-react';
import { adminService } from '../../services/adminService';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';
import { formatDate } from '../../utils/helpers';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [msg, setMsg] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = {};
      if (roleFilter !== 'all') params.role = roleFilter;
      if (searchQuery.trim()) params.q = searchQuery.trim();

      const res = await adminService.getUsers(params);
      if (res.success) {
        setUsers(res.users || []);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to permanently delete this user account?')) {
      return;
    }

    try {
      const res = await adminService.deleteUser(userId);
      if (res.success) {
        setUsers((prev) => prev.filter((u) => u._id !== userId));
        setMsg('User removed successfully.');
        setTimeout(() => setMsg(''), 3000);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete user');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">User Management</h1>
        <p className="text-xs text-slate-500 mt-1">
          Review, filter, and manage student and employer user accounts.
        </p>
      </div>

      {msg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-700 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{msg}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Role Filters */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {['all', 'student', 'recruiter', 'admin'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold capitalize transition ${
                roleFilter === r
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {r === 'all' ? 'All Roles' : `${r}s`}
            </button>
          ))}
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex items-center gap-2 w-full sm:w-72">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search user..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-slate-800 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-xl"
          >
            Filter
          </button>
        </form>
      </div>

      {loading ? (
        <Loader message="Loading registered users..." />
      ) : users.length === 0 ? (
        <EmptyState title="No users found" description="No accounts match your query." />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] uppercase font-bold text-slate-400 bg-slate-50/80 border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">Name</th>
                  <th className="py-3.5 px-4">Email</th>
                  <th className="py-3.5 px-4">Role</th>
                  <th className="py-3.5 px-4">Affiliation / College</th>
                  <th className="py-3.5 px-4">Joined Date</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-50/60 transition">
                    <td className="py-4 px-6 font-bold text-slate-900">{u.name}</td>
                    <td className="py-4 px-4 text-slate-600">{u.email}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                          u.role === 'student'
                            ? 'bg-blue-100 text-blue-700'
                            : u.role === 'recruiter'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-600 font-medium">
                      {u.college || u.course || '—'}
                    </td>
                    <td className="py-4 px-4 text-slate-500">{formatDate(u.createdAt)}</td>
                    <td className="py-4 px-6 text-right">
                      {u.role !== 'admin' && (
                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                          title="Delete User Account"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
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

export default ManageUsers;
