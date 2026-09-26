import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Building2,
  MapPin,
  Briefcase,
  Clock,
  Calendar,
  IndianRupee,
  Globe,
  Share2,
  Bookmark,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Users,
  Sparkles,
} from 'lucide-react';
import { jobService } from '../services/jobService';
import { savedJobService } from '../services/savedJobService';
import { applicationService } from '../services/applicationService';
import { useAuth } from '../context/AuthContext';
import { formatDate, timeAgo, getCompanyLogo } from '../utils/helpers';
import ApplyModal from '../components/ApplyModal';
import Loader from '../components/Loader';
import StatusBadge from '../components/StatusBadge';
import CompanyMapModal from '../components/CompanyMapModal';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, role } = useAuth();

  const [job, setJob] = useState(null);
  const [applicationCount, setApplicationCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isSaved, setIsSaved] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [existingApplication, setExistingApplication] = useState(null);

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await jobService.getJobById(id);
        if (res.success && res.job) {
          setJob(res.job);
          setApplicationCount(res.applicationCount || 0);

          // If logged in student, check saved and applied status
          if (isAuthenticated && role === 'student') {
            try {
              const saveCheck = await savedJobService.checkSaved(id);
              if (saveCheck.success) setIsSaved(saveCheck.isSaved);

              const applyCheck = await applicationService.checkIfApplied(id);
              if (applyCheck.success) {
                setHasApplied(applyCheck.hasApplied);
                setExistingApplication(applyCheck.application);
              }
            } catch (err) {
              console.error('Check status error:', err);
            }
          }
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Opportunity not found');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, isAuthenticated, role]);

  const handleBookmark = async () => {
    if (!isAuthenticated || role !== 'student') {
      alert('Please log in as a Student to bookmark this opportunity.');
      return;
    }

    try {
      if (isSaved) {
        await savedJobService.unsaveJob(id);
        setIsSaved(false);
      } else {
        await savedJobService.saveJob(id);
        setIsSaved(true);
      }
    } catch (err) {
      console.error('Save toggle error:', err);
    }
  };

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/jobs/${id}` } });
      return;
    }
    if (role !== 'student') {
      alert('Only students can apply for opportunities.');
      return;
    }
    setIsApplyModalOpen(true);
  };

  const handleApplySuccess = () => {
    setHasApplied(true);
    setApplicationCount((prev) => prev + 1);
  };

  if (loading) {
    return <Loader message="Loading opportunity details..." />;
  }

  if (error || !job) {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 text-center shadow-card">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Opportunity Not Found</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-6">
          This listing might have expired or been removed.
        </p>
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Listings
        </Link>
      </div>
    );
  }

  const company = job.companyId || {};
  const isExpired = new Date(job.deadline) < new Date();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back button */}
      <Link
        to="/jobs"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to All Listings
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Main Job Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <img
                  src={getCompanyLogo(company.logo, company.companyName)}
                  alt={company.companyName}
                  className="w-16 h-16 rounded-2xl object-contain bg-white p-1 border border-slate-100 dark:border-slate-800 shadow-sm"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = getCompanyLogo('', company.companyName);
                  }}
                />
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    {job.title}
                  </h1>
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    {company.companyName || 'Verified Enterprise'}
                  </p>
                </div>
              </div>

              {/* Action Bookmark */}
              {role === 'student' && (
                <button
                  onClick={handleBookmark}
                  className={`p-3 rounded-2xl border transition self-start ${
                    isSaved
                      ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400'
                      : 'border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                  title={isSaved ? 'Saved to bookmarks' : 'Save to bookmarks'}
                >
                  <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-blue-600' : ''}`} />
                </button>
              )}
            </div>

            {/* Quick Meta Badges */}
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 block">
                  Location
                </span>
                <div className="flex items-center gap-1.5 mt-1">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    {job.location}
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsMapModalOpen(true)}
                    className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-100 px-1.5 py-0.5 rounded transition"
                    title="View office location on map"
                  >
                    <MapPin className="w-2.5 h-2.5" />
                    Map
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 block">
                  Work Mode
                </span>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1 mt-1">
                  <Briefcase className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  {job.workMode}
                </p>
              </div>

              <div>
                <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 block">
                  {job.type === 'Internship' ? 'Stipend' : 'Salary Package'}
                </span>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1 mt-1">
                  {job.stipend || job.salary || 'Competitive'}
                </p>
              </div>

              <div>
                <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 block">
                  {job.type === 'Internship' ? 'Duration' : 'Experience'}
                </span>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1 mt-1">
                  <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  {job.duration || job.experience || 'Fresher'}
                </p>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-card space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">About the Opportunity</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">Key Responsibilities</h3>
                <ul className="space-y-2">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">Requirements & Qualifications</h3>
                <ul className="space-y-2">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5 flex-shrink-0"></span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Required Skills */}
            {job.skills && job.skills.length > 0 && (
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">Required Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold text-xs rounded-xl border border-blue-100 dark:border-blue-900/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Eligibility Criteria */}
            {job.eligibility && (
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Eligibility Criteria
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">{job.eligibility}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Column: Apply Sidebar & Company Info */}
        <div className="space-y-6">
          {/* Application Action Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Application Deadline
              </span>
              <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded-md">
                {formatDate(job.deadline)}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                {applicationCount} Applicants
              </span>
              <span>Posted {timeAgo(job.createdAt)}</span>
            </div>

            {/* Apply Status / Button */}
            {hasApplied ? (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-center space-y-1">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Application Submitted</p>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400">
                  Status:{' '}
                  <span className="font-bold">{existingApplication?.status || 'Applied'}</span>
                </p>
                <Link
                  to="/student/applications"
                  className="inline-block mt-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 underline"
                >
                  View in My Applications
                </Link>
              </div>
            ) : isExpired ? (
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl text-center text-xs text-slate-600 dark:text-slate-300 font-semibold">
                This opportunity is closed for applications.
              </div>
            ) : (
              <button
                onClick={handleApplyClick}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl transition shadow-lg shadow-blue-500/25"
              >
                Apply for this Position
              </button>
            )}
          </div>

          {/* Company Info Box */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-card space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">About the Organization</h3>
            <div className="flex items-center gap-3">
              <img
                src={getCompanyLogo(company.logo, company.companyName)}
                alt={company.companyName}
                className="w-12 h-12 rounded-xl object-contain bg-white p-1 border border-slate-100 dark:border-slate-800 shadow-sm"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = getCompanyLogo('', company.companyName);
                }}
              />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{company.companyName}</h4>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">{company.industry || 'IT & Consulting'}</p>
              </div>
            </div>

            {company.description && (
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{company.description}</p>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <Globe className="w-3.5 h-3.5" />
                  Official Website
                </a>
              )}
              <button
                type="button"
                onClick={() => setIsMapModalOpen(true)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg transition"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                Locate Office
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      <ApplyModal
        job={job}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        onSuccess={handleApplySuccess}
      />

      {/* Map Modal */}
      <CompanyMapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        companyName={company.companyName}
        location={job.location || company.location}
      />
    </div>
  );
};

export default JobDetails;
