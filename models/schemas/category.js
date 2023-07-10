const { Schema } = require('mongoose');

const CategorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
  // lowCategoryName: [
  //   {
  //     type: String,
  //   },
  // ],
  lowCategoryName: {
    type: [String],
  },
});

module.exports = CategorySchema;
