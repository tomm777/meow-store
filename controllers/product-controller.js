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

  async getProduct(req, res) {
    try {
      const { id } = req.params;

      const products = await ProductService.getProductById(id);
      res.status(200).json(products);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ success: false, message: err.message });
    }
  }

  async createProduct(req, res) {
    try {
      let repImgUrl = '/assets/not-image.png';
      if (req.file) {
        repImgUrl = '/uploads/' + req.file?.filename;
      }

      const product = await ProductService.createProduct({
        ...req.body,
        userId: req.currentUserId,
        repImgUrl,
      });

      res.status(201).json({ success: true, data: product });
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ success: false, message: err.message });
    }
  }

  async editProduct(req, res, next) {
    try {
      const { id } = req.params;
      const updatedProduct = await ProductService.editProduct(id, req.body);
      res.status(200).json(updatedProduct);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ success: false, message: err.message });
    }
  }
  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const result = await ProductService.deleteProduct(id);
      res.status(200).json(result);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ success: false, message: err.message });
    }
  }
}
const productController = new ProductController();
module.exports = productController;
