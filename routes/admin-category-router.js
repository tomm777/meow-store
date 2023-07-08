const { Router } = require('express');
const categoryController = require('../controllers/category-controller');
const adminCategoryRouter = Router();

adminCategoryRouter.post('/', categoryController.createCategory);
adminCategoryRouter.get('/', categoryController.getCategories);
adminCategoryRouter.delete('/', categoryController.deleteCategory);
adminCategoryRouter.put('/', categoryController.updateCategory);

module.exports = adminCategoryRouter;
