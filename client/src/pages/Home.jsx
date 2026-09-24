import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Briefcase,
  GraduationCap,
  Building2,
  CheckCircle2,
  TrendingUp,
  Award,
  Users,
  ArrowRight,
  Sparkles,
  MapPin,
  Laptop,
  Code,
  Palette,
  Cpu,
  Shield,
  BarChart3,
} from 'lucide-react';
import { jobService } from '../services/jobService';
import JobCard from '../components/JobCard';
import Loader from '../components/Loader';

const categoryIcons = {
  'Software Development': Code,
  'Web Development': Laptop,
  'Data Science & AI': Cpu,
  'UI/UX Design': Palette,
  'Cloud & DevOps': Shield,
  'Business Analytics': BarChart3,
};

const Home = () => {
  const [keyword, setKeyword] = useState('');
  const [featuredData, setFeaturedData] = useState({
    categories: [],
    topCompanies: [],
    latestJobs: [],
    latestInternships: [],
    metrics: { totalActiveJobs: 0, totalCompanies: 0 },
  });
  const [activeTab, setActiveTab] = useState('internships');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        setLoading(true);
        const res = await jobService.getFeatured();
        if (res.success) {
          setFeaturedData(res);
        }
      } catch (err) {
        console.error('Error fetching home featured content:', err);
      } finally {
        setLoading(false);
      }
    };
    loadFeatured();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/jobs?q=${encodeURIComponent(keyword.trim())}`);
    } else {
      navigate('/jobs');
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50 to-white pt-16 pb-20 sm:pt-24 sm:pb-28">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-tr from-blue-400/10 via-indigo-400/10 to-purple-400/10 blur-3xl -z-10 rounded-full pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Over {featuredData.metrics.totalActiveJobs || 10}+ Verified College Opportunities</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Find Your Next <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800">
              Internship or Job
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Connect with opportunities, build your career, and take your first step towards success.
            Built specifically for college students, freshers, and leading recruiters.
          </p>

          {/* Search Bar Box */}
          <form
            onSubmit={handleSearch}
            className="mt-10 max-w-3xl mx-auto bg-white p-2.5 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200/80 flex flex-col sm:flex-row items-center gap-2"
          >
            <div className="flex-1 flex items-center gap-3 px-4 py-2 w-full">
              <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search by job title, company name, or skills (e.g. React, Python)..."
                className="w-full bg-transparent text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl sm:rounded-2xl transition shadow-md shadow-blue-500/20"
              >
                Search Jobs
              </button>
              <Link
                to="/jobs?type=Internship"
                className="hidden lg:inline-flex px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl sm:rounded-2xl transition"
              >
                Search Internships
              </Link>
            </div>
          </form>

          {/* Popular Search Tags */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-400">Popular:</span>
            {['React.js', 'Python', 'Full Stack', 'UI/UX', 'Java', 'Data Science', 'Remote'].map(
              (tag, idx) => (
                <Link
                  key={idx}
                  to={`/jobs?q=${encodeURIComponent(tag)}`}
                  className="px-2.5 py-1 rounded-lg bg-slate-100/80 hover:bg-blue-50 hover:text-blue-600 text-slate-600 transition"
                >
                  {tag}
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* 2. POPULAR INTERNSHIP CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
              Explore Fields
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Popular Internship Categories
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Discover opportunities across modern tech, design, and product disciplines.
            </p>
          </div>
          <Link
            to="/jobs"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 group"
          >
            View All Categories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'Software Dev', icon: Code, count: '15+ openings', query: 'Software Development' },
            { name: 'Web Dev', icon: Laptop, count: '12+ openings', query: 'Web Development' },
            { name: 'Data & AI', icon: Cpu, count: '8+ openings', query: 'Data Science & AI' },
            { name: 'UI/UX Design', icon: Palette, count: '6+ openings', query: 'UI/UX Design' },
            { name: 'Cloud & DevOps', icon: Shield, count: '7+ openings', query: 'Cloud & DevOps' },
            { name: 'Analytics', icon: BarChart3, count: '5+ openings', query: 'Business Analytics' },
          ].map((cat, i) => {
            const IconComponent = cat.icon;
            return (
              <Link
                key={i}
                to={`/jobs?category=${encodeURIComponent(cat.query)}`}
                className="group p-5 bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-card-hover transition-all text-center flex flex-col items-center justify-center"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition mb-3">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition">
                  {cat.name}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1">{cat.count}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. LATEST OPPORTUNITIES (TABS: INTERNSHIPS / JOBS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
              Recent Postings
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Featured Opportunities
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Hand-picked verified openings with active hiring processes.
            </p>
          </div>

          {/* Switch Tab */}
          <div className="flex items-center p-1 bg-slate-100 rounded-2xl w-fit">
            <button
              onClick={() => setActiveTab('internships')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'internships'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Latest Internships
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'jobs'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Latest Jobs
            </button>
          </div>
        </div>

        {loading ? (
          <Loader message="Fetching latest opportunities..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeTab === 'internships'
              ? featuredData.latestInternships
              : featuredData.latestJobs
            ).map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            to={activeTab === 'internships' ? '/jobs?type=Internship' : '/jobs?type=Full-time'}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 hover:border-blue-400 text-slate-800 font-bold text-sm rounded-2xl transition shadow-sm hover:shadow"
          >
            Explore All {activeTab === 'internships' ? 'Internships' : 'Jobs'}
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </Link>
        </div>
      </section>

      {/* 4. TOP HIRING ENTERPRISES & STARTUPS */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/60 border border-blue-800 px-3 py-1 rounded-full">
              Trusted Employers
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-3">Top Companies Hiring Freshers</h2>
            <p className="text-sm text-slate-400 mt-2">
              From Fortune 500 tech consulting leaders to hyper-growth product startups.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {featuredData.topCompanies.map((comp) => (
              <div
                key={comp._id}
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 p-5 rounded-2xl flex flex-col items-center text-center transition group"
              >
                <img
                  src={comp.logo}
                  alt={comp.companyName}
                  className="w-14 h-14 rounded-xl object-cover border border-slate-700 mb-3 group-hover:scale-105 transition"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&auto=format&fit=crop&q=60';
                  }}
                />
                <h4 className="text-xs font-bold text-white line-clamp-1">{comp.companyName}</h4>
                <span className="text-[10px] text-slate-400 mt-1">{comp.location || 'India'}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
            Simple 3-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">How InternConnect Works</h2>
          <p className="text-sm text-slate-500 mt-1">
            Streamlined workflow designed for zero friction campus recruiting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-card text-center relative">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-black text-lg flex items-center justify-center mx-auto mb-4 shadow-md">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Create Student Profile</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Sign up with your college details, degree, skills, and upload your resume to build a
              standout candidate profile.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-card text-center relative">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-black text-lg flex items-center justify-center mx-auto mb-4 shadow-md">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Explore & 1-Click Apply</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Filter listings by stipend, work mode, or tech stack and submit applications directly to
              recruiters.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-card text-center relative">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center mx-auto mb-4 shadow-md">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Track & Get Hired</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Receive live notification updates when shortlisted or invited for interviews.
            </p>
          </div>
        </div>
      </section>

      {/* 6. WHY INTERNCONNECT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-3xl p-8 sm:p-14 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-blue-800/60 px-3 py-1 rounded-md">
                Why InternConnect?
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 leading-tight">
                Designed specifically for collegiate talent & ambitious recruiters.
              </h2>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Verified Opportunities</h4>
                    <p className="text-xs text-slate-300">
                      All internship & job postings are reviewed to prevent scams and spam.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Automated Status Tracking</h4>
                    <p className="text-xs text-slate-300">
                      Know exactly where your application stands at every stage of the pipeline.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Skill-based Recommendations</h4>
                    <p className="text-xs text-slate-300">
                      Get smart suggestions tailored to your coursework and programming skills.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-center space-y-4">
              <h3 className="text-xl font-bold text-white">Ready to Launch Your Career?</h3>
              <p className="text-xs text-slate-300">
                Join students from over 100+ colleges across India discovering real-world opportunities.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/register"
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-blue-500/30"
                >
                  Student Sign Up
                </Link>
                <Link
                  to="/register?role=recruiter"
                  className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold text-sm rounded-xl transition border border-white/20"
                >
                  Post as Employer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
