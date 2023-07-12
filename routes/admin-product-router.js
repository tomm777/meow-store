const { Router } = require('express');
const { adminRequired } = require('../middlewares');
const { upload } = require('../middlewares/multer');
const productController = require('../controllers/product-controller');
const adminProductRouter = Router();

adminProductRouter.post(
  '/',
  adminRequired,
  upload.single('file'),
  productController.createProduct,
);
adminProductRouter.post(
  '/:id',
  adminRequired,
  upload.single('file'),
  productController.editProduct,
);
adminProductRouter.delete(
  '/:id',
  adminRequired,
  productController.deleteProduct,
);

module.exports = adminProductRouter;
