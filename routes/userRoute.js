const {
  register,
  login,
  update,
  setAvatar,
  getAllUsers,
  updatePw,
  verifyEmail,
  ProfileVerifyEmail,
} = require('../controllers/userController');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyUserEmail,
} = require('../middleware/verifyToken');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verifyEmailToken', verifyEmail);
router.post(
  '/profileVerifyEmailToken',
  verifyTokenAndAuthorization,
  ProfileVerifyEmail
);
router.put('/update/:id', verifyTokenAndAuthorization, update);
router.put('/updatePw/:id', verifyTokenAndAuthorization, updatePw);

module.exports = router;
