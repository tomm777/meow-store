const { Router } = require('express');
const orderController = require('../controllers/order-controller');
const memberOrdersRouter = Router();

memberOrdersRouter.get('/', orderController.getOrderList);

module.exports = memberOrdersRouter;
