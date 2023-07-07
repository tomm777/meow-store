const mongoose = require('mongoose');
const moment = require('moment');
const orderItemSchema = require('./schemas/order-item');

const OrderItem = mongoose.model('order-items', orderItemSchema);

class OrderItemModel {
  async insertMany(orderItemList, option) {
    const newOrderItemList = await OrderItem.insertMany(orderItemList, option);
    return newOrderItemList;
  }

  async findByOrderId(orderId) {
    const orderItems = await OrderItem.find({ orderId }).populate('productId');
    console.log(orderItems);
    return orderItems;
  }

  async cancelOderItems(orderItemIds) {
    const result = await OrderItem.updateMany(
      { _id: { $in: orderItemIds } },
      { cancelYn: 'Y', cancelDate: moment().format('YYYY-MM-DD HH:mm:ss') },
    );
    return result;
  }
}

const orderItemModel = new OrderItemModel();
module.exports = orderItemModel;
