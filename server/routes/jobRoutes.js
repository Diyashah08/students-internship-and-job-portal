const express = require('express');
const router = express.Router();
const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  toggleJobStatus,
  getFeaturedAndCategories,
} = require('../controllers/jobController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

// Public routes
router.get('/featured', getFeaturedAndCategories);
router.get('/', getJobs);
router.get('/:id', getJobById);

// Protected routes (Recruiter & Admin)
router.post('/', protect, authorize('recruiter', 'admin'), createJob);
router.put('/:id', protect, authorize('recruiter', 'admin'), updateJob);
router.delete('/:id', protect, authorize('recruiter', 'admin'), deleteJob);
router.patch('/:id/status', protect, authorize('recruiter', 'admin'), toggleJobStatus);

module.exports = router;
