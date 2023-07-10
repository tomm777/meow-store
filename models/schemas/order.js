const { Schema } = require('mongoose');
const moment = require('moment');

const OrderSchema = new Schema(
  {
    /*userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },*/
    receiver: {
      type: String,
      required: true,
    },
    receiverContack: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    detailAddress: {
      type: String,
      required: false,
    },
    shippingMessage: {
      type: String,
      required: false,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: '결제완료',
    },
    createDate: {
      type: String,
      default: () => moment().format('YYYY-MM-DD HH:mm:ss'),
    },
    cancelDate: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    repImgUrl: {
      type: String,
      required: true,
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
    collection: 'orders',
  },
);

module.exports = OrderSchema;
