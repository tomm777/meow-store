const { Schema } = require('mongoose');
const moment = require('moment');

const OrderItemSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'orders',
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'products',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    createDate: {
      type: String,
      default: () => moment().format('YYYY-MM-DD HH:mm:ss'),
    },
    cancelYn: {
      type: String,
      default: 'N',
    },
    cancelDate: {
      type: String,
    },
  },
  {
    collection: 'order-items',
  },
);

module.exports = OrderItemSchema;
