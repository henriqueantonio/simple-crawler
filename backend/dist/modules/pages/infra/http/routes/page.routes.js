"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _PagesController = _interopRequireDefault(require("../controllers/PagesController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const pagesRouter = (0, _express.Router)();
const pagesController = new _PagesController.default();
pagesRouter.get('/', pagesController.index);
pagesRouter.get('/details/:siteID', pagesController.details);
var _default = pagesRouter;
exports.default = _default;