import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Building2,
  MapPin,
  GraduationCap,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DRIVES = [
  {
    id: 1,
    company: 'Tata Consultancy Services (TCS)',
    driveTitle: 'TCS National Qualifier Test (NQT) & Digital Campus Drive',
    batch: '2025 & 2026 Batch',
    eligibleDegrees: 'B.Tech / B.E / MCA / M.Tech (All Engineering Branches)',
    rounds: 'Online Cognitive Test ➔ Technical Interview ➔ HR Interview',
    driveDate: 'Oct 15, 2026',
    deadline: 'Oct 05, 2026',
    status: 'Registrations Open',
    package: '3.6 - 7.5 LPA',
    mode: 'Virtual / Online Assessment',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&auto=format&fit=crop&q=60',
  },
  {
    id: 2,
    company: 'Infosys',
    driveTitle: 'Infosys Springboard Specialist Programmer Drive',
    batch: '2026 Batch',
    eligibleDegrees: 'CSE / IT / ECE / Data Science with 65%+ Aggregate',
    rounds: 'Coding Challenge (3 Problems) ➔ Tech Evaluation ➔ Offer',
    driveDate: 'Oct 22, 2026',
    deadline: 'Oct 12, 2026',
    status: 'Registrations Open',
    package: '6.5 - 9.5 LPA',
    mode: 'Hybrid (Campus + Online)',
    logo: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=150&auto=format&fit=crop&q=60',
  },
  {
    id: 3,
    company: 'Razorpay',
    driveTitle: 'Fintech Engineering Fellowship & Summer Internship 2026',
    batch: 'Pre-final Year (2026 Batch)',
    eligibleDegrees: 'Any student with proven Full-Stack or Systems projects',
    rounds: 'Take-home Assignment ➔ System Design Interview ➔ Culture Fit',
    driveDate: 'Nov 02, 2026',
    deadline: 'Oct 25, 2026',
    status: 'Shortlisting Soon',
    package: '₹40,000 / month Stipend (PPO: 18 LPA)',
    mode: 'Remote Hackathon',
    logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&auto=format&fit=crop&q=60',
  },
  {
    id: 4,
    company: 'Tech Mahindra',
    driveTitle: 'Campus Cloud & AI Specialist Hiring Program',
    batch: '2025 & 2026 Batch',
    eligibleDegrees: 'B.Tech / MCA with knowledge of Python or Java',
    rounds: 'Aptitude & Technical MCQ ➔ Coding Round ➔ Panel Interview',
    driveDate: 'Nov 12, 2026',
    deadline: 'Nov 01, 2026',
    status: 'Upcoming',
    package: '4.5 - 6.5 LPA',
    mode: 'College Campus Centers',
    logo: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=150&auto=format&fit=crop&q=60',
  },
];

const CampusDrives = () => {
  const [filterBatch, setFilterBatch] = useState('All');

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-semibold shadow-xs">
          <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Collegiate Placement Calendar</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Upcoming Campus Placement Drives
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          Track official national qualifying exams, pool campus drives, and summer internship recruitment schedules for 2025, 2026, and 2027 college batches.
        </p>
      </div>

      {/* Drives Grid */}
      <div className="space-y-6">
        {DRIVES.map((drive) => (
          <div
            key={drive.id}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm hover:shadow-xl dark:hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-600 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
          >
            {/* Left Info */}
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-xs border border-emerald-200 dark:border-emerald-800/60">
                  {drive.status}
                </span>
                <span className="px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold text-xs border border-blue-100 dark:border-blue-900/40">
                  {drive.batch}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{drive.mode}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug">
                {drive.driveTitle}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300 pt-1">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span><strong>Eligibility:</strong> {drive.eligibleDegrees}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                  <span><strong>Assessment Date:</strong> {drive.driveDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-rose-500 dark:text-rose-400 flex-shrink-0" />
                  <span><strong>Reg. Deadline:</strong> {drive.deadline}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span><strong>Compensation:</strong> {drive.package}</span>
                </div>
              </div>
            </div>

            {/* Right Action Box */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 flex-shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
              <Link
                to="/jobs"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-md shadow-blue-500/20 text-center flex items-center justify-center gap-2"
              >
                <span>View Eligible Roles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => alert(`Reminder set for ${drive.company} campus drive!`)}
                className="px-5 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm rounded-xl transition text-center border border-transparent dark:border-slate-700"
              >
                Set Calendar Reminder
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampusDrives;
