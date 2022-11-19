const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const userRoute = require('./routes/userRoute');
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/api/auth', userRoute);

//連結到DB
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

app.listen(8899, () => {
  console.log('服務器正在8899端口上運行.');
});
