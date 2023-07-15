const { Schema } = require('mongoose');

const subcategorySchema = new Schema(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
      require: true,
    },
    subCategoryName: {
      type: String,
      require: true,
    },
  },
  {
    collection: 'subcategories',
  },
);

module.exports = subcategorySchema;
