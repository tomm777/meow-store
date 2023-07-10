const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const {
  memberOrderRouter,
  memberOrdersRouter,
  adminProductRouter,
  adminCategoryRouter,
  productRouter,
  productsRouter,
  adminOrderRouter,
  adminOrdersRouter,
} = require('./routes');

require('dotenv').config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('views/pages'));
app.use('/assets', express.static('views/assets'));
app.use('/components', express.static('views/components'));
app.use('/utils', express.static('views/utils'));
app.use('/common', express.static('views/common'));
app.use('/uploads', express.static('views/uploads'));

app.use('/api/products', productsRouter);
app.use('/api/product', productRouter);
app.use('/api/member/order', memberOrderRouter);
app.use('/api/member/orders', memberOrdersRouter);
app.use('/api/admin/product', adminProductRouter);
app.use('/api/admin/category', adminCategoryRouter);
app.use('/api/admin/order', adminOrderRouter);
app.use('/api/admin/orders', adminOrdersRouter);

//swagger 적용
const ApiDcos = require('./docs/index');
function getSwaggerOption() {
  const apiDocs = new ApiDcos();
  apiDocs.init();

  return apiDocs.getSwaggerOption();
}
const { swaggerUI, specs, setUpoption } = getSwaggerOption();
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs, setUpoption));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`포트: ${PORT} 서버 가동 시작`);
});
