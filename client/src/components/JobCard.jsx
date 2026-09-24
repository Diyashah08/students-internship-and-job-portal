import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Briefcase,
  Clock,
  Bookmark,
  Calendar,
  IndianRupee,
  Building2,
  ExternalLink,
} from 'lucide-react';
import { timeAgo, truncateText } from '../utils/helpers';
import { useAuth } from '../context/AuthContext';
import { savedJobService } from '../services/savedJobService';

const JobCard = ({ job, isSavedInitially = false, onSaveToggle }) => {
  const { isAuthenticated, role } = useAuth();
  const [isSaved, setIsSaved] = useState(isSavedInitially);
  const [saving, setSaving] = useState(false);

  const company = job.companyId || {};

  const handleBookmark = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated || role !== 'student') {
      alert('Please log in as a Student to bookmark opportunities.');
      return;
    }

    try {
      setSaving(true);
      if (isSaved) {
        await savedJobService.unsaveJob(job._id);
        setIsSaved(false);
        if (onSaveToggle) onSaveToggle(job._id, false);
      } else {
        await savedJobService.saveJob(job._id);
        setIsSaved(true);
        if (onSaveToggle) onSaveToggle(job._id, true);
      }
    } catch (err) {
      console.error('Save toggle error:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-100 p-6 shadow-card hover:shadow-card-hover hover:border-blue-200 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Header: Company & Bookmark */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3.5">
            {company.logo ? (
              <img
                src={company.logo}
                alt={company.companyName}
                className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-sm"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&auto=format&fit=crop&q=60';
                }}
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 font-bold text-lg flex items-center justify-center border border-blue-100">
                {company.companyName ? company.companyName.charAt(0) : 'C'}
              </div>
            )}
            <div>
              <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                {company.companyName || 'Verified Enterprise'}
              </h4>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-slate-400" />
                {job.location || 'Pan India'}
              </p>
            </div>
          </div>

          {/* Bookmark Button */}
          {role === 'student' && (
            <button
              onClick={handleBookmark}
              disabled={saving}
              aria-label={isSaved ? 'Remove from saved' : 'Save job'}
              className={`p-2 rounded-xl transition ${
                isSaved
                  ? 'bg-blue-50 text-blue-600 fill-blue-600'
                  : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-blue-600' : ''}`} />
            </button>
          )}
        </div>

        {/* Title */}
        <Link to={`/jobs/${job._id}`} className="block">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-2">
            {job.title}
          </h3>
        </Link>

        {/* Description snippet */}
        <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
          {truncateText(job.description, 130)}
        </p>

        {/* Badges / Meta */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span
            className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
              job.type === 'Internship'
                ? 'bg-purple-50 text-purple-700 border border-purple-100'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
            }`}
          >
            {job.type}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-lg font-medium bg-slate-100 text-slate-700">
            {job.workMode}
          </span>
          {job.duration && (
            <span className="text-xs px-2.5 py-1 rounded-lg font-medium bg-blue-50 text-blue-700 border border-blue-100 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {job.duration}
            </span>
          )}
        </div>

        {/* Skills Pills */}
        {job.skills && job.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {job.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="text-[11px] font-medium bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-100"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 3 && (
              <span className="text-[11px] font-medium text-slate-400 px-1 py-0.5">
                +{job.skills.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer: Salary & Action */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-2">
        <div>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block">
            {job.type === 'Internship' ? 'Stipend' : 'Salary Package'}
          </span>
          <p className="text-sm font-bold text-slate-900 flex items-center gap-0.5">
            {job.stipend || job.salary || 'Competitive'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-slate-400 hidden sm:inline-block">
            {timeAgo(job.createdAt)}
          </span>
          <Link
            to={`/jobs/${job._id}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-xl transition duration-200"
          >
            Apply Now
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
