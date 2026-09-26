import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Briefcase,
  PlusCircle,
  Building,
  MapPin,
  Calendar,
  IndianRupee,
  Clock,
  Code,
  FileText,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';
import { jobService } from '../../services/jobService';
import { CATEGORIES, WORK_MODES, JOB_TYPES } from '../../utils/constants';
import Loader from '../../components/Loader';

const PostJob = () => {
  const [searchParams] = useSearchParams();
  const editJobId = searchParams.get('edit');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    type: 'Internship',
    category: 'Software Development',
    location: 'Bengaluru, Karnataka',
    workMode: 'Hybrid',
    salary: '',
    stipend: '₹25,000 / month',
    duration: '6 Months',
    experience: 'Fresher / Pre-final Year',
    skills: 'React.js, JavaScript, HTML/CSS, Git',
    eligibility: 'B.Tech / BCA / MCA / B.Sc (2024 / 2025 / 2026 Batch)',
    responsibilities:
      'Develop interactive and responsive user interfaces.\nCollaborate with senior software engineers.\nParticipate in agile sprints and code reviews.',
    requirements:
      'Solid foundation in core computer science concepts.\nStrong problem-solving skills.\nGood communication and teamwork mindset.',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Load existing job if editing
  useEffect(() => {
    if (editJobId) {
      const loadJob = async () => {
        try {
          setFetching(true);
          const res = await jobService.getJobById(editJobId);
          if (res.success && res.job) {
            const j = res.job;
            setFormData({
              title: j.title || '',
              type: j.type || 'Internship',
              category: j.category || 'Software Development',
              location: j.location || '',
              workMode: j.workMode || 'Hybrid',
              salary: j.salary || '',
              stipend: j.stipend || '',
              duration: j.duration || '',
              experience: j.experience || 'Fresher',
              skills: Array.isArray(j.skills) ? j.skills.join(', ') : j.skills || '',
              eligibility: j.eligibility || '',
              responsibilities: Array.isArray(j.responsibilities)
                ? j.responsibilities.join('\n')
                : j.responsibilities || '',
              requirements: Array.isArray(j.requirements)
                ? j.requirements.join('\n')
                : j.requirements || '',
              deadline: j.deadline
                ? new Date(j.deadline).toISOString().split('T')[0]
                : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              description: j.description || '',
            });
          }
        } catch (err) {
          setError('Failed to load listing for editing.');
        } finally {
          setFetching(false);
        }
      };
      loadJob();
    }
  }, [editJobId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!formData.title || !formData.description) {
      setError('Please provide a title and detailed job description.');
      return;
    }

    try {
      setLoading(true);
      if (editJobId) {
        await jobService.updateJob(editJobId, formData);
        setSuccessMsg('Opportunity updated successfully!');
      } else {
        await jobService.createJob(formData);
        setSuccessMsg('Opportunity posted successfully!');
      }

      setTimeout(() => {
        navigate('/recruiter/manage-jobs');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save opportunity');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <Loader message="Loading opportunity data..." />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          {editJobId ? 'Edit Opportunity Listing' : 'Post New Internship or Job'}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Publish verified positions to reach thousands of college students and fresh graduates.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 rounded-2xl text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/60 rounded-2xl text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-card space-y-6">
        {/* Basic Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Opportunity Title *
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. React.js Frontend Developer Intern"
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Position Type *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {JOB_TYPES.map((t) => (
                <option key={t} value={t} className="dark:bg-slate-800">
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Category / Domain *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="dark:bg-slate-800">
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Location & Compensation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Primary Location *
            </label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Bengaluru / Remote"
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Work Mode *</label>
            <select
              name="workMode"
              value={formData.workMode}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {WORK_MODES.map((mode) => (
                <option key={mode} value={mode} className="dark:bg-slate-800">
                  {mode}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {formData.type === 'Internship' ? 'Monthly Stipend' : 'Annual Salary (LPA)'}
            </label>
            <input
              type="text"
              name={formData.type === 'Internship' ? 'stipend' : 'salary'}
              value={formData.type === 'Internship' ? formData.stipend : formData.salary}
              onChange={handleChange}
              placeholder={formData.type === 'Internship' ? '₹25,000 / month' : '6 - 9 LPA'}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800"
            />
          </div>
        </div>

        {/* Duration / Experience & Deadline */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {formData.type === 'Internship' ? 'Duration (Months)' : 'Experience Level'}
            </label>
            <input
              type="text"
              name={formData.type === 'Internship' ? 'duration' : 'experience'}
              value={formData.type === 'Internship' ? formData.duration : formData.experience}
              onChange={handleChange}
              placeholder={formData.type === 'Internship' ? '6 Months' : 'Fresher (0-1 yr)'}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Application Deadline *
            </label>
            <input
              type="date"
              name="deadline"
              required
              value={formData.deadline}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Required Skills (comma separated)
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, JavaScript, Node.js, Git"
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800"
            />
          </div>
        </div>

        {/* Eligibility */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Eligibility Criteria
          </label>
          <input
            type="text"
            name="eligibility"
            value={formData.eligibility}
            onChange={handleChange}
            placeholder="e.g. B.Tech / BCA / MCA students graduating in 2024, 2025, or 2026"
            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800"
          />
        </div>

        {/* Responsibilities */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Key Responsibilities (One per line)
          </label>
          <textarea
            name="responsibilities"
            rows={3}
            value={formData.responsibilities}
            onChange={handleChange}
            placeholder="Enter responsibilities, one on each line..."
            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800"
          ></textarea>
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Requirements & Preferred Qualifications (One per line)
          </label>
          <textarea
            name="requirements"
            rows={3}
            value={formData.requirements}
            onChange={handleChange}
            placeholder="Enter requirements, one on each line..."
            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800"
          ></textarea>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Detailed Job Description *
          </label>
          <textarea
            name="description"
            rows={4}
            required
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide an overview of the role, day-to-day work, learning opportunities, and growth paths..."
            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800"
          ></textarea>
        </div>

        {/* Submit button */}
        <div className="pt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/recruiter/manage-jobs')}
            className="px-5 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shadow-md shadow-blue-500/20 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            {loading ? 'Publishing...' : editJobId ? 'Update Listing' : 'Publish Opportunity'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
