const Message = require('../models/messageModel');
const mytable = require('../models/userModel');
const Chat = require('../models/chatModel');

module.exports.sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log('无效的请求');
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);
    message = await message.populate('sender', 'username avatarImage');

    message = await message.populate('chat');
    message = await mytable.populate(message, {
      path: 'chat.users',
      select: 'username avatarImage email',
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports.allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate('sender', 'username avatarImage email')
      .populate('chat');
    res.json(messages);
  } catch (error) {
    throw new Error(error.message);
  }
};
