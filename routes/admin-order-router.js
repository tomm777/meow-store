const { Router } = require('express');
const { adminRequired } = require('../middlewares');
const orderController = require('../controllers/order-controller');
const adminOrderRouter = Router();

adminOrderRouter.post('/:id', adminRequired, orderController.editOrderState);
adminOrderRouter.delete('/:id', adminRequired, orderController.removeOrder);

module.exports = adminOrderRouter;
