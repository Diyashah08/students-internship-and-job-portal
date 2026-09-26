import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Award,
  Zap,
  ArrowRight,
  Copy,
  Check,
  RefreshCw,
  Search,
  BookOpen,
} from 'lucide-react';

const TARGET_ROLES = [
  {
    id: 'frontend',
    name: 'Frontend Developer (React / Web)',
    requiredSkills: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Git', 'REST API', 'Redux', 'TypeScript'],
    keywords: ['responsive design', 'component lifecycle', 'state management', 'performance optimization', 'cross-browser compatibility'],
  },
  {
    id: 'fullstack',
    name: 'Full Stack Developer (MERN)',
    requiredSkills: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST API', 'JavaScript', 'JWT', 'Git'],
    keywords: ['database indexing', 'crud operations', 'middleware', 'authentication', 'api security', 'cloud deployment'],
  },
  {
    id: 'python_ai',
    name: 'Python & AI / Data Science Intern',
    requiredSkills: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'SQL', 'Git', 'Data Visualization', 'Machine Learning'],
    keywords: ['data preprocessing', 'exploratory data analysis', 'model training', 'feature engineering', 'accuracy metric'],
  },
  {
    id: 'ui_ux',
    name: 'UI/UX Designer',
    requiredSkills: ['Figma', 'Wireframing', 'Prototyping', 'User Research', 'Design Systems', 'Usability Testing'],
    keywords: ['user persona', 'information architecture', 'design tokens', 'accessibility', 'wcag', 'high fidelity mockup'],
  },
  {
    id: 'java',
    name: 'Java Backend Developer',
    requiredSkills: ['Java', 'Spring Boot', 'MySQL', 'Hibernate', 'Microservices', 'REST API', 'Git', 'Docker'],
    keywords: ['object oriented programming', 'dependency injection', 'multithreading', 'jpa repository', 'unit testing'],
  },
];

const SAMPLE_RESUME = `Aarav Patel
Full Stack MERN Developer | Computer Science Student
Skills: React.js, JavaScript, Node.js, Express.js, MongoDB, HTML5, CSS3, Tailwind CSS, Git, GitHub, REST APIs
Experience & Projects:
- Developed an E-Commerce Web Portal using React, Node.js, and MongoDB with authentication.
- Built a Real-Time Chat App with Socket.io and Tailwind CSS.
- Optimized RESTful APIs reducing latency by 20%.
Education: B.Tech in Computer Science, IIT Bombay (Graduation 2025). Aggregate: 8.5 CGPA.`;

