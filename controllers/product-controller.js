const ProductService = require('../services/product-service');

class ProductController {
  async getProducts(req, res) {
    try {
      const products = await ProductService.getProductList();
      res.status(200).json(products);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ success: false, message: err.message });
    }
  }

  async createProduct(req, res) {
    try {
      const { name, price, summary, description, repImgUrl } = req.body;

      const product = await ProductService.createProduct({
        name,
        price,
        summary,
        description,
        repImgUrl,
      });

      res.status(201).json({ success: true, data: product });
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ success: false, message: err.message });
    }
  }
}
const productController = new ProductController();
module.exports = productController;
