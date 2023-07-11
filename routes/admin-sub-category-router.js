const { Router } = require('express');
const subCategoryController = require('../controllers/sub-category-controller');
const adminSubCategoryRouter = Router();

adminSubCategoryRouter.post('/', subCategoryController.createSubCategory);
adminSubCategoryRouter.get('/', subCategoryController.getSubCategoryList);
adminSubCategoryRouter.delete('/:id', subCategoryController.removeSubCategory);
adminSubCategoryRouter.put('/:id', subCategoryController.modifySubCategory);

module.exports = adminSubCategoryRouter;
