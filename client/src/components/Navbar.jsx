import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Layers,
  Building,
  Info,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  Bookmark,
  FileCheck,
  PlusCircle,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationDropdown from './NotificationDropdown';
import { getInitials } from '../utils/helpers';

const Navbar = () => {
  const { user, isAuthenticated, role, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/login');
  };

  const navLinkClasses = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium transition rounded-lg ${
      isActive
        ? 'text-blue-600 font-semibold'
        : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
    }`;

  const getDashboardLink = () => {
    if (role === 'student') return '/student/dashboard';
    if (role === 'recruiter') return '/recruiter/dashboard';
    if (role === 'admin') return '/admin/dashboard';
    return '/';
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">
              InternConnect
            </span>
            <span className="block text-[10px] font-semibold tracking-wider text-slate-400 uppercase -mt-1">
              Campus & Career
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" className={navLinkClasses}>
            Home
          </NavLink>
          <NavLink to="/jobs" className={navLinkClasses}>
            Find Jobs
          </NavLink>
          <NavLink to="/jobs?type=Internship" className={navLinkClasses}>
            Internships
          </NavLink>
          <NavLink to="/companies" className={navLinkClasses}>
            Companies
          </NavLink>
          <NavLink to="/about" className={navLinkClasses}>
            About
          </NavLink>
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {/* Notifications */}
              <NotificationDropdown />

              {/* Role Dashboard Quick Action */}
              <Link
                to={getDashboardLink()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                {role === 'student'
                  ? 'Student Portal'
                  : role === 'recruiter'
                  ? 'Recruiter Portal'
                  : 'Admin Panel'}
              </Link>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                    {getInitials(user?.name)}
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-sm font-bold text-slate-800 truncate">{user?.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {role}
                      </span>
                    </div>

                    <div className="py-1">
                      <Link
                        to={getDashboardLink()}
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                      >
                        <LayoutDashboard className="w-4 h-4 text-slate-400" />
                        Dashboard
                      </Link>

                      {role === 'student' && (
                        <>
                          <Link
                            to="/student/profile"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                          >
                            <User className="w-4 h-4 text-slate-400" />
                            My Profile
                          </Link>
                          <Link
                            to="/student/applications"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                          >
                            <FileCheck className="w-4 h-4 text-slate-400" />
                            My Applications
                          </Link>
                          <Link
                            to="/student/saved-jobs"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                          >
                            <Bookmark className="w-4 h-4 text-slate-400" />
                            Saved Opportunities
                          </Link>
                        </>
                      )}

                      {role === 'recruiter' && (
                        <>
                          <Link
                            to="/recruiter/post-job"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                          >
                            <PlusCircle className="w-4 h-4 text-slate-400" />
                            Post Opportunity
                          </Link>
                          <Link
                            to="/recruiter/company"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                          >
                            <Building className="w-4 h-4 text-slate-400" />
                            Company Profile
                          </Link>
                        </>
                      )}

                      {role === 'admin' && (
                        <Link
                          to="/admin/users"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                        >
                          <ShieldAlert className="w-4 h-4 text-slate-400" />
                          Manage Users
                        </Link>
                      )}
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 rounded-xl transition"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition shadow-sm hover:shadow"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          {isAuthenticated && <NotificationDropdown />}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2">
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-xl"
          >
            Home
          </NavLink>
          <NavLink
            to="/jobs"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-xl"
          >
            Find Jobs
          </NavLink>
          <NavLink
            to="/jobs?type=Internship"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-xl"
          >
            Internships
          </NavLink>
          <NavLink
            to="/companies"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-xl"
          >
            Companies
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-xl"
          >
            About
          </NavLink>

          {isAuthenticated ? (
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <Link
                to={getDashboardLink()}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-semibold text-blue-600 bg-blue-50 rounded-xl"
              >
                Go to Dashboard
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-3 py-2 text-base font-semibold text-rose-600 hover:bg-rose-50 rounded-xl"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 rounded-xl"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-xl"
              >
                Register Now
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
