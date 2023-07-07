const Category = require('../models/category-model');

class CategoriesService {
  async getCategoryList() {
    const categories = await Category.findAll();
    return categories;
  }

  async createCategory(newCategory) {
    const category = await Category.create(newCategory);
    return category;
  }
  async findCategory(newCategory) {
    const category = await Category.findOne({ categoryName: newCategory });
    return category;
  }
}

const categoriesService = new CategoriesService();
module.exports = categoriesService;
