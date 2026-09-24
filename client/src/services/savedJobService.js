import api from './api';

export const savedJobService = {
  getSavedJobs: async () => {
    const response = await api.get('/saved-jobs');
    return response.data;
  },

  checkSaved: async (jobId) => {
    const response = await api.get(`/saved-jobs/check/${jobId}`);
    return response.data;
  },

  saveJob: async (jobId) => {
    const response = await api.post(`/saved-jobs/${jobId}`);
    return response.data;
  },

  unsaveJob: async (jobId) => {
    const response = await api.delete(`/saved-jobs/${jobId}`);
    return response.data;
  },
};
