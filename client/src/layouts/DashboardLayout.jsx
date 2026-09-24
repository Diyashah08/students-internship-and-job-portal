import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  FileCheck,
  Bookmark,
  Briefcase,
  PlusCircle,
  Building,
  Users,
  ShieldCheck,
  FileSpreadsheet,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationDropdown from '../components/NotificationDropdown';
import { getInitials } from '../utils/helpers';

const DashboardLayout = () => {
  const { user, role, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition ${
      isActive
        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
        : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/70'
    }`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-100 shadow-sm h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            aria-label="Toggle Sidebar"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <Briefcase className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-lg text-slate-900 hidden sm:inline">
              InternConnect
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/jobs"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
          >
            <Briefcase className="w-3.5 h-3.5" />
            Browse Portal
          </Link>

          <NotificationDropdown />

          <div className="h-6 w-px bg-slate-200 mx-1"></div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shadow-sm">
              {getInitials(user?.name)}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-slate-800 leading-tight">{user?.name}</p>
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600">
                {role}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-100 p-6 flex flex-col justify-between transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="space-y-6">
            {/* User snapshot */}
            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl border border-blue-100/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center shadow-md">
                  {getInitials(user?.name)}
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-sm font-bold text-slate-900 truncate">{user?.name}</h4>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Nav Menu */}
            <nav className="space-y-1.5">
              {/* Student Role Links */}
              {role === 'student' && (
                <>
                  <NavLink
                    to="/student/dashboard"
                    onClick={() => setSidebarOpen(false)}
                    className={linkClasses}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Overview
                  </NavLink>
                  <NavLink
                    to="/student/profile"
                    onClick={() => setSidebarOpen(false)}
                    className={linkClasses}
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </NavLink>
                  <NavLink
                    to="/student/applications"
                    onClick={() => setSidebarOpen(false)}
                    className={linkClasses}
                  >
                    <FileCheck className="w-4 h-4" />
                    My Applications
                  </NavLink>
                  <NavLink
                    to="/student/saved-jobs"
                    onClick={() => setSidebarOpen(false)}
                    className={linkClasses}
                  >
                    <Bookmark className="w-4 h-4" />
                    Saved Jobs
                  </NavLink>
                </>
              )}

              {/* Recruiter Role Links */}
              {role === 'recruiter' && (
                <>
                  <NavLink
                    to="/recruiter/dashboard"
                    onClick={() => setSidebarOpen(false)}
                    className={linkClasses}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/recruiter/post-job"
                    onClick={() => setSidebarOpen(false)}
                    className={linkClasses}
                  >
                    <PlusCircle className="w-4 h-4" />
                    Post New Opportunity
                  </NavLink>
                  <NavLink
                    to="/recruiter/manage-jobs"
                    onClick={() => setSidebarOpen(false)}
                    className={linkClasses}
                  >
                    <Briefcase className="w-4 h-4" />
                    Manage Listings
                  </NavLink>
                  <NavLink
                    to="/recruiter/company"
                    onClick={() => setSidebarOpen(false)}
                    className={linkClasses}
                  >
                    <Building className="w-4 h-4" />
                    Company Profile
                  </NavLink>
                </>
              )}

              {/* Admin Role Links */}
              {role === 'admin' && (
                <>
                  <NavLink
                    to="/admin/dashboard"
                    onClick={() => setSidebarOpen(false)}
                    className={linkClasses}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Overview Stats
                  </NavLink>
                  <NavLink
                    to="/admin/users"
                    onClick={() => setSidebarOpen(false)}
                    className={linkClasses}
                  >
                    <Users className="w-4 h-4" />
                    Manage Users
                  </NavLink>
                  <NavLink
                    to="/admin/jobs"
                    onClick={() => setSidebarOpen(false)}
                    className={linkClasses}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Job Moderation
                  </NavLink>
                  <NavLink
                    to="/admin/applications"
                    onClick={() => setSidebarOpen(false)}
                    className={linkClasses}
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    All Applications
                  </NavLink>
                </>
              )}
            </nav>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-slate-100 space-y-2">
            <Link
              to="/jobs"
              className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Find Internships
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
