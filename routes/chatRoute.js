const {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
} = require('../controllers/chatController');

const { protect } = require('../middleware/verifyToken');

const router = require('express').Router();

router.post('/', protect, accessChat);
router.get('/', protect, fetchChat);
router.post('/group', protect, createGroupChat);
router.put('/rename', protect, renameGroup);
router.put('/groupremove', protect, removeFromGroup);
router.put('/groupadd', protect, addToGroup);

module.exports = router;
