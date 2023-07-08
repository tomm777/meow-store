const { Router } = require('express');
const productController = require('../controllers/product-controller');
const adminProductRouter = Router();

adminProductRouter.post('/', productController.createProduct);
adminProductRouter.post('/:id', productController.editProduct);
adminProductRouter.delete('/:id', productController.deleteProduct);

module.exports = adminProductRouter;
