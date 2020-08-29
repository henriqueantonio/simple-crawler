"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _site = _interopRequireDefault(require("../../../modules/sites/infra/http/routes/site.routes"));

var _page = _interopRequireDefault(require("../../../modules/pages/infra/http/routes/page.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/sites', _site.default);
routes.use('/pages', _page.default);
var _default = routes;
exports.default = _default;