const productsRouter = require('./products-router');
const productRouter = require('./product-router');
const memberOrderRouter = require('./member-order-router');
const memberOrdersRouter = require('./member-orders-router');
const adminProductRouter = require('./admin-product-router');
const adminCategoryRouter = require('./admin-category-router');
const adminSubCategoryRouter = require('./admin-sub-category-router');
const adminOrderRouter = require('./admin-order-router');
const adminOrdersRouter = require('./admin-orders-router');

module.exports = {
  productsRouter,
  productRouter,
  memberOrderRouter,
  memberOrdersRouter,
  adminProductRouter,
  adminCategoryRouter,
  adminOrderRouter,
  adminOrdersRouter,
  adminSubCategoryRouter,
};
