import api from './api';

export const applicationService = {
  apply: async (data) => {
    const response = await api.post('/applications', data);
    return response.data;
  },

  getMyApplications: async () => {
    const response = await api.get('/applications/my');
    return response.data;
  },

  getJobApplications: async (jobId) => {
    const response = await api.get(`/applications/job/${jobId}`);
    return response.data;
  },

  updateStatus: async (applicationId, status) => {
    const response = await api.put(`/applications/${applicationId}/status`, { status });
    return response.data;
  },

  checkIfApplied: async (jobId) => {
    const response = await api.get(`/applications/check/${jobId}`);
    return response.data;
  },
};
