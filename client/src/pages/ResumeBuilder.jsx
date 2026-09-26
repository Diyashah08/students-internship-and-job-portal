import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  Printer,
  Sparkles,
  User,
  GraduationCap,
  Briefcase,
  Code,
  Award,
  Plus,
  Trash2,
  RefreshCw,
  FileText,
  Check,
  Globe,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const INITIAL_RESUME_DATA = {
  fullName: 'Aarav Patel',
  roleTitle: 'Full Stack MERN Developer | Computer Science Undergrad',
  email: 'aarav.patel@demo.com',
  phone: '+91 98765 43210',
  location: 'Mumbai / Bengaluru, India',
  linkedin: 'linkedin.com/in/aarav-patel',
  github: 'github.com/aaravpatel-dev',
  portfolio: 'aaravpatel.dev',
  summary:
    'Passionate Pre-Final Year CS student with hands-on expertise building production MERN web applications, REST APIs, and responsive UIs. Looking for high-impact Summer 2026 Internship opportunities.',
  education: [
    {
      institution: 'Indian Institute of Technology (IIT Bombay)',
      degree: 'B.Tech in Computer Science & Engineering',
      duration: '2022 - 2026',
      cgpa: '8.8 / 10.0',
    },
  ],
  skills: {
    languages: 'JavaScript (ES6+), Python, C++, SQL, HTML5, CSS3',
    frameworks: 'React.js, Node.js, Express.js, Tailwind CSS, Next.js',
    tools: 'Git, GitHub, MongoDB, Docker, Postman, Vite, Vercel',
  },
  projects: [
    {
      title: 'InternConnect - Campus Internship Portal',
      techStack: 'React.js, Node.js, Express, MongoDB, Tailwind CSS',
      link: 'https://github.com/aaravpatel-dev/internconnect',
      highlights: [
        'Architected full-stack portal with role-based auth for 500+ students and recruiters.',
        'Engineered responsive applicant tracking pipeline reducing screening time by 30%.',
        'Implemented fast-loading RESTful APIs with MongoDB indexing and aggregation pipelines.',
      ],
    },
    {
      title: 'Real-Time Collaborative Code Editor',
      techStack: 'React, Node.js, Socket.io, Monaco Editor',
      link: 'https://github.com/aaravpatel-dev/collab-code',
      highlights: [
        'Built sub-100ms low-latency multi-user code synchronization room using WebSockets.',
        'Supported syntax highlighting across 10+ programming languages with live execution.',
      ],
    },
  ],
  experience: [
    {
      company: 'TechNovation Labs',
      role: 'Frontend Developer Intern',
      duration: 'Jun 2025 - Aug 2025',
      location: 'Remote',
      highlights: [
        'Developed 12+ reusable UI components with React and Tailwind reducing bundle size by 18%.',
        'Integrated third-party analytics dashboards improving customer onboarding conversion by 15%.',
      ],
    },
  ],
  certifications: [
    'Meta Certified Frontend Developer (Coursera)',
    'HackerRank Problem Solving (Intermediate) Certificate',
  ],
};

