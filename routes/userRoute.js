const {
  register,
  login,
  update,
  setAvatar,
  allUsers,
  updatePw,
  verifyEmail,
  ProfileVerifyEmail,
} = require('../controllers/userController');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyUserEmail,
  protect,
} = require('../middleware/verifyToken');

const router = require('express').Router();

router.get('/', protect, allUsers);

router.post('/register', register);
router.post('/login', login);
router.post('/setAvatar/:id', setAvatar);
router.post('/verifyEmailToken', verifyEmail);
router.post(
  '/profileVerifyEmailToken',
  verifyTokenAndAuthorization,
  ProfileVerifyEmail
);
router.put('/update/:id', verifyTokenAndAuthorization, update);
router.put('/updatePw/:id', verifyTokenAndAuthorization, updatePw);

module.exports = router;
