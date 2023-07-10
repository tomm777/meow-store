const { Schema } = require('mongoose');
const moment = require('moment');

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    auth: {
      type: String,
      default: 'USER',
    },
    createDate: {
      type: String,
      default: () => moment().format('YYYY-MM-DD HH:mm:ss'),
    },
  },
  {
    collection: 'users',
  },
);

module.exports = UserSchema;
