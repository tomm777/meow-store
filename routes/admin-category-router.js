const { Router } = require('express');
const categoryController = require('../controllers/category-controller');
const adminCategoryRouter = Router();

adminCategoryRouter.post('/', categoryController.createCategory);
adminCategoryRouter.get('/', categoryController.getCategories);
adminCategoryRouter.delete('/:id', categoryController.removeCategory);
adminCategoryRouter.put('/:id', categoryController.modifyCategory);
// adminCategoryRouter.patch('/', categoryController.deleteLowCategory);

module.exports = adminCategoryRouter;
