const mongoose = require('mongoose');
require('dotenv').config();

module.exports = () => {
  const connect = () => {
    mongoose.connect(process.env.DBURL);
  };

  connect();

  mongoose.connection.on('connected', () => {
    console.log('Successfully connected to MongoDB');
  });

  mongoose.connection.on('error', (error) => {
    console.log('mongodb connection Error!', error);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('mongodb disconnected!. Try connect again');
    connect();
  });

  // 작성한 스키마들을 import합니다.
};
