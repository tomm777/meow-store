const { Router } = require('express');
const { upload } = require('../middlewares/multer');
const productController = require('../controllers/product-controller');
const adminProductRouter = Router();

adminProductRouter.post(
  '/',
  upload.single('file'),
  productController.createProduct,
);
adminProductRouter.post('/:id', productController.editProduct);
adminProductRouter.delete('/:id', productController.deleteProduct);

module.exports = adminProductRouter;
