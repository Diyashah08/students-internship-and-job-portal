import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  BarChart3,
  IndianRupee,
  MapPin,
  Building2,
  Briefcase,
  GraduationCap,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

const DOMAIN_SALARIES = [
  {
    domain: 'Full Stack & Web Dev',
    avgStipend: '₹28,000 / mo',
    highestStipend: '₹50,000 / mo',
    fresherCTC: '6.5 - 14 LPA',
    growth: '+18% YoY',
    topTech: ['React.js', 'Node.js', 'Next.js', 'TypeScript'],
  },
  {
    domain: 'Data Science & AI / ML',
    avgStipend: '₹32,000 / mo',
    highestStipend: '₹60,000 / mo',
    fresherCTC: '8.0 - 18 LPA',
    growth: '+34% YoY',
    topTech: ['Python', 'PyTorch', 'LLMs', 'SQL'],
  },
  {
    domain: 'Cloud, DevOps & SRE',
    avgStipend: '₹30,000 / mo',
    highestStipend: '₹55,000 / mo',
    fresherCTC: '7.5 - 15 LPA',
    growth: '+22% YoY',
    topTech: ['AWS', 'Docker', 'Kubernetes', 'Linux'],
  },
  {
    domain: 'UI/UX & Product Design',
    avgStipend: '₹25,000 / mo',
    highestStipend: '₹45,000 / mo',
    fresherCTC: '6.0 - 12 LPA',
    growth: '+15% YoY',
    topTech: ['Figma', 'Prototyping', 'User Research'],
  },
  {
    domain: 'Core Java & Backend',
    avgStipend: '₹26,000 / mo',
    highestStipend: '₹42,000 / mo',
    fresherCTC: '5.5 - 11 LPA',
    growth: '+12% YoY',
    topTech: ['Java', 'Spring Boot', 'Microservices'],
  },
];

const CITY_METRICS = [
  { city: 'Bengaluru (Silicon Valley of India)', avgStipend: '₹30,500 / mo', openings: '45% of tech roles' },
  { city: 'Hyderabad', avgStipend: '₹26,000 / mo', openings: '22% of tech roles' },
  { city: 'Pune', avgStipend: '₹24,000 / mo', openings: '15% of tech roles' },
  { city: 'Delhi NCR (Gurugram / Noida)', avgStipend: '₹25,500 / mo', openings: '18% of tech roles' },
];

const SalaryInsights = () => {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-semibold shadow-xs">
          <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Campus Salary & Placement Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          2026 Student Stipend & CTC Benchmarks
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          Real compensation insights aggregated across verified college internship offers, tech hiring drives, and entry-level fresher roles.
        </p>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xl">
            ₹28k
          </div>
          <div>
            <div className="text-xs text-slate-400 dark:text-slate-400 font-semibold uppercase">Avg Tech Internship Stipend</div>
            <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">Across Tier-1/2 Colleges</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xl">
            7.8 LPA
          </div>
          <div>
            <div className="text-xs text-slate-400 dark:text-slate-400 font-semibold uppercase">Median Fresher CTC</div>
            <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">Campus Product Roles</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 flex items-center justify-center font-bold text-xl">
            94%
          </div>
          <div>
            <div className="text-xs text-slate-400 dark:text-slate-400 font-semibold uppercase">PPO Conversion Rate</div>
            <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">6-Month Internships</div>
          </div>
        </div>
      </div>

      {/* Domain Breakdown Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Domain Compensation Breakdown</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Based on active recruiter postings & campus drives</p>
          </div>
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-lg">
            Updated Fall 2026
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase text-[11px] font-bold border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="py-4 px-6">Domain / Field</th>
                <th className="py-4 px-6">Avg Stipend</th>
                <th className="py-4 px-6">Highest Stipend</th>
                <th className="py-4 px-6">Fresher CTC (Annual)</th>
                <th className="py-4 px-6">Demand Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {DOMAIN_SALARIES.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900 dark:text-white">{item.domain}</div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-400 mt-0.5">
                      {item.topTech.join(' • ')}
                    </div>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-800 dark:text-slate-200">{item.avgStipend}</td>
                  <td className="py-4 px-6 font-bold text-blue-600 dark:text-blue-400">{item.highestStipend}</td>
                  <td className="py-4 px-6 text-slate-700 dark:text-slate-300">{item.fresherCTC}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg text-xs">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {item.growth}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* City Comparison Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CITY_METRICS.map((c, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-semibold mb-2">
              <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{c.city}</span>
            </div>
            <div className="text-xl font-black text-slate-900 dark:text-white">{c.avgStipend}</div>
            <div className="text-[11px] text-slate-400 dark:text-slate-400 mt-1">{c.openings}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalaryInsights;
