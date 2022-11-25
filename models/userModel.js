const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  confirmedEmail: {
    type: Boolean,
    default: false,
    required: true,
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
