const {
  register,
  login,
  update,
  setAvatar,
  getAllUsers,
  updatePw,
} = require('../controllers/userController');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../middleware/verifyToken');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.put('/update/:id', verifyTokenAndAuthorization, update);
router.put('/updatePw/:id', verifyTokenAndAuthorization, updatePw);

module.exports = router;
