const { Router } = require('express');
const orderController = require('../controllers/order-controller');
const memberOrderRouter = Router();

memberOrderRouter.post('/', orderController.createOrder);
memberOrderRouter.get('/:id', orderController.getOrder);
memberOrderRouter.post('/:id', orderController.cancelOrder);
memberOrderRouter.post('/:id/info', orderController.editOrderInfo);
memberOrderRouter.delete('/:id/products', orderController.removeOrderProducts);

module.exports = memberOrderRouter;
