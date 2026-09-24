const express = require('express');
const router = express.Router();
const {
  saveJob,
  unsaveJob,
  getSavedJobs,
  checkSavedJob,
} = require('../controllers/savedJobController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

router.use(protect);
router.use(authorize('student'));

router.get('/', getSavedJobs);
router.get('/check/:jobId', checkSavedJob);
router.post('/:jobId', saveJob);
router.delete('/:jobId', unsaveJob);

module.exports = router;
