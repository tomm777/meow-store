const { Router } = require('express');
const { adminRequired } = require('../middlewares');
const orderController = require('../controllers/order-controller');
const adminOrdersRouter = Router();

adminOrdersRouter.get('/', adminRequired, orderController.getAdminOrderList);

module.exports = adminOrdersRouter;
