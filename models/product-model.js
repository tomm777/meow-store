const mongoose = require('mongoose');
const productSchema = require('./schemas/product');

const Product = mongoose.model('products', productSchema);

class ProductModel {
  async findAll() {
    const products = await Product.find({});
    return products;
  }

  async findById(id) {
    const product = await Product.findOne({ _id: id });
    return product;
  }

  async create(product) {
    const newProduct = await Product.create(product);
    return newProduct;
  }
}

const productModel = new ProductModel();
module.exports = productModel;
