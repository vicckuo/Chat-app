const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const mytable = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SEC);

      req.user = await mytable.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      return res.status(401).json(error);
    }
  }

  if (!token) {
    try {
      return res.status(401).json({ message: '未經驗證的操作！' });
    } catch (error) {
      return res.status(401).json(error);
    }
  }
};

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
    if (
      req.user.id === req.params.id ||
      req.user.isAdmin ||
      req.user.username === req.params.username
    ) {
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

//Email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: false,
  auth: {
    user: process.env.EMAIL_ACC,
    pass: process.env.EMAIL_PWD,
  },
});

const verifyUserEmail = async function verifyUserEmail(email, username, token) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_ACC,
      to: email,
      subject: '【Chat App】Email验证信',
      html:
        '您好，' +
        username +
        ' 请点击链结以验证您的Email ' +
        process.env.host2 +
        '/#/verifyUserEmail/' +
        username +
        '/' +
        token +
        ' 如未完成验证，链结将在一小时内失效',
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyUserEmail,
  protect,
};
