const Product = require('../models/product-model');

class ProductsService {
  async getProductList() {
    const products = await Product.findAll();
    return products;
  }

  async createProduct(newProduct) {
    const product = await Product.create(newProduct);
    return product;
  }
}

const productsService = new ProductsService();
module.exports = productsService;
