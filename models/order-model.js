const mongoose = require('mongoose');
const orderSchema = require('./schemas/order');

const Order = mongoose.model('orders', orderSchema);

class OrderModel {
  async createWithSession(order, option) {
    const newOrder = await Order.create([order], option);

    return newOrder;
  }

  async findById(id) {
    const order = await Order.findOne({ _id: id });
    console.log(order);
    return order;
  }

  async updateById(orderId, update) {
    const filter = { _id: orderId };
    const option = { returnOriginal: false };

    const updatedOrder = await Order.findOneAndUpdate(filter, update, option);
    return updatedOrder;
  }

  async findAll(option = {}) {
    const orders = await Order.find({ ...option, deleteYn: 'N' });
    return orders;
  }
}

const orderModel = new OrderModel();
module.exports = orderModel;
