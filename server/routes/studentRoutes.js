const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  uploadResume,
  getStudentDashboard,
} = require('../controllers/studentController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');
const upload = require('../middleware/upload');

router.use(protect);
router.use(authorize('student'));

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/upload-resume', upload.single('resume'), uploadResume);
router.get('/dashboard', getStudentDashboard);

module.exports = router;
