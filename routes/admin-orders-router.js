const { Router } = require('express');
const orderController = require('../controllers/order-controller');
const adminOrdersRouter = Router();

adminOrdersRouter.get('/', orderController.getAdminOrderList);

module.exports = adminOrdersRouter;
