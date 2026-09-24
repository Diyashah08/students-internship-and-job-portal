const express = require('express');
const router = express.Router();
const {
  applyJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus,
  checkIfApplied,
} = require('../controllers/applicationController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

// Student routes
router.post('/', protect, authorize('student'), applyJob);
router.get('/my', protect, authorize('student'), getMyApplications);
router.get('/check/:jobId', protect, authorize('student'), checkIfApplied);

// Recruiter & Admin routes
router.get('/job/:jobId', protect, authorize('recruiter', 'admin'), getJobApplications);
router.put('/:id/status', protect, authorize('recruiter', 'admin'), updateApplicationStatus);

module.exports = router;
