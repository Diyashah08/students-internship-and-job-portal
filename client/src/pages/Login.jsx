import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Briefcase,
  Lock,
  Mail,
  AlertCircle,
  ArrowRight,
  Sparkles,
  GraduationCap,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    try {
      setLoading(true);
      const res = await login(email, password);

      // Determine redirect path
      const destination = location.state?.from?.pathname;
      if (destination) {
        navigate(destination);
      } else if (res.user.role === 'student') {
        navigate('/student/dashboard');
      } else if (res.user.role === 'recruiter') {
        navigate('/recruiter/dashboard');
      } else if (res.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-xl">
        {/* Header */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <Briefcase className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Welcome Back</h2>
          <p className="text-xs text-slate-500 mt-1">
            Log in to your InternConnect account to access opportunities
          </p>
        </div>

        {/* Demo Fast Logins Box */}
        <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-2xl">
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Quick Demo Logins (1-Click Fill)
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => handleDemoFill('student@demo.com', 'password123')}
              className="px-2 py-1.5 bg-white hover:bg-blue-600 hover:text-white rounded-xl text-[11px] font-bold text-slate-700 border border-slate-200 transition shadow-sm flex items-center justify-center gap-1"
            >
              <GraduationCap className="w-3 h-3" />
              Student
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('recruiter@demo.com', 'password123')}
              className="px-2 py-1.5 bg-white hover:bg-indigo-600 hover:text-white rounded-xl text-[11px] font-bold text-slate-700 border border-slate-200 transition shadow-sm flex items-center justify-center gap-1"
            >
              <Building className="w-3 h-3" />
              Recruiter
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('admin@demo.com', 'admin123')}
              className="px-2 py-1.5 bg-white hover:bg-emerald-600 hover:text-white rounded-xl text-[11px] font-bold text-slate-700 border border-slate-200 transition shadow-sm flex items-center justify-center gap-1"
            >
              <ShieldCheck className="w-3 h-3" />
              Admin
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@university.edu or company.com"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition shadow-md shadow-blue-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-500">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-bold text-blue-600 hover:underline">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
