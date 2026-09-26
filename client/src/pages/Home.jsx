import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  Zap,
  Flame,
  Star,
  Compass,
} from 'lucide-react';
import { jobService } from '../services/jobService';
import JobCard from '../components/JobCard';
import Loader from '../components/Loader';
import SkillMatcherWidget from '../components/SkillMatcherWidget';
import { getCompanyLogo } from '../utils/helpers';

const categoryIcons = {
  'Software Development': Code,
  'Web Development': Laptop,
  'Data Science & AI': Cpu,
  'UI/UX Design': Palette,
  'Cloud & DevOps': Shield,
  'Business Analytics': BarChart3,
};

// Motion animation presets
const fadeInUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const floatAnimation = (delay = 0, yOffset = 8) => ({
  y: [-yOffset, yOffset, -yOffset],
  transition: {
    duration: 5,
    repeat: Infinity,
    repeatType: 'mirror',
    ease: 'easeInOut',
    delay,
  },
});

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
    <div className="space-y-20 sm:space-y-28 pb-20 overflow-x-hidden">
      {/* 1. HERO SECTION WITH VIBRANT TECH GRID, AURORA GLOW & INTERACTIVE SKILL MATCHER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-transparent dark:from-blue-950/40 dark:via-slate-900/60 dark:to-transparent pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-slate-100 dark:border-slate-800 transition-colors duration-200">
        
        {/* Layer 1: High-Tech Blueprint Geometric Grid */}
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none -z-10" />

        {/* Layer 2: Radiant Aurora Mesh Orbs */}
        <div className="absolute -top-16 left-1/4 w-[680px] h-[400px] bg-gradient-to-tr from-blue-500/20 via-indigo-500/20 to-cyan-400/20 blur-[100px] -z-10 rounded-full pointer-events-none animate-pulse-glow" />
        <div className="absolute top-28 right-10 w-[550px] h-[420px] bg-gradient-to-bl from-purple-500/18 via-pink-400/15 to-indigo-400/15 blur-[110px] -z-10 rounded-full pointer-events-none animate-pulse-glow" style={{ animationDelay: '3s' }} />
        <div className="absolute -bottom-20 left-10 w-[500px] h-[350px] bg-cyan-400/15 blur-[90px] -z-10 rounded-full pointer-events-none" />

        {/* Decorative Floating Career Badges */}
        <motion.div
          animate={floatAnimation(0, 10)}
          className="hidden xl:flex absolute top-16 left-8 items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 shadow-md text-xs font-semibold text-slate-700 dark:text-slate-200 pointer-events-none -z-10"
        >
          <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold">
            <Code className="w-3.5 h-3.5" />
          </div>
          <span>Frontend & Fullstack</span>
        </motion.div>

        <motion.div
          animate={floatAnimation(2, 12)}
          className="hidden xl:flex absolute bottom-12 left-1/3 items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 shadow-md text-xs font-semibold text-slate-700 dark:text-slate-200 pointer-events-none -z-10"
        >
          <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
          <span>100% Verified Stipends</span>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-7 text-center lg:text-left space-y-6"
            >
              {/* Live Status Badge */}
              <motion.div variants={fadeInUp} className="inline-flex">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-blue-200/90 dark:border-blue-900/60 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-semibold shadow-sm hover:border-blue-300 dark:hover:border-blue-700 transition">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600 dark:bg-blue-400"></span>
                  </span>
                  <span className="font-bold">Fall 2026 Cohort Active</span>
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                  <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    {featuredData.metrics.totalActiveJobs || 8}+ Verified Opportunities
                  </span>
                </div>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12]"
              >
                Launch Your Career with Next-Gen{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                  Internships & Jobs
                </span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                variants={fadeInUp}
                className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
              >
                The dedicated launchpad connecting ambitious college students, freshers, and top tech recruiters with zero friction and verified openings.
              </motion.p>

              {/* Search Bar Container */}
              <motion.form
                variants={fadeInUp}
                onSubmit={handleSearch}
                className="max-w-2xl mx-auto lg:mx-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-2 rounded-2xl sm:rounded-3xl shadow-xl shadow-blue-500/10 border border-slate-200/90 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all flex flex-col sm:flex-row items-center gap-2 group"
              >
                <div className="flex-1 flex items-center gap-3 px-4 py-2.5 w-full">
                  <Search className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors shrink-0" />
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Role, skills (e.g. React, Python, UI/UX), or company..."
                    className="w-full bg-transparent text-sm sm:text-base text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl sm:rounded-2xl transition shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  <Link
                    to="/jobs?type=Internship"
                    className="hidden sm:inline-flex px-4 py-3.5 bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm rounded-xl sm:rounded-2xl transition whitespace-nowrap"
                  >
                    Internships
                  </Link>
                </div>
              </motion.form>

              {/* Popular Search Tags */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1"
              >
                <span className="font-semibold text-slate-400 dark:text-slate-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  Trending:
                </span>
                {['React.js', 'Python AI', 'Full Stack', 'Data Science', 'UI/UX', 'Remote'].map(
                  (tag, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.06, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to={`/jobs?q=${encodeURIComponent(tag)}`}
                        className="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-800/90 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 transition-all font-medium shadow-xs"
                      >
                        {tag}
                      </Link>
                    </motion.div>
                  )
                )}
              </motion.div>

              {/* Quick Metrics Bar */}
              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/70 dark:border-slate-800 max-w-lg mx-auto lg:mx-0"
              >
                <div className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {featuredData.metrics.totalActiveJobs || 8}+
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Active Openings</div>
                </div>
                <div className="text-center lg:text-left border-x border-slate-200/70 dark:border-slate-800 px-2 sm:px-4">
                  <div className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400">
                    {featuredData.metrics.totalCompanies || 6}+
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Hiring Techs</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">100%</div>
                  <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Free for Students</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Interactive Skill Matcher Hero Widget */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <SkillMatcherWidget />
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. POPULAR INTERNSHIP CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <motion.div variants={fadeInUp}>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-md">
                Explore Fields
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
                Popular Internship Categories
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Discover opportunities across modern engineering, product, design, and AI.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Link
                to="/jobs"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group"
              >
                View All Categories
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </motion.div>
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
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={`/jobs?category=${encodeURIComponent(cat.query)}`}
                    className="group p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-xl hover:shadow-blue-500/10 transition-all text-center flex flex-col items-center justify-center relative overflow-hidden"
                  >
                    <div className="w-13 h-13 rounded-2xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 group-hover:bg-gradient-to-tr group-hover:text-white group-hover:from-blue-600 group-hover:to-indigo-600 flex items-center justify-center transition-all duration-300 mb-3 shadow-xs group-hover:shadow-md group-hover:shadow-blue-500/20">
                      <IconComponent className="w-6 h-6 transition-transform group-hover:scale-110" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {cat.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 dark:text-slate-400 mt-1 font-medium">{cat.count}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* 3. LATEST OPPORTUNITIES (TABS: INTERNSHIPS / JOBS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <motion.div variants={fadeInUp}>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-md">
                Recent Postings
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
                Featured Opportunities
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Hand-picked verified openings with active hiring processes.
              </p>
            </motion.div>

            {/* Switch Tab with smooth layout transition */}
            <motion.div variants={fadeInUp} className="flex items-center p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit border border-slate-200/80 dark:border-slate-700">
              <button
                onClick={() => setActiveTab('internships')}
                className={`relative px-5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === 'internships' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {activeTab === 'internships' && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl shadow-sm"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Latest Internships</span>
              </button>
              <button
                onClick={() => setActiveTab('jobs')}
                className={`relative px-5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === 'jobs' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {activeTab === 'jobs' && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl shadow-sm"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Latest Jobs</span>
              </button>
            </motion.div>
          </div>

          {loading ? (
            <Loader message="Fetching latest opportunities..." />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {(activeTab === 'internships'
                  ? featuredData.latestInternships
                  : featuredData.latestJobs
                ).map((job) => (
                  <motion.div
                    key={job._id}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <JobCard job={job} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          <div className="mt-10 text-center">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Link
                to={activeTab === 'internships' ? '/jobs?type=Internship' : '/jobs?type=Full-time'}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 text-slate-800 dark:text-slate-100 font-bold text-sm rounded-2xl transition shadow-sm hover:shadow-md cursor-pointer"
              >
                Explore All {activeTab === 'internships' ? 'Internships' : 'Jobs'}
                <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 4. TOP HIRING ENTERPRISES & STARTUPS WITH DARK GLASS & HOVERS */}
      <section className="bg-slate-900 dark:bg-slate-950 text-white py-20 relative overflow-hidden border-y border-slate-800 transition-colors duration-200">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 border border-blue-800/80 px-3.5 py-1 rounded-full">
              Trusted Employers
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
              Top Companies Hiring Freshers
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              From Fortune 500 tech consulting leaders to hyper-growth product startups.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5"
          >
            {featuredData.topCompanies.map((comp) => (
              <motion.div
                key={comp._id}
                variants={fadeInUp}
                whileHover={{ y: -6, borderColor: '#3b82f6' }}
                transition={{ duration: 0.2 }}
                className="bg-slate-800/90 dark:bg-slate-900/90 hover:bg-slate-800 border border-slate-700/60 dark:border-slate-800 p-5 rounded-2xl flex flex-col items-center text-center transition-all group shadow-lg"
              >
                <img
                  src={getCompanyLogo(comp.logo, comp.companyName)}
                  alt={comp.companyName}
                  className="w-14 h-14 rounded-xl object-contain bg-white p-1.5 border border-slate-700 dark:border-slate-800 mb-3 group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = getCompanyLogo('', comp.companyName);
                  }}
                />
                <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-blue-400 transition-colors">
                  {comp.companyName}
                </h4>
                <span className="text-[10px] text-slate-400 mt-1">{comp.location ? comp.location.split(',')[0] : 'India'}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. HOW IT WORKS WITH PROGRESSIVE STEPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeInUp}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-md">
            Simple 3-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
            How InternConnect Works
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Streamlined workflow designed for zero friction campus recruiting.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              step: '1',
              title: 'Create Student Profile',
              desc: 'Sign up with your college details, degree, skills, and upload your resume to build a standout candidate profile.',
              color: 'from-blue-500 to-blue-700',
              shadow: 'shadow-blue-500/20',
            },
            {
              step: '2',
              title: 'Explore & 1-Click Apply',
              desc: 'Filter listings by stipend, work mode, or tech stack and submit applications directly to recruiters.',
              color: 'from-indigo-500 to-indigo-700',
              shadow: 'shadow-indigo-500/20',
            },
            {
              step: '3',
              title: 'Track & Get Hired',
              desc: 'Receive live notification updates when shortlisted or invited for interviews with verified feedback.',
              color: 'from-emerald-500 to-teal-700',
              shadow: 'shadow-emerald-500/20',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100/60 dark:shadow-none hover:shadow-2xl hover:border-blue-200 dark:hover:border-blue-700/50 transition-all text-center relative group"
            >
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} text-white font-black text-lg flex items-center justify-center mx-auto mb-5 shadow-lg ${item.shadow} group-hover:scale-110 transition-transform`}
              >
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 6. WHY INTERNCONNECT WITH GLOWING CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeInUp}
          className="bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl"
        >
          {/* Subtle orb in CTA */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-blue-800/60 px-3 py-1 rounded-md">
                Why InternConnect?
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mt-4 leading-tight">
                Designed specifically for collegiate talent & ambitious recruiters.
              </h2>
              <div className="mt-8 space-y-4">
                {[
                  {
                    title: 'Verified Opportunities',
                    desc: 'All internship & job postings are reviewed to prevent scams and spam.',
                  },
                  {
                    title: 'Automated Status Tracking',
                    desc: 'Know exactly where your application stands at every stage of the pipeline.',
                  },
                  {
                    title: 'Skill-based Recommendations',
                    desc: 'Get smart suggestions tailored to your coursework and programming skills.',
                  },
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">{feature.title}</h4>
                      <p className="text-xs text-slate-300 mt-0.5">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-center space-y-5 shadow-xl">
              <h3 className="text-xl font-bold text-white">Ready to Launch Your Career?</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Join students from over 100+ colleges across India discovering real-world opportunities with zero spam.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Link
                    to="/register"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-blue-500/30"
                  >
                    Student Sign Up
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Link
                    to="/register?role=recruiter"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold text-sm rounded-xl transition border border-white/20"
                  >
                    Post as Employer
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
