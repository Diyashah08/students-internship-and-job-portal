import api from './api';

export const adminService = {
  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },

  getUsers: async (params = {}) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  },

  getJobs: async (params = {}) => {
    const response = await api.get('/admin/jobs', { params });
    return response.data;
  },

  updateJobStatus: async (id, status) => {
    const response = await api.put(`/admin/jobs/${id}/status`, { status });
    return response.data;
  },

  getApplications: async () => {
    const response = await api.get('/admin/applications');
    return response.data;
  },
};

export const recruiterService = {
  getDashboard: async () => {
    const response = await api.get('/recruiter/dashboard');
    return response.data;
  },

  getCompany: async () => {
    const response = await api.get('/recruiter/company');
    return response.data;
  },

  updateCompany: async (data) => {
    const response = await api.put('/recruiter/company', data);
    return response.data;
  },

  uploadLogo: async (formData) => {
    const response = await api.post('/recruiter/upload-logo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};
