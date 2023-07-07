const mongoose = require('mongoose');
const productSchema = require('./schemas/product');

const Product = mongoose.model('Product', productSchema);

class ProductModel {
  async findAll() {
    const products = await Product.find({});
    return products;
  }

  async create(product) {
    const newProduct = await Product.create(product);
    return newProduct;
  }
}

const productModel = new ProductModel();
module.exports = productModel;
