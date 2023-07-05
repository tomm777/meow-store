const swaggerOpenApiVersion = '3.0.0';

const swaggerInfo = {
  title: '야옹 잡화점 RestFul API',
  version: '0.0.1',
  description: '야옹 잡화점 Node.js Swaager, RestFul API 클라이언트 UI',
};

const swaggerProduces = ['application/json'];

const swaggerServers = [
  {
    url: 'http://localhost:3000',
    description: '로컬 서버',
  },
];

const swaggerTags = [];

class Swagger {
  static #uniqueSwaggerInstance;
  #paths = [{}];
  #option = {};
  #setUpOption = {};

  /**
   *
   * @returns {Swagger}
   */
  constructor() {
    if (!Swagger.#uniqueSwaggerInstance) {
      this.#init();
      Swagger.#uniqueSwaggerInstance = this;
    }

    return Swagger.#uniqueSwaggerInstance;
  }

  #init() {
    this.#option = {
      definition: {
        openapi: swaggerOpenApiVersion,
        info: swaggerInfo,
        servers: swaggerServers,

        /* open api 3.0.0 version option */
        produces: swaggerProduces,
        tags: swaggerTags,
      },
      apis: [],
    };
    this.#setUpOption = {
      // search
      explorer: true,
    };
  }

  addAPI(api) {
    this.#paths.push(api);
  }

  #processAPI() {
    const path = {};

    for (let i = 0; i < this.#paths.length; i += 1) {
      for (const [key, value] of Object.entries(this.#paths[i])) {
        path[key] = value;
      }
    }

    return path;
  }

  getOption() {
    const path = this.#processAPI();
    this.#option.definition.paths = path;

    return {
      apiOption: this.#option,
      setUpOption: this.#setUpOption,
    };
  }
}

module.exports = Swagger;
