const { Router } = require('express');
const orderController = require('../controllers/order-controller');
const adminOrderRouter = Router();

adminOrderRouter.post('/:id', orderController.editOrderState);
adminOrderRouter.delete('/:id', orderController.removeOrder);

module.exports = adminOrderRouter;
