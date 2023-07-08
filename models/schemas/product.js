const { Schema } = require('mongoose');
const moment = require('moment');

const ProductSchema = new Schema(
  {
    /*userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },*/
    /*categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'categorys',
      required: true,
    },*/
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    repImgUrl: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      min: 0,
      default: 0,
      required: true,
    },
    createDate: {
      type: String,
      default: () => moment().format('YYYY-MM-DD HH:mm:ss'),
    },
    deleteYn: {
      type: String,
      default: 'N',
    },
    deleteDate: {
      type: String,
    },
  },
  {
    collection: 'products',
  },
);

module.exports = ProductSchema;
