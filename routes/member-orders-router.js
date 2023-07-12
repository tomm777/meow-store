const { Router } = require('express');
const { loginRequired } = require('../middlewares');
const orderController = require('../controllers/order-controller');
const memberOrdersRouter = Router();

memberOrdersRouter.get('/', loginRequired, orderController.getOrderList);

module.exports = memberOrdersRouter;
