import React, { useState } from 'react';
import { X, Send, FileText, CheckCircle2, AlertCircle, Upload } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { applicationService } from '../services/applicationService';
import { studentService } from '../services/studentService';

const ApplyModal = ({ job, isOpen, onClose, onSuccess }) => {
  const { user } = useAuth();

  const [studentName, setStudentName] = useState(user?.name || '');
  const [studentEmail, setStudentEmail] = useState(user?.email || '');
  const [studentPhone, setStudentPhone] = useState(user?.phone || '');
  const [resumeUrl, setResumeUrl] = useState(user?.resume || '');
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen || !job) return null;

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('resume', file);
      const res = await studentService.uploadResume(formData);
      if (res.success && res.resumeUrl) {
        setResumeUrl(res.resumeUrl);
        setResumeFile(file.name);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload resume file');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!resumeUrl && !resumeFile) {
      setError('Please provide a resume link or upload your resume file.');
      return;
    }

    try {
      setLoading(true);
      const res = await applicationService.apply({
        jobId: job._id,
        resume: resumeUrl,
        coverLetter,
        studentName,
        studentEmail,
        studentPhone,
      });

      if (res.success) {
        setSuccessMsg('Application submitted successfully!');
        if (onSuccess) onSuccess();
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit application.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
            Application Form
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-2">{job.title}</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {job.companyId?.companyName || 'Company'} • {job.location}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={studentPhone}
                onChange={(e) => setStudentPhone(e.target.value)}
                placeholder="+91 9876543210"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Resume (File or URL Link) *
            </label>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="https://drive.google.com/your-resume or portfolio"
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />

              <div className="flex items-center gap-2">
                <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-medium text-slate-700 transition">
                  <Upload className="w-3.5 h-3.5 text-blue-600" />
                  Upload PDF/DOC
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
                {resumeFile && (
                  <span className="text-xs text-emerald-600 font-medium truncate max-w-[200px]">
                    ✓ {resumeFile}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Cover Letter / Why should we hire you?
            </label>
            <textarea
              rows={3}
              placeholder="Briefly describe your relevant skills, projects, and passion for this role..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            ></textarea>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition shadow-md disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
