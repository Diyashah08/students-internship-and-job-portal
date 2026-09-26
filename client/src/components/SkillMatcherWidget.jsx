import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Briefcase,
  TrendingUp,
  ArrowRight,
  Check,
  CheckCircle2,
  Building2,
  MapPin,
  IndianRupee,
  Layers,
  Zap,
} from 'lucide-react';

const SKILLS_LIST = [
  { id: 'react', name: 'React.js', category: 'Frontend', count: 14, stipend: '₹25k - ₹40k' },
  { id: 'python', name: 'Python AI', category: 'AI & Data', count: 9, stipend: '₹22k - ₹45k' },
  { id: 'nodejs', name: 'Node.js', category: 'Backend', count: 11, stipend: '₹28k - ₹42k' },
  { id: 'figma', name: 'UI/UX (Figma)', category: 'Design', count: 6, stipend: '₹20k - ₹35k' },
  { id: 'java', name: 'Java / Spring', category: 'Enterprise', count: 8, stipend: '₹25k - ₹38k' },
  { id: 'cloud', name: 'Cloud & DevOps', category: 'Cloud', count: 7, stipend: '₹30k - ₹50k' },
];

const SAMPLE_ROLES = {
  react: {
    title: 'React.js Frontend Intern',
    company: 'Infosys',
    stipend: '₹25,000 / mo',
    location: 'Bengaluru / Hybrid',
    tag: 'Popular',
    query: 'React',
  },
  python: {
    title: 'AI & Python Intern',
    company: 'Wipro Technologies',
    stipend: '₹22,000 / mo',
    location: 'Hyderabad / On-site',
    tag: 'High Demand',
    query: 'Python',
  },
  nodejs: {
    title: 'Full Stack MERN Intern',
    company: 'Tata Consultancy Services',
    stipend: '₹30,000 / mo',
    location: 'Remote / Virtual',
    tag: 'Top Pick',
    query: 'Full Stack',
  },
  figma: {
    title: 'UI/UX Product Design Intern',
    company: 'Razorpay',
    stipend: '₹35,000 / mo',
    location: 'Bengaluru / Remote',
    tag: 'Creative',
    query: 'UI/UX',
  },
  java: {
    title: 'Java Microservices Intern',
    company: 'Accenture India',
    stipend: '₹28,000 / mo',
    location: 'Pune / Hybrid',
    tag: 'Enterprise',
    query: 'Java',
  },
  cloud: {
    title: 'Cloud & DevOps Intern',
    company: 'Tech Mahindra',
    stipend: '₹30,000 / mo',
    location: 'Noida / Remote',
    tag: 'Fast Track',
    query: 'Cloud',
  },
};

const SkillMatcherWidget = () => {
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState(['react', 'nodejs']);
  const [opportunityType, setOpportunityType] = useState('internship');

  const toggleSkill = (id) => {
    setSelectedSkills((prev) => {
      if (prev.includes(id)) {
        // Keep at least one skill selected
        return prev.length > 1 ? prev.filter((s) => s !== id) : prev;
      } else {
        return [...prev, id];
      }
    });
  };

  // Calculated stats based on selected skills
  const calculatedStats = useMemo(() => {
    const totalCount = selectedSkills.reduce((acc, curr) => {
      const skillObj = SKILLS_LIST.find((s) => s.id === curr);
      return acc + (skillObj ? skillObj.count : 5);
    }, 0);

    const primarySkill = selectedSkills[0] || 'react';
    const previewRole = SAMPLE_ROLES[primarySkill] || SAMPLE_ROLES.react;

    let stipendDisplay = '₹25,000 - ₹50,000';
    if (selectedSkills.includes('cloud') || selectedSkills.includes('python')) {
      stipendDisplay = '₹35,000 - ₹65,000';
    } else if (selectedSkills.includes('nodejs') && selectedSkills.includes('react')) {
      stipendDisplay = '₹30,000 - ₹55,000';
    }

    const matchScore = Math.min(98, 70 + selectedSkills.length * 6);

    return {
      totalCount,
      previewRole,
      stipendDisplay,
      matchScore,
    };
  }, [selectedSkills]);

  const handleExplore = () => {
    const firstSkillObj = SKILLS_LIST.find((s) => s.id === selectedSkills[0]);
    const query = firstSkillObj ? firstSkillObj.name.split(' ')[0] : 'React';
    navigate(`/jobs?q=${encodeURIComponent(query)}&type=${opportunityType === 'internship' ? 'Internship' : 'Full-time'}`);
  };

  return (
    <div className="relative w-full rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800 shadow-2xl shadow-blue-500/10 p-5 sm:p-7 overflow-hidden transition-colors duration-200">
      {/* Background soft ambient radial gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-400/20 via-indigo-400/15 to-transparent rounded-full blur-2xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-400/15 via-pink-400/10 to-transparent rounded-full blur-2xl pointer-events-none -z-10" />

      {/* Widget Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/70 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Interactive Career Matcher
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
            Pick your skills to see live openings
          </h3>
        </div>

        {/* Opportunity Type Switcher */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/70 dark:border-slate-700 text-xs font-bold">
          <button
            onClick={() => setOpportunityType('internship')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              opportunityType === 'internship'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Internship
          </button>
          <button
            onClick={() => setOpportunityType('job')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              opportunityType === 'job'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Full-Time
          </button>
        </div>
      </div>

      {/* Clickable Skill Chips */}
      <div className="py-4">
        <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-2.5">
          Select Your Core Technologies:
        </div>
        <div className="flex flex-wrap gap-2">
          {SKILLS_LIST.map((skill) => {
            const isSelected = selectedSkills.includes(skill.id);
            return (
              <motion.button
                key={skill.id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleSkill(skill.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-500/20'
                    : 'bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700'
                }`}
              >
                {isSelected ? (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                )}
                <span>{skill.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Match Metrics Summary */}
      <div className="grid grid-cols-2 gap-3 py-3.5 px-4 bg-slate-50/80 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
        <div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Estimated Pay</div>
          <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-0.5">
            {calculatedStats.stipendDisplay}
          </div>
        </div>

        <div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Matching Openings</div>
          <div className="text-base sm:text-lg font-black text-blue-600 dark:text-blue-400 flex items-center gap-1 mt-0.5">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span>{calculatedStats.totalCount}+ Verified</span>
          </div>
        </div>
      </div>

      {/* Live Best Match Role Card */}
      <div className="mt-4">
        <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Top Matching Role for You:</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            {calculatedStats.matchScore}% Match
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={calculatedStats.previewRole.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700/80 shadow-sm hover:border-blue-300 dark:hover:border-blue-600 transition-all flex items-center justify-between gap-3 group"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 text-[10px] font-bold">
                  {calculatedStats.previewRole.tag}
                </span>
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-400 flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  {calculatedStats.previewRole.company}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {calculatedStats.previewRole.title}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-slate-400" />
                {calculatedStats.previewRole.location}
              </p>
            </div>

            <div className="text-right shrink-0">
              <div className="text-xs font-black text-slate-900 dark:text-white">
                {calculatedStats.previewRole.stipend}
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md mt-1 inline-block">
                Actively Hiring
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleExplore}
        className="mt-5 w-full py-3.5 px-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl sm:rounded-2xl transition shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 group cursor-pointer"
      >
        <span>Explore All {calculatedStats.totalCount}+ Matching Roles</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
      </motion.button>

      {/* Footer live ticker */}
      <div className="mt-3 text-center">
        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium flex items-center justify-center gap-1.5">
          <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
          <span>Updated in real-time from active college recruiters</span>
        </p>
      </div>
    </div>
  );
};

export default SkillMatcherWidget;
