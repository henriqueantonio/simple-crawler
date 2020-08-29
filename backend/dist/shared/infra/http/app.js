"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _cors = _interopRequireDefault(require("cors"));

var _AppError = _interopRequireDefault(require("../../errors/AppError"));

var _routes = _interopRequireDefault(require("./routes"));

require("../typeorm");

require("../../container");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class App {
  constructor() {
    this.app = void 0;
    this.app = (0, _express.default)();
    this.app.use(_express.default.json());
    this.middlewares();
    this.routes();
    this.errors();
  }

  middlewares() {
    this.app.use((0, _cors.default)());
  }

  routes() {
    this.app.use(_routes.default);
  }

  errors() {
    this.app.use((err, request, response, _) => {
      if (err instanceof _AppError.default) {
        return response.status(err.statusCode).json({
          status: 'error',
          message: err.message
        });
      }

      console.error(err);
      return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    });
  }

}

var _default = new App().app;
exports.default = _default;