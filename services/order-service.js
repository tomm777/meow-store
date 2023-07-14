const { startSession } = require('mongoose');
const { moment } = require('../utils/moment');
const Product = require('../models/product-model');
const Order = require('../models/order-model');
const OrderItem = require('../models/order-item-model');

class OrderService {
  async createOrder(
    {
      orderItemList,
      receiver,
      receiverContact,
      zipCode,
      address,
      detailAddress,
      shippingMessage,
      totalPrice,
    },
    userId,
  ) {
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
          userId,
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
    const updatedOrder = await Order.updateById(id, {
      status: '취소',
      cancelDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    });
    return updatedOrder;
  }

  async editOrderInfo(id, update) {
    //TODO : 배송전일때만 수정할 수 있도록 하기
    const updatedOrder = await Order.updateById(id, update);
    return updatedOrder;
  }

  async removeOrderProducts(orderId, orderItemIds) {
    //TODO : 배송전일때만 수정할 수 있도록 하기
    await OrderItem.cancelOderItems(orderItemIds);
    //TODO:orderid로 조회한 list중에 모두 cancelYn 이면 주문상태 취소로 변경하기
    const orderItemList = await OrderItem.findByOrderId(orderId);

    let cacleTotalAmount = 0;
    let cancleItem = 0;
    console.log(orderItemList);
    orderItemList.forEach((item) => {
      if (item.cancelYn === 'Y') {
        cacleTotalAmount += item.totalPrice;
        cancleItem += 1;
      }
    });

    //업데이트
    let update = {
      cacleTotalAmount,
    };
    console.log(orderItemList);
    if (orderItemList.length === cancleItem) {
      update.status = '취소';
      update.cancelDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    const updatedOrder = await Order.updateById(orderId, update);
    return { order: updatedOrder, orderItemList };
  }

  async getOrderList(userId) {
    //TODO: user 검색 필터 추가할것
    const orders = await Order.findAll({ userId });
    return orders;
  }

  async getAdminOrderList() {
    const orders = await Order.findAll({ deleteYn: 'N' });
    return orders;
  }

  async editOrderState(id, update) {
    let option = {
      ...update,
    };
    if (update.status === '취소') {
      option.cancelDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
    const updatedOrder = await Order.updateById(id, option);
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
