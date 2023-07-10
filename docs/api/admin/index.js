const category = require('./category');
const order = require('./order');
const product = require('./product');

module.exports = {
  ...category,
  ...order,
  ...product,
};
