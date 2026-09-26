import React from 'react';
import {
  GraduationCap,
  Briefcase,
  Layers,
  Code2,
  ShieldCheck,
  Zap,
  Users,
  Building,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/60 px-3 py-1 rounded-md">
          About InternConnect
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-3 leading-tight">
          Empowering College Students to Land Impactful Internships & Jobs
        </h1>
        <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          InternConnect is a full-stack campus placement and career enablement portal engineered to
          connect college students with world-class tech recruiters and startups.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-card space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">For College Students</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Build your comprehensive academic profile, showcase technical projects and skills,
            bookmark interesting opportunities, and apply online with zero friction.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-card space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Building className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">For Recruiters</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Post verified internships and fresher jobs, filter and review applicants in a Kanban-style
            pipeline, and provide status updates with automated candidate alerts.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-card space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">For Administrators</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Platform governance, job posting moderation, comprehensive user management, and real-time
            system metrics for campus placement officers.
          </p>
        </div>
      </div>

      {/* Tech Stack Specs */}
      <div className="bg-slate-900 dark:bg-slate-900/90 border border-transparent dark:border-slate-800 text-white rounded-3xl p-8 sm:p-12">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950 px-3 py-1 rounded-md">
            Full Stack Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3">
            Built with Modern MERN Stack
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            Engineered with industry-standard patterns, clean component design, secure JWT tokens, and
            modular Express REST architecture.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
              <span className="text-[10px] uppercase font-bold text-blue-400">Frontend</span>
              <h4 className="text-sm font-bold text-white mt-1">React 18 + Vite</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Tailwind CSS & Lucide</p>
            </div>

            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
              <span className="text-[10px] uppercase font-bold text-indigo-400">Backend</span>
              <h4 className="text-sm font-bold text-white mt-1">Node.js + Express</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">RESTful APIs</p>
            </div>

            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
              <span className="text-[10px] uppercase font-bold text-emerald-400">Database</span>
              <h4 className="text-sm font-bold text-white mt-1">MongoDB</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Mongoose ODM</p>
            </div>

            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
              <span className="text-[10px] uppercase font-bold text-amber-400">Security</span>
              <h4 className="text-sm font-bold text-white mt-1">JWT + Bcrypt</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Role Authorization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
