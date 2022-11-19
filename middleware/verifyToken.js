const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json('無效的令牌驗證！');
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json('未經驗證的操作！');
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json('未經授權的操作！');
    }
  });
};

//ADMIN
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json('未經授權的操作！');
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
};
