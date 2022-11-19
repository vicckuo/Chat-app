const mytable = require('../models/userModel');
const brcypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await mytable.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: '使用者帐号已注册过了', status: false });
    const emailCheck = await mytable.findOne({ email });
    if (emailCheck) return res.json({ msg: 'Email已注册过了', status: false });
    const hashedPassword = await brcypt.hash(password, 10);
    const user = await mytable.create({
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password: hashedPassword,
    });
    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SEC,
      { expiresIn: '3d' }
    );
    delete user.password;
    return res.json({ status: true, user, accessToken });
  } catch (e) {
    next(e);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await mytable.findOne({ username: username.toLowerCase() });
    if (!user) return res.json({ msg: '输入的帐号或密码错误', status: false });

    const isPasswordValid = await brcypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: '输入的帐号或密码错误', status: false });

    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SEC,
      { expiresIn: '3d' }
    );

    delete user.password;

    return res.json({ status: true, user, accessToken });
  } catch (e) {
    next(e);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const { nickname } = req.body;
    await mytable.findByIdAndUpdate(
      req.params.id,
      {
        nickname: nickname,
      },
      { new: true }
    );
    return res.json({ status: true, msg: '修改成功，重新登入更新资料' });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.updatePw = async (req, res, next) => {
  try {
    const { password, currentPassword, confirmPassword } = req.body;
    const user = await mytable.findById(req.params.id);
    const isPasswordValid = await brcypt.compare(
      currentPassword,
      user.password
    );
    const isNewPasswordValid = await brcypt.compare(password, user.password);
    if (password === '') {
      return res.json({ status: false, msg: '密码不能为空' });
    } else if (currentPassword === '') {
      return res.json({ status: false, msg: '密码不能为空' });
    } else if (confirmPassword === '') {
      return res.json({ status: false, msg: '密码不能为空' });
    } else if (password !== confirmPassword) {
      return res.json({ status: false, msg: '新密码必须一致' });
    } else if (password.length < 8) {
      return res.json({ status: false, msg: '密码必须8位数以上' });
    } else if (!isPasswordValid) {
      return res.json({ status: false, msg: '当前密码错误' });
    } else if (isNewPasswordValid) {
      return res.json({ status: false, msg: '新密码不能与旧密码相同' });
    }
    const hashedPassword = await brcypt.hash(password, 10);
    await mytable.findByIdAndUpdate(
      req.params.id,
      {
        password: hashedPassword,
      },
      { new: true }
    );
    return res.json({ status: true, msg: '修改成功，下次请用新密码登入' });
  } catch (err) {
    res.status(500).json(err);
  }
};
