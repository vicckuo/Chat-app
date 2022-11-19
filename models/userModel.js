const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    default: '',
  },
  username: {
    type: String,
    required: true,
    min: 6,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    min: 8,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('mytable', userSchema);
