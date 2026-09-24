const express = require('express');
const router = express.Router();
const {
  getAdminStats,
  getAllUsers,
  deleteUser,
  getAllJobsAdmin,
  updateJobModeration,
  getAllApplicationsAdmin,
} = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getAdminStats);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.get('/jobs', getAllJobsAdmin);
router.put('/jobs/:id/status', updateJobModeration);
router.get('/applications', getAllApplicationsAdmin);

module.exports = router;
