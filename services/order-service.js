const { startSession } = require('mongoose');
const moment = require('moment');
const Product = require('../models/product-model');
const Order = require('../models/order-model');
const OrderItem = require('../models/order-item-model');

class OrderService {
  async createOrder({
    orderItemList,
    receiver,
    receiverContact,
    zipCode,
    address,
    detailAddress,
    shippingMessage,
    totalPrice,
  }) {
    const session = await startSession();

    try {
      session.startTransaction();

      const reqProduct = await Product.findById(orderItemList[0].productId);
      const title =
        orderItemList.length > 1
          ? `${reqProduct.name} 외 ${orderItemList.length - 1}건`
          : `${reqProduct.name}`;
      const [newOrder] = await Order.createWithSession(
        {
          receiver,
          receiverContact,
          zipCode,
          address,
          detailAddress,
          shippingMessage,
          totalPrice,
          title,
          repImgUrl: reqProduct.repImgUrl,
        },
        { session },
      );

      await OrderItem.insertMany(
        orderItemList.map((orderItemData) => ({
          orderId: newOrder._id,
          ...orderItemData,
        })),
        { session },
      );

      await session.commitTransaction();

      return newOrder;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async getOrderById(id) {
    const order = await Order.findById(id);
    const orderItemList = await OrderItem.findByOrderId(id);

    return { order, orderItemList };
  }

  async cancelOrder(id) {
    //TODO : 결제 완료일때만 취소할수 있도록 하기
    await Order.updateById(id, { status: '취소' });
    return { result: 'success' };
  }

  async editOrderInfo(id, update) {
    //TODO : 배송전일때만 수정할 수 있도록 하기
    const updatedOrder = await Order.updateById(id, {
      ...update,
      cancelDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    });
    return updatedOrder;
  }

  async removeOrderProducts(orderId, orderItemIds) {
    //TODO : 배송전일때만 수정할 수 있도록 하기
    const result = await OrderItem.cancelOderItems(orderItemIds);
    return result;
  }

  async getOrderList() {
    //TODO: user 검색 필터 추가할것
    const orders = await Order.findAll();
    return orders;
  }

  async getAdminOrderList() {
    const orders = await Order.findAll();
    return orders;
  }

  async editOrderState(id, update) {
    const updatedOrder = await Order.updateById(id, update);
    return updatedOrder;
  }

  async removeOrder(id) {
    //TODO : 배송완료일때만 수정할 수 있도록 하기
    const result = await Order.updateById(id, {
      deleteYn: 'Y',
      deleteDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    });
    return result;
  }
}

const orderService = new OrderService();
module.exports = orderService;
