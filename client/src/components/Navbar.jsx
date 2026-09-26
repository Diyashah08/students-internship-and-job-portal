import React, { useState, useRef, useEffect } from 'react';
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
  Sparkles,
  FileText,
  BookOpen,
  TrendingUp,
  GraduationCap,
  Zap,
  Printer,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationDropdown from './NotificationDropdown';
import ThemeToggle from './ThemeToggle';
import { getInitials } from '../utils/helpers';

const Navbar = () => {
  const { user, isAuthenticated, role, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const toolsDropdownRef = useRef(null);
  const toolsTimeoutRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (toolsDropdownRef.current && !toolsDropdownRef.current.contains(e.target)) {
        setToolsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      if (toolsTimeoutRef.current) clearTimeout(toolsTimeoutRef.current);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/login');
  };

  const navLinkClasses = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium transition rounded-xl flex items-center gap-1.5 ${
      isActive
        ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/70 dark:bg-blue-950/40'
        : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800'
    }`;

  const getDashboardLink = () => {
    if (role === 'student') return '/student/dashboard';
    if (role === 'recruiter') return '/recruiter/dashboard';
    if (role === 'admin') return '/admin/dashboard';
    return '/';
  };

  const handleToolsMouseEnter = () => {
    if (toolsTimeoutRef.current) clearTimeout(toolsTimeoutRef.current);
    setToolsDropdownOpen(true);
  };

  const handleToolsMouseLeave = () => {
    toolsTimeoutRef.current = setTimeout(() => {
      setToolsDropdownOpen(false);
    }, 200);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
              InternConnect
            </span>
            <span className="block text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase -mt-1">
              Campus & Career Hub
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
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

          {/* Placement Drives Direct Link with NEW Badge */}
          <NavLink to="/campus-drives" className={navLinkClasses}>
            <span>Campus Drives</span>
            <span className="px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 rounded-full animate-pulse">
              Live
            </span>
          </NavLink>

          {/* Career & Placement Tools Dropdown with Seamless Bridge */}
          <div
            ref={toolsDropdownRef}
            className="relative py-2"
            onMouseEnter={handleToolsMouseEnter}
            onMouseLeave={handleToolsMouseLeave}
          >
            <button
              onClick={() => setToolsDropdownOpen((prev) => !prev)}
              className="px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl flex items-center gap-1.5 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Career Tools</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  toolsDropdownOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : 'text-slate-400'
                }`}
              />
            </button>

            {/* Seamless dropdown with top-full pt-1 so cursor never breaks hover state */}
            {toolsDropdownOpen && (
              <div
                className="absolute left-0 top-full pt-1.5 w-80 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                onMouseEnter={handleToolsMouseEnter}
                onMouseLeave={handleToolsMouseLeave}
              >
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-3 space-y-1">
                  <div className="px-3 py-2 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 mb-1">
                    Student Placement Add-Ons
                  </div>

                  <Link
                    to="/resume-builder"
                    onClick={() => setToolsDropdownOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-purple-50/70 dark:hover:bg-purple-950/40 transition group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Printer className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                        <span>ATS Resume PDF Builder</span>
                        <span className="text-[9px] font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-1.5 py-0.2 rounded-full">
                          HOT
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                        Interactive editor with live preview & 1-click PDF download.
                      </p>
                    </div>
                  </Link>

                  <Link
                    to="/resume-analyzer"
                    onClick={() => setToolsDropdownOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-blue-50/70 dark:hover:bg-blue-950/40 transition group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                        <span>AI Resume ATS Scanner</span>
                        <span className="text-[9px] font-extrabold bg-blue-600 text-white px-1.5 py-0.2 rounded-full">
                          AI
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                        Check ATS score against recruiter keywords & get feedback.
                      </p>
                    </div>
                  </Link>

                  <Link
                    to="/interview-prep"
                    onClick={() => setToolsDropdownOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-indigo-50/70 dark:hover:bg-indigo-950/40 transition group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Campus Interview Q&A</div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                        Curated technical, coding, and HR questions from TCS & top tech.
                      </p>
                    </div>
                  </Link>

                  <Link
                    to="/salary-insights"
                    onClick={() => setToolsDropdownOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-emerald-50/70 dark:hover:bg-emerald-950/40 transition group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Stipend & CTC Benchmarks</div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                        2026 fresher salaries, PPO rates, and city insights.
                      </p>
                    </div>
                  </Link>

                  <Link
                    to="/tpo-analytics"
                    onClick={() => setToolsDropdownOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-amber-50/70 dark:hover:bg-amber-950/40 transition group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                        <span>TPO Placement Analytics</span>
                        <span className="text-[9px] font-extrabold bg-amber-500 text-white px-1.5 py-0.2 rounded-full">
                          CSV
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                        College placement metrics & NAAC/NBA CSV export.
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <NavLink to="/about" className={navLinkClasses}>
            About
          </NavLink>
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Notifications */}
          {isAuthenticated && <NotificationDropdown />}

          {/* Theme Toggle Button placed between Notification and Student Portal */}
          <ThemeToggle />

          {isAuthenticated ? (
            <>
              {/* Role Dashboard Quick Action (Student Portal / Recruiter Portal) */}
              <Link
                to={getDashboardLink()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 rounded-xl transition"
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
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    {getInitials(user?.name)}
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">{user?.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">
                        {role}
                      </span>
                    </div>

                    <div className="py-1">
                      <Link
                        to={getDashboardLink()}
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <LayoutDashboard className="w-4 h-4 text-slate-400" />
                        Dashboard
                      </Link>

                      {role === 'student' && (
                        <>
                          <Link
                            to="/student/profile"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                          >
                            <User className="w-4 h-4 text-slate-400" />
                            My Profile
                          </Link>
                          <Link
                            to="/student/applications"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                          >
                            <FileCheck className="w-4 h-4 text-slate-400" />
                            My Applications
                          </Link>
                          <Link
                            to="/student/saved-jobs"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
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
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                          >
                            <PlusCircle className="w-4 h-4 text-slate-400" />
                            Post Opportunity
                          </Link>
                          <Link
                            to="/recruiter/company"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
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
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          <ShieldAlert className="w-4 h-4 text-slate-400" />
                          Manage Users
                        </Link>
                      )}
                    </div>

                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
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
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl transition shadow-md shadow-blue-500/20"
              >
                Register Free
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Header Buttons */}
        <div className="flex lg:hidden items-center gap-1.5">
          <ThemeToggle />
          {isAuthenticated && <NotificationDropdown />}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-2 max-h-[85vh] overflow-y-auto">
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
          >
            Home
          </NavLink>
          <NavLink
            to="/jobs"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
          >
            Find Jobs
          </NavLink>
          <NavLink
            to="/jobs?type=Internship"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
          >
            Internships
          </NavLink>
          <NavLink
            to="/companies"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
          >
            Companies
          </NavLink>
          <NavLink
            to="/campus-drives"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
          >
            <span>Campus Drives</span>
            <span className="px-2 py-0.5 text-[9px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 rounded-full">
              Live
            </span>
          </NavLink>

          <div className="pt-2 pb-1 border-t border-slate-100 dark:border-slate-800">
            <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Career Tools
            </span>
            <NavLink
              to="/resume-builder"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
            >
              <Printer className="w-4 h-4 text-purple-600" />
              <span>ATS Resume PDF Builder</span>
            </NavLink>
            <NavLink
              to="/resume-analyzer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>AI Resume ATS Scanner</span>
            </NavLink>
            <NavLink
              to="/interview-prep"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Interview Prep Q&A</span>
            </NavLink>
            <NavLink
              to="/salary-insights"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
            >
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Stipend & CTC Insights</span>
            </NavLink>
            <NavLink
              to="/tpo-analytics"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
            >
              <GraduationCap className="w-4 h-4 text-amber-600" />
              <span>TPO Placement Analytics</span>
            </NavLink>
          </div>

          <NavLink
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
          >
            About
          </NavLink>

          {isAuthenticated ? (
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <Link
                to={getDashboardLink()}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 rounded-xl"
              >
                Go to Dashboard
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl"
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
