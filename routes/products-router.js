const { Router } = require('express');
const productController = require('../controllers/product-controller');
const productsRouter = Router();

productsRouter.get('/', productController.getProducts);

module.exports = productsRouter;
