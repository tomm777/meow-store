const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const Swagger = require('../handler/swagger');

const admin = require('../docs/api/admin');
const member = require('../docs/api/member');
const user = require('../docs/api/user');
const products = require('../docs/api/products');
const product = require('../docs/api/product');
const categorys = require('../docs/api/categorys');

class ApiDocs {
  #apiDocOption;
  #swagger;

  constructor() {
    this.#apiDocOption = {
      ...admin,
      ...member,
      ...user,
      ...products,
      ...product,
      ...categorys,
    };

    this.#swagger = new Swagger();
  }

  init() {
    this.#swagger.addAPI(this.#apiDocOption);
  }

  getSwaggerOption() {
    const { apiOption, setUpoption } = this.#swagger.getOption();

    const specs = swaggerJsDoc(apiOption);

    return {
      swaggerUI,
      specs,
      setUpoption,
    };
  }
}

module.exports = ApiDocs;
