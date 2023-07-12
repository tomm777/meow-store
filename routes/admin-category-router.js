const { Router } = require('express');
const { adminRequired } = require('../middlewares');
const categoryController = require('../controllers/category-controller');
const adminCategoryRouter = Router();

adminCategoryRouter.post('/', adminRequired, categoryController.createCategory);
adminCategoryRouter.get('/', categoryController.getCategories);
adminCategoryRouter.delete(
  '/:id',
  adminRequired,
  categoryController.removeCategory,
);
adminCategoryRouter.put(
  '/:id',
  adminRequired,
  categoryController.modifyCategory,
);
// adminCategoryRouter.patch('/', categoryController.deleteLowCategory);

module.exports = adminCategoryRouter;
