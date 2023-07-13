const { Schema } = require('mongoose');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    number: {
      type: String,
      require: true,
      unique: true,
      //TODO: 주문번호 생성 로직 업그레이드 해보기
      default: generateOrderNumber,
    },
    receiver: {
      type: String,
      required: true,
    },
    receiverContact: {
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

function generateOrderNumber() {
  const randomString = uuidv4().replace(/-/g, '').substring(0, 10);
  return `${moment().format('YYYYMMDDHHmmss')}${randomString}`;
}

module.exports = OrderSchema;
