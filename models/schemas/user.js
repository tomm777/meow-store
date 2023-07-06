const { Schema } = require('mongoose');
const shortId = require('./types/short-id.js');

const UserSchema = new Schema(
  {
    // shortId 추가
    shortId,
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
    deleteYn: {
      type: String,
      default: 'N',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = UserSchema;
