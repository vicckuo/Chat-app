const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const userRoute = require('./routes/userRoute');
const chatRoute = require('./routes/chatRoute');
const messageRoute = require('./routes/messageRoute');
const cors = require('cors');
// const path = require('path');

const server = app.listen(process.env.PORT, () => {
  console.log(`服務器正在${process.env.PORT}端口上運行.`);
});

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.host,
  },
});

io.on('connection', (socket) => {
  socket.on('setup', (userData) => {
    socket.join(userData.user._id);
    // console.log(userData.user._id);
    socket.emit('connected');
  });
  socket.on('join chat', (room) => {
    socket.join(room);
    // console.log('用户加入了群聊: ' + room);
  });
  socket.on('new message', (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if (!chat.users) return console.log('chat.users not defined');
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit('message recieved', newMessageRecieved);
    });
  });
  socket.on('typing', (room) => socket.in(room).emit('typing'));
  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));
  socket.off('setup', (userData) => {
    console.log('用户已离线');
    socket.leave(userData.user._id);
  });
});

app.use(express.json());
app.use(cors());
app.use('/api/auth', userRoute);
app.use('/api/chat', chatRoute);
app.use('/api/message', messageRoute);

// ----發佈
// const __dirname1 = path.resolve();
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname1, './build')));
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname1, 'build', 'index.html'));
//   });
// } else {
//   app.get('/', (req, res) => {
//     res.send('API成功運行中');
//   });
// }
// ----發佈

//連結到DB
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('成功連線到Mongo Altas.');
  })
  .catch((e) => {
    console.log(e);
  });
