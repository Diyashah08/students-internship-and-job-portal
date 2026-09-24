const express = require('express');
const router = express.Router();
const {
  getRecruiterDashboard,
  getCompanyProfile,
  updateCompanyProfile,
  uploadLogo,
} = require('../controllers/recruiterController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');
const upload = require('../middleware/upload');

router.use(protect);
router.use(authorize('recruiter', 'admin'));

router.get('/dashboard', getRecruiterDashboard);
router.get('/company', getCompanyProfile);
router.put('/company', updateCompanyProfile);
router.post('/upload-logo', upload.single('logo'), uploadLogo);

module.exports = router;
