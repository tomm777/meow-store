const { Router } = require('express');
const orderController = require('../controllers/order-controller');
const memberOrderRouter = Router();

memberOrderRouter.post('/order', orderController.createOrder);
memberOrderRouter.get('/order/:id', orderController.getOrder);
memberOrderRouter.post('/order/:id', orderController.cancelOrder);
memberOrderRouter.post('/order/:id/info', orderController.editOrderInfo);
memberOrderRouter.delete(
  '/order/:id/products',
  orderController.removeOrderProducts,
);
memberOrderRouter.get('/orders', orderController.getOrderList);

module.exports = memberOrderRouter;
