const mongoose = require('mongoose');
const CategorySchema = require('./schemas/category');

const Category = mongoose.model('Category', CategorySchema);

class CategoryModel {
  async findAll() {
    const categories = await Category.find({});
    return categories;
  }

  async create(category) {
    const newCategory = await Category.create(category);
    return newCategory;
  }
  async findOne(newCategory) {
    const category = await Category.findOne(newCategory);
    return category;
  }
  async updateOne(newCategory) {
    const category = await Category.updateOne(
      { categoryName: newCategory.categoryName },
      { $push: { lowCategoryName: newCategory.lowCategoryName } },
    );
    return category;
  }
}

const categoryModel = new CategoryModel();

module.exports = categoryModel;
