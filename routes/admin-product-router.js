const { Router } = require('express');
const productController = require('../controllers/product-controller');
const adminProductRouter = Router();

adminProductRouter.post('/', productController.createProduct);

module.exports = adminProductRouter;
