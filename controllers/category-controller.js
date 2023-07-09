const CategoriesService = require('../services/category-service');
const CategoryModel = require('../models/category-model');

class CategoryController {
  // 카테고리 조회
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
    //카테고리 생성
    try {
      const { categoryName, lowCategoryName } = req.body;
      const checkCategory = await CategoryModel.findOne({ categoryName });
      // 하위 카테고리 명이 있을때 받아온 상위카테고리를 찾아서 하위 카테고리를 생성
      if (lowCategoryName) {
        CategoryModel.updateOne({ categoryName, lowCategoryName });
        res.status(201).json({ success: true });
        return;
      }
      // 상위 카테고리만 올때(categoryName: '상위카테고리')
      if (checkCategory) {
        // 중복 validation
        if (checkCategory.categoryName === categoryName) {
          return res
            .status(400)
            .json({ success: false, message: '이미 있는 카테고리 명입니다' });
        }
      }
      // 중복 되지 않았을 때 상위 카테고리만 생성
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
  // 하위 카테고리 삭제
  async deleteLowCategory(req, res) {
    try {
      const { categoryName, lowCategoryName } = req.body;
      //categoryName로 db에 존재하는지 확인
      console.log(categoryName);
      const category = await CategoryModel.findOne({ categoryName });
      // 하위 카테고리가 있을때 lowCategoryName이 포함되지 않은 요소들로 재배열
      // const updatecategory = category.lowCategoryName.filter(
      //   (item) => !lowCategoryName.includes(item),
      // );
      // category.lowCategoryName = updatecategory;
      // console.log(category.lowCategoryName);
      // await category.save();
      // console.log(category);
      res
        .status(201)
        .json({ success: true, message: '하위 카테고리 삭제 완료' });
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ success: false, message: err.message });
    }
  }
  // 카테고리 삭제
  async removeCategory(req, res) {
    try {
      const { id } = req.params;
      console.log(id);
      const result = await CategoriesService.removeCategory(id);
      res.status(200).json(result);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ success: false, message: err.message });
    }
  }

  // 카테고리 수정
  async updateCategory(req, res) {
    try {
      if (Object.keys(req.body).length === 2) {
        const { categoryName, newCategoryName } = req.body;
        const newCategoryCheck = await CategoryModel.findOne({
          categoryName: newCategoryName,
        });
        if (newCategoryCheck !== null) {
          return res
            .status(400)
            .json({ success: false, message: '이미 있는 카테고리 명입니다' });
        }
        const category = await CategoryModel.findOne({ categoryName });
        category.categoryName = newCategoryName;
        await category.save();
        return res
          .status(200)
          .json({ success: true, message: '수정 완료', data: category });
      }
      const { categoryName, lowCategoryName, newLowCategoryName } = req.body;
      let validationCheck = false;
      const category = await CategoryModel.findOne({ categoryName });
      category.lowCategoryName.forEach((item) => {
        if (item === newLowCategoryName) {
          validationCheck = true;
        }
      });
      if (validationCheck) {
        return res
          .status(400)
          .json({ success: false, message: '중복 된 카테고리 입니다' });
      }
      const updatedLowCategoryName = category.lowCategoryName.map((item) => {
        if (item === lowCategoryName) {
          return newLowCategoryName;
        }
        return item;
      });
      category.lowCategoryName = updatedLowCategoryName;
      await category.save();
      return res
        .status(200)
        .json({ success: true, message: '수정 완료', data: category });
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ success: false, message: err.message });
    }
  }
}

const categoryController = new CategoryController();
module.exports = categoryController;
