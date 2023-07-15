const { Router } = require('express');
const { adminRequired } = require('../middlewares');
const subCategoryController = require('../controllers/sub-category-controller');
const adminSubCategoryRouter = Router();

adminSubCategoryRouter.post(
  '/',
  adminRequired,
  subCategoryController.createSubCategory,
);
adminSubCategoryRouter.get('/', subCategoryController.getSubCategoryList);
adminSubCategoryRouter.delete(
  '/:id',
  adminRequired,
  subCategoryController.removeSubCategory,
);
adminSubCategoryRouter.put(
  '/:id',
  adminRequired,
  subCategoryController.modifySubCategory,
);

module.exports = adminSubCategoryRouter;