const ResumeAnalyzer = () => {
  const [selectedRole, setSelectedRole] = useState(TARGET_ROLES[0].id);
  const [resumeText, setResumeText] = useState(SAMPLE_RESUME);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const activeRoleData = TARGET_ROLES.find((r) => r.id === selectedRole) || TARGET_ROLES[0];

  const handleAnalyze = () => {
    if (!resumeText.trim()) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      const lowerText = resumeText.toLowerCase();

      // Check skills
      const matchedSkills = [];
      const missingSkills = [];

      activeRoleData.requiredSkills.forEach((skill) => {
        if (lowerText.includes(skill.toLowerCase())) {
          matchedSkills.push(skill);
        } else {
          missingSkills.push(skill);
        }
      });

      // Check keywords
      const matchedKeywords = activeRoleData.keywords.filter((kw) =>
        lowerText.includes(kw.toLowerCase())
      );

      // Score formula
      const skillScore = (matchedSkills.length / activeRoleData.requiredSkills.length) * 60;
      const kwScore = (matchedKeywords.length / activeRoleData.keywords.length) * 25;
      const lengthBonus = lowerText.length > 250 ? 15 : 8;
      const finalScore = Math.min(Math.round(skillScore + kwScore + lengthBonus), 99);

      setAnalysisResult({
        score: finalScore,
        matchedSkills,
        missingSkills,
        matchedKeywords,
        missingKeywords: activeRoleData.keywords.filter((kw) => !matchedKeywords.includes(kw)),
        wordCount: resumeText.trim().split(/\s+/).length,
      });

      setIsAnalyzing(false);
    }, 700);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-semibold shadow-xs">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Campus AI Placement Add-On</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          AI Resume & ATS Score Analyzer
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          Check how your student resume ranks against real-world recruiter ATS filters. Get missing keywords, skills breakdown, and recommendations to pass the campus screening.
        </p>
      </div>

      {/* Main Grid: Input Column & Role Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form & Inputs */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
          
          {/* Target Role Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-2">
              1. Select Your Target Internship / Job Domain:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {TARGET_ROLES.map((role) => (
                <button
                  key={role.id}
                  onClick={() => {
                    setSelectedRole(role.id);
                    setAnalysisResult(null);
                  }}
                  className={`p-3 rounded-2xl text-left border text-xs font-semibold transition-all cursor-pointer ${
                    selectedRole === role.id
                      ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs ring-1 ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-800/50'
                  }`}
                >
                  <div className="font-bold text-slate-900 dark:text-slate-100">{role.name}</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-400 mt-0.5">
                    {role.requiredSkills.slice(0, 3).join(', ')}...
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Resume Text Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                2. Paste Resume Content or Project Experience:
              </label>
              <button
                type="button"
                onClick={() => setResumeText(SAMPLE_RESUME)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer"
              >
                Load Sample
              </button>
            </div>
            <textarea
              rows={9}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume sections, technical skills, projects, and coursework here..."
              className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950 text-xs sm:text-sm text-slate-800 dark:text-slate-100 leading-relaxed font-mono outline-none transition"
            />
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !resumeText.trim()}
            className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Scanning Against Recruiter Keywords...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Run Instant ATS Scan</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Instant Results Card */}
        <div className="lg:col-span-5 space-y-6">
          {analysisResult ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-6"
            >
              {/* Score Gauge */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-5">
                <div>
                  <div className="text-xs font-bold uppercase text-slate-400 dark:text-slate-400">ATS Match Rating</div>
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
                    {analysisResult.score}/100
                  </div>
                </div>
                <div
                  className={`px-4 py-2 rounded-2xl text-xs font-bold ${
                    analysisResult.score >= 80
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
                      : analysisResult.score >= 60
                      ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60'
                      : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60'
                  }`}
                >
                  {analysisResult.score >= 80
                    ? '🌟 Highly Competitive'
                    : analysisResult.score >= 60
                    ? '👍 Good Base (Needs Tuning)'
                    : '⚠️ High Risk of ATS Rejection'}
                </div>
              </div>

              {/* Matched Skills */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Detected Skills ({analysisResult.matchedSkills.length})
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {analysisResult.matchedSkills.length > 0 ? (
                    analysisResult.matchedSkills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200/80 dark:border-emerald-800/60"
                      >
                        ✓ {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400">No primary skills detected.</span>
                  )}
                </div>
              </div>

              {/* Missing Skills to Add */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-500 dark:text-rose-400" />
                  Missing Recommended Skills ({analysisResult.missingSkills.length})
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {analysisResult.missingSkills.length > 0 ? (
                    analysisResult.missingSkills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-semibold border border-rose-200/80 dark:border-rose-800/60"
                      >
                        + Add {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                      Awesome! You have all major required skills mentioned!
                    </span>
                  )}
                </div>
              </div>

              {/* Actionable Advice */}
              <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 text-xs text-blue-900 dark:text-blue-200 space-y-1.5 leading-relaxed">
                <div className="font-bold flex items-center gap-1.5 text-blue-700 dark:text-blue-300">
                  <Zap className="w-3.5 h-3.5" />
                  Campus Recruiter Tip:
                </div>
                <p>
                  Include quantifiable impact in bullet points (e.g. <em>"improved load times by 25%"</em>, <em>"handled 5,000 requests"</em>) rather than simple task descriptions.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="bg-slate-50/90 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
                <FileText className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Ready to Analyze</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
                Click <strong>"Run Instant ATS Scan"</strong> to receive an immediate breakdown of matching keywords and college placement competitiveness.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