const ResumeBuilder = () => {
  const { user } = useAuth();
  const [resumeData, setResumeData] = useState({
    ...INITIAL_RESUME_DATA,
    fullName: user?.name || INITIAL_RESUME_DATA.fullName,
    email: user?.email || INITIAL_RESUME_DATA.email,
  });

  const [activeTab, setActiveTab] = useState('personal');
  const [template, setTemplate] = useState('modern'); // 'modern' | 'minimal' | 'executive'

  const handlePrint = () => {
    window.print();
  };

  // Helper handlers
  const updateField = (field, value) => {
    setResumeData((prev) => ({ ...prev, [field]: value }));
  };

  const updateSkill = (type, val) => {
    setResumeData((prev) => ({
      ...prev,
      skills: { ...prev.skills, [type]: val },
    }));
  };

  const addProject = () => {
    setResumeData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          title: 'New High-Impact Project',
          techStack: 'React, Node.js, Tailwind',
          link: 'https://github.com/username/project',
          highlights: ['Built responsive full-stack application with authentication and cloud database.'],
        },
      ],
    }));
  };

  const removeProject = (index) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const updateProjectField = (index, field, value) => {
    setResumeData((prev) => {
      const updated = [...prev.projects];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, projects: updated };
    });
  };

  const updateProjectHighlight = (pIdx, hIdx, value) => {
    setResumeData((prev) => {
      const updated = [...prev.projects];
      const hUpdated = [...updated[pIdx].highlights];
      hUpdated[hIdx] = value;
      updated[pIdx].highlights = hUpdated;
      return { ...prev, projects: updated };
    });
  };

  const addProjectHighlight = (pIdx) => {
    setResumeData((prev) => {
      const updated = [...prev.projects];
      updated[pIdx].highlights.push('Implemented performance optimization improving response time.');
      return { ...prev, projects: updated };
    });
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Screen-Only Header */}
      <div className="print:hidden flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-blue-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Campus Placement Tool #1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Interactive ATS Resume Builder & PDF Exporter
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Build a clean, recruiter-approved one-page resume. Optimized for ATS filters with 1-click PDF download.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setResumeData(INITIAL_RESUME_DATA)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-500/25 flex items-center gap-2 transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Form Inputs (Hidden during Print) & Live Paper Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Input Form Tabs (Screen Only) */}
        <div className="print:hidden lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-5">
          {/* Template Switcher */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Style Template:</span>
            <div className="flex gap-1.5">
              {[
                { id: 'modern', label: 'Modern Tech' },
                { id: 'minimal', label: 'Minimalist' },
                { id: 'executive', label: 'Executive' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    template === t.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form Navigation Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
            {[
              { id: 'personal', label: 'Personal' },
              { id: 'education', label: 'Education' },
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'experience', label: 'Experience' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition text-center ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form Content by Active Tab */}
          <div className="space-y-4 max-h-[580px] overflow-y-auto pr-1">
            {/* 1. PERSONAL TAB */}
            {activeTab === 'personal' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={resumeData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Role Headline</label>
                  <input
                    type="text"
                    value={resumeData.roleTitle}
                    onChange={(e) => updateField('roleTitle', e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Email</label>
                    <input
                      type="email"
                      value={resumeData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Phone</label>
                    <input
                      type="text"
                      value={resumeData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Location</label>
                    <input
                      type="text"
                      value={resumeData.location}
                      onChange={(e) => updateField('location', e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">GitHub / Portfolio</label>
                    <input
                      type="text"
                      value={resumeData.github}
                      onChange={(e) => updateField('github', e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Professional Summary</label>
                  <textarea
                    rows={4}
                    value={resumeData.summary}
                    onChange={(e) => updateField('summary', e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-500 outline-none leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* 2. EDUCATION TAB */}
            {activeTab === 'education' && (
              <div className="space-y-3 text-xs">
                {resumeData.education.map((edu, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">College / University</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => {
                          const updated = [...resumeData.education];
                          updated[idx].institution = e.target.value;
                          setResumeData({ ...resumeData, education: updated });
                        }}
                        className="w-full p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Degree & Major</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => {
                          const updated = [...resumeData.education];
                          updated[idx].degree = e.target.value;
                          setResumeData({ ...resumeData, education: updated });
                        }}
                        className="w-full p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Graduation Year</label>
                        <input
                          type="text"
                          value={edu.duration}
                          onChange={(e) => {
                            const updated = [...resumeData.education];
                            updated[idx].duration = e.target.value;
                            setResumeData({ ...resumeData, education: updated });
                          }}
                          className="w-full p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">CGPA / Percentage</label>
                        <input
                          type="text"
                          value={edu.cgpa}
                          onChange={(e) => {
                            const updated = [...resumeData.education];
                            updated[idx].cgpa = e.target.value;
                            setResumeData({ ...resumeData, education: updated });
                          }}
                          className="w-full p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 3. SKILLS TAB */}
            {activeTab === 'skills' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Programming Languages</label>
                  <input
                    type="text"
                    value={resumeData.skills.languages}
                    onChange={(e) => updateSkill('languages', e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Frameworks & Libraries</label>
                  <input
                    type="text"
                    value={resumeData.skills.frameworks}
                    onChange={(e) => updateSkill('frameworks', e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Developer Tools & Platforms</label>
                  <input
                    type="text"
                    value={resumeData.skills.tools}
                    onChange={(e) => updateSkill('tools', e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
            )}

            {/* 4. PROJECTS TAB */}
            {activeTab === 'projects' && (
              <div className="space-y-4 text-xs">
                {resumeData.projects.map((proj, pIdx) => (
                  <div key={pIdx} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 relative">
                    <button
                      onClick={() => removeProject(pIdx)}
                      className="absolute top-3 right-3 text-slate-400 hover:text-rose-500 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Project Name</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => updateProjectField(pIdx, 'title', e.target.value)}
                        className="w-full p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Tech Stack</label>
                      <input
                        type="text"
                        value={proj.techStack}
                        onChange={(e) => updateProjectField(pIdx, 'techStack', e.target.value)}
                        className="w-full p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Bullet Point Highlights</label>
                      {proj.highlights.map((hl, hIdx) => (
                        <input
                          key={hIdx}
                          type="text"
                          value={hl}
                          onChange={(e) => updateProjectHighlight(pIdx, hIdx, e.target.value)}
                          className="w-full p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white mb-1.5 outline-none focus:border-blue-500"
                        />
                      ))}
                      <button
                        type="button"
                        onClick={() => addProjectHighlight(pIdx)}
                        className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1 mt-1"
                      >
                        <Plus className="w-3 h-3" /> Add Highlight
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addProject}
                  className="w-full py-2.5 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <Plus className="w-4 h-4" /> Add Another Project
                </button>
              </div>
            )}

            {/* 5. EXPERIENCE TAB */}
            {activeTab === 'experience' && (
              <div className="space-y-4 text-xs">
                {resumeData.experience.map((exp, expIdx) => (
                  <div key={expIdx} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            const updated = [...resumeData.experience];
                            updated[expIdx].company = e.target.value;
                            setResumeData({ ...resumeData, experience: updated });
                          }}
                          className="w-full p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Role</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => {
                            const updated = [...resumeData.experience];
                            updated[expIdx].role = e.target.value;
                            setResumeData({ ...resumeData, experience: updated });
                          }}
                          className="w-full p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Duration & Location</label>
                      <input
                        type="text"
                        value={`${exp.duration} | ${exp.location}`}
                        onChange={(e) => {
                          const updated = [...resumeData.experience];
                          updated[expIdx].duration = e.target.value;
                          setResumeData({ ...resumeData, experience: updated });
                        }}
                        className="w-full p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Live A4 Resume Paper Preview (Both Screen & Print) */}
        <div className="lg:col-span-7 flex justify-center w-full">
          <div
            id="printable-resume"
            className={`w-full max-w-[800px] bg-white text-slate-900 shadow-2xl print:shadow-none p-8 sm:p-12 rounded-3xl print:rounded-none border border-slate-200 print:border-none min-h-[1050px] space-y-5 font-sans leading-normal ${
              template === 'minimal'
                ? 'font-serif'
                : template === 'executive'
                ? 'border-t-8 border-t-slate-800'
                : 'border-t-8 border-t-blue-600'
            }`}
          >
            {/* Header / Contact */}
            <div className="border-b border-slate-200 pb-4 text-center sm:text-left flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {resumeData.fullName}
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-blue-700 mt-0.5">
                  {resumeData.roleTitle}
                </p>
              </div>

              {/* Contact Icons */}
              <div className="text-[11px] text-slate-600 space-y-0.5 sm:text-right font-medium">
                <div>{resumeData.email} • {resumeData.phone}</div>
                <div>{resumeData.location}</div>
                <div className="text-blue-600 font-semibold">
                  {resumeData.github} • {resumeData.linkedin}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-1.5">
                Professional Profile
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">
                {resumeData.summary}
              </p>
            </div>

            {/* Technical Skills */}
            <div>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-1.5">
                Technical Skills
              </h2>
              <div className="text-xs text-slate-700 space-y-1">
                <div>
                  <strong className="text-slate-900">Languages:</strong> {resumeData.skills.languages}
                </div>
                <div>
                  <strong className="text-slate-900">Frameworks:</strong> {resumeData.skills.frameworks}
                </div>
                <div>
                  <strong className="text-slate-900">Developer Tools:</strong> {resumeData.skills.tools}
                </div>
              </div>
            </div>

            {/* Projects */}
            <div>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2">
                Key Technical Projects
              </h2>
              <div className="space-y-3">
                {resumeData.projects.map((proj, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">
                        {proj.title} <span className="font-normal text-slate-500">| {proj.techStack}</span>
                      </span>
                      <span className="text-[11px] text-blue-600 font-mono">{proj.link}</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-slate-700 space-y-0.5 pl-1">
                      {proj.highlights.map((hl, hIdx) => (
                        <li key={hIdx}>{hl}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience / Internships */}
            {resumeData.experience.length > 0 && (
              <div>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2">
                  Internship Experience
                </h2>
                <div className="space-y-2">
                  {resumeData.experience.map((exp, idx) => (
                    <div key={idx} className="text-xs space-y-1">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{exp.role} — {exp.company}</span>
                        <span className="font-normal text-slate-500">{exp.duration}</span>
                      </div>
                      <ul className="list-disc list-inside text-slate-700 space-y-0.5 pl-1">
                        {exp.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            <div>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-1.5">
                Education
              </h2>
              <div className="space-y-1.5">
                {resumeData.education.map((edu, idx) => (
                  <div key={idx} className="flex justify-between items-start text-xs">
                    <div>
                      <div className="font-bold text-slate-900">{edu.institution}</div>
                      <div className="text-slate-600">{edu.degree}</div>
                    </div>
                    <div className="text-right text-slate-600">
                      <div>{edu.duration}</div>
                      <div className="font-bold text-slate-800">CGPA: {edu.cgpa}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-1">
                Honors & Certifications
              </h2>
              <ul className="list-disc list-inside text-xs text-slate-700 space-y-0.5 pl-1">
                {resumeData.certifications.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ResumeBuilder;
