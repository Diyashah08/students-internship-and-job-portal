import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Download,
  Printer,
  TrendingUp,
  Award,
  Users,
  Building2,
  CheckCircle2,
  BarChart3,
  PieChart,
  FileSpreadsheet,
  Briefcase,
  Sparkles,
} from 'lucide-react';

const TPO_KPIS = [
  { label: 'Total Eligible Batch', value: '540', sub: '2025 - 2026 Batch', color: 'from-blue-600 to-indigo-600' },
  { label: 'Total Placed / Offers', value: '502', sub: '93% Placement Rate', color: 'from-emerald-600 to-teal-600' },
  { label: 'Highest Package Offered', value: '₹24.5 LPA', sub: 'Razorpay / Fintech', color: 'from-purple-600 to-pink-600' },
  { label: 'Avg Tech Stipend', value: '₹28,500/mo', sub: 'Across 6-mo internships', color: 'from-amber-500 to-orange-600' },
];

const BRANCH_DATA = [
  { branch: 'Computer Science & Eng (CSE)', eligible: 180, placed: 175, rate: 97.2, avgPkg: '9.2 LPA' },
  { branch: 'Information Technology (IT)', eligible: 120, placed: 114, rate: 95.0, avgPkg: '8.4 LPA' },
  { branch: 'AI & Data Science (AIDS)', eligible: 90, placed: 87, rate: 96.6, avgPkg: '9.8 LPA' },
  { branch: 'Electronics & Comm (ECE)', eligible: 100, placed: 86, rate: 86.0, avgPkg: '6.8 LPA' },
  { branch: 'Master of Computer Apps (MCA)', eligible: 50, placed: 40, rate: 80.0, avgPkg: '6.2 LPA' },
];

const RECRUITER_DATA = [
  { company: 'Tata Consultancy Services (TCS)', hires: 42, roleType: 'Digital & Ninja', avgPay: '7.5 LPA' },
  { company: 'Infosys', hires: 38, roleType: 'Specialist Programmer', avgPay: '9.5 LPA' },
  { company: 'Accenture India', hires: 31, roleType: 'Advanced Tech Associate', avgPay: '8.0 LPA' },
  { company: 'Wipro Technologies', hires: 25, roleType: 'Project Engineer', avgPay: '6.5 LPA' },
  { company: 'Razorpay', hires: 8, roleType: 'Software Engineer', avgPay: '18.0 LPA' },
  { company: 'Tech Mahindra', hires: 18, roleType: 'Digital Associate', avgPay: '6.0 LPA' },
];

const TPOAnalytics = () => {
  const [selectedYear, setSelectedYear] = useState('2026');

  // 1-Click CSV Export for College TPO report
  const downloadCSVReport = () => {
    let csv = 'Branch,Eligible Students,Placed Students,Placement Rate (%),Average Package\n';
    BRANCH_DATA.forEach((b) => {
      csv += `"${b.branch}",${b.eligible},${b.placed},${b.rate}%,"${b.avgPkg}"\n`;
    });
    csv += '\nTop Hiring Companies,Offers Released,Role Categories,Average CTC\n';
    RECRUITER_DATA.forEach((r) => {
      csv += `"${r.company}",${r.hires},"${r.roleType}","${r.avgPay}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Campus_Placement_Report_${selectedYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Institutional TPO Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Training & Placement Cell (TPO) Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Official collegiate placement statistics, branch performance metrics, and NAAC/NBA accreditation data.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 outline-none"
          >
            <option value="2026">Batch 2026 (Current)</option>
            <option value="2025">Batch 2025</option>
          </select>

          <button
            onClick={downloadCSVReport}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 flex items-center gap-2 transition cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export CSV Report</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold shadow-md flex items-center gap-2 transition cursor-pointer border border-transparent dark:border-slate-700"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {TPO_KPIS.map((kpi, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all"
          >
            <div className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${kpi.color} text-white flex items-center justify-center font-bold text-sm shadow-md mb-4`}>
              {idx === 0 ? <Users className="w-5 h-5" /> : idx === 1 ? <CheckCircle2 className="w-5 h-5" /> : idx === 2 ? <Award className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{kpi.value}</div>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-1">{kpi.label}</div>
            <div className="text-[11px] text-slate-400 dark:text-slate-400 mt-0.5">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Branch Performance Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Branch-Wise Placement Summary</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Accreditation performance metrics across engineering departments</p>
          </div>
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 px-3 py-1 rounded-lg">
            Batch 2026 Overall: 93% Placed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase text-[11px] font-bold border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="py-4 px-6">Department / Branch</th>
                <th className="py-4 px-6">Eligible Students</th>
                <th className="py-4 px-6">Placed Students</th>
                <th className="py-4 px-6">Placement Progress</th>
                <th className="py-4 px-6">Average Package</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {BRANCH_DATA.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">{row.branch}</td>
                  <td className="py-4 px-6 text-slate-700 dark:text-slate-300">{row.eligible}</td>
                  <td className="py-4 px-6 font-bold text-slate-800 dark:text-slate-200">{row.placed}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2.5 rounded-full"
                          style={{ width: `${row.rate}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-blue-600 dark:text-blue-400 text-xs">{row.rate}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-black text-slate-900 dark:text-white">{row.avgPkg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Hiring Enterprises Matrix */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Major Enterprise Recruiters & Campus Drives</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Top hiring partners by student intake this placement season</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {RECRUITER_DATA.map((comp, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{comp.company}</h4>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{comp.roleType}</div>
                <div className="text-xs font-black text-blue-600 dark:text-blue-400 mt-1">Avg CTC: {comp.avgPay}</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-black text-slate-900 dark:text-white">{comp.hires}</div>
                <div className="text-[10px] text-slate-400 dark:text-slate-400 font-semibold uppercase">Offers</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TPOAnalytics;
