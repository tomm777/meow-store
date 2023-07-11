const { Schema } = require('mongoose');

const categorySchema = new Schema(
  {
    //name, id, title 등
    categoryName: {
      type: String,
      require: true,
    },
  },
  {
    collection: 'categories',
  },
);

module.exports = categorySchema;
