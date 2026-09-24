import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  Calendar,
  Code,
  Github,
  Linkedin,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Save,
  Sparkles,
} from 'lucide-react';
import { studentService } from '../../services/studentService';
import { useAuth } from '../../context/AuthContext';
import Loader from '../../components/Loader';
import { getInitials } from '../../utils/helpers';

const StudentProfile = () => {
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    course: '',
    graduationYear: 2025,
    skills: [],
    resume: '',
    github: '',
    linkedin: '',
    about: '',
  });

  const [skillInput, setSkillInput] = useState('');
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await studentService.getProfile();
        if (res.success && res.user) {
          setFormData({
            name: res.user.name || '',
            email: res.user.email || '',
            phone: res.user.phone || '',
            college: res.user.college || '',
            course: res.user.course || '',
            graduationYear: res.user.graduationYear || 2025,
            skills: res.user.skills || [],
            resume: res.user.resume || '',
            github: res.user.github || '',
            linkedin: res.user.linkedin || '',
            about: res.user.about || '',
          });
          setProfileCompletion(res.profileCompletion || 0);
        }
      } catch (err) {
        console.error('Error fetching student profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = skillInput.trim().replace(/^,/, '').replace(/,$/, '');
      if (val && !formData.skills.includes(val)) {
        setFormData({ ...formData, skills: [...formData.skills, val] });
        setSkillInput('');
      }
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skillToRemove),
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setSaving(true);
      const data = new FormData();
      data.append('resume', file);
      const res = await studentService.uploadResume(data);
      if (res.success && res.resumeUrl) {
        setFormData((prev) => ({ ...prev, resume: res.resumeUrl }));
        setSuccessMsg('Resume uploaded successfully!');
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Resume upload failed');
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    try {
      setSaving(true);
      const res = await studentService.updateProfile(formData);
      if (res.success) {
        setSuccessMsg('Profile updated successfully!');
        setProfileCompletion(res.profileCompletion || 0);
        updateUser(res.user);
        setTimeout(() => setSuccessMsg(''), 3500);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader message="Loading profile..." />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-2xl flex items-center justify-center shadow-lg">
            {getInitials(formData.name)}
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">{formData.name}</h1>
            <p className="text-xs text-slate-500">{formData.email}</p>
            <span className="inline-block mt-1 text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md">
              Student Candidate
            </span>
          </div>
        </div>

        {/* Profile completion */}
        <div className="w-full sm:w-64 bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
            <span>Profile Completion</span>
            <span className="text-blue-600 font-bold">{profileCompletion}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${profileCompletion}%` }}
            ></div>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-700 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Profile Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card space-y-8">
        {/* Section 1: Basic Information */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            Personal Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address (Read-only)
              </label>
              <input
                type="email"
                disabled
                value={formData.email}
                className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium text-slate-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Academic Details */}
        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            Academic Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">College / University</label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="e.g. IIT Bombay / Delhi University"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Course / Degree</label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="e.g. B.Tech Computer Science"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Graduation Year</label>
              <input
                type="number"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                placeholder="2025"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Skills Tag Input */}
        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
            <Code className="w-4 h-4 text-blue-600" />
            Technical & Professional Skills
          </h3>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Type a skill and press Enter (e.g. React, Python, MongoDB)..."
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleAddSkill}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />

            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-xl text-xs font-semibold border border-blue-100"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-rose-600 font-bold ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: Resume & Links */}
        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            Resume & Professional Profiles
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Resume Link or Upload
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  name="resume"
                  value={formData.resume}
                  onChange={handleChange}
                  placeholder="https://drive.google.com/your-resume or direct file link"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />

                <div className="flex items-center gap-2">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition">
                    <Upload className="w-3.5 h-3.5 text-blue-600" />
                    Upload PDF / Word Document
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                  {formData.resume && (
                    <a
                      href={formData.resume}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-blue-600 hover:underline font-semibold"
                    >
                      View Current Resume ↗
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  GitHub Profile URL
                </label>
                <div className="relative">
                  <Github className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="https://github.com/username"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  LinkedIn Profile URL
                </label>
                <div className="relative">
                  <Linkedin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                About / Bio Section
              </label>
              <textarea
                name="about"
                rows={4}
                value={formData.about}
                onChange={handleChange}
                placeholder="Write a brief intro about your academic focus, career goals, and technical passions..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shadow-md shadow-blue-500/20 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving Profile...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentProfile;
