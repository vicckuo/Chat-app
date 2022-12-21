const {
  sendMessage,
  allMessages,
} = require('../controllers/messageController');
const { protect } = require('../middleware/verifyToken');

const router = require('express').Router();

router.post('/', protect, sendMessage);
router.get('/:chatId', protect, allMessages);

module.exports = router;
