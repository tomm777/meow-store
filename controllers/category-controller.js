const CategoriesService = require('../services/category-service');
const CategoryModel = require('../models/category-model');

class CategoryController {
  async getCategories(req, res) {
    try {
      const categories = await CategoriesService.getCategoryList();
      res.status(200).json(categories);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ success: false, message: err.message });
    }
  }

  async createCategory(req, res) {
    try {
      const { categoryName, lowCategoryName } = req.body;
      const checkCategory = await CategoryModel.findOne({ categoryName });

      if (lowCategoryName) {
        CategoryModel.updateOne({ categoryName, lowCategoryName });
        res.status(201).json({ success: true });
        return;
      }
      if (checkCategory) {
        if (checkCategory.categoryName === categoryName) {
          return res
            .status(400)
            .json({ success: false, message: '이미 있는 카테고리 명입니다' });
        }
      }
      const category = await CategoriesService.createCategory({
        categoryName,
        lowCategoryName: lowCategoryName || [],
      });
      res.status(201).json({ success: true, data: category });
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ success: false, message: err.message });
    }
  }
  async deleteCategory(req, res) {
    try {
      const { categoryName, lowCategoryName } = req.body;
      const category = await CategoryModel.findOne({ categoryName });
        console.log(category);
    //   if (lowCategoryName.length >= 1) {
    //     category.lowCategoryName = category.lowCategoryName.filter(
    //       (item) => item !== lowCategoryName,
    //     );
    //     await category.save();
    //     res.status(201).json({ success: true, data: category });
    //   }
    //   await CategoryModel.deleteOne({ categoryName });
      res.status(200).json({ success: true, message: '카테고리 삭제 완료' });
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ success: false, message: err.message });
    }
  }
}

const categoryController = new CategoryController();
module.exports = categoryController;
