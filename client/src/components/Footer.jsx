import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Heart, Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold text-white">InternConnect</span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Bridging the gap between ambitious college students and world-class companies. Find
              impactful internships, verified job openings, and kickstart your professional journey.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-blue-600 flex items-center justify-center transition"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-blue-600 flex items-center justify-center transition"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-blue-600 flex items-center justify-center transition"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Students */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              For Students
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/jobs?type=Internship" className="hover:text-blue-400 transition">
                  Browse Internships
                </Link>
              </li>
              <li>
                <Link to="/jobs?type=Full-time" className="hover:text-blue-400 transition">
                  Fresher Job Openings
                </Link>
              </li>
              <li>
                <Link to="/companies" className="hover:text-blue-400 transition">
                  Top Hiring Companies
                </Link>
              </li>
              <li>
                <Link to="/student/dashboard" className="hover:text-blue-400 transition">
                  Student Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Recruiters */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              For Employers
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/recruiter/post-job" className="hover:text-blue-400 transition">
                  Post an Opportunity
                </Link>
              </li>
              <li>
                <Link to="/recruiter/dashboard" className="hover:text-blue-400 transition">
                  Recruiter Dashboard
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-blue-400 transition">
                  Employer Registration
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition">
                  Campus Hiring Network
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-blue-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-blue-400 transition">
                  Admin Login
                </Link>
              </li>
              <li>
                <span className="text-slate-500 text-xs">FSD Micro Project (MERN)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} InternConnect. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for College Students & Recruiters
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
