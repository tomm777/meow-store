const { Router } = require('express');
const productController = require('../controllers/product-controller');
const productRouter = Router();

productRouter.get('/:id', productController.getProduct);

module.exports = productRouter;
