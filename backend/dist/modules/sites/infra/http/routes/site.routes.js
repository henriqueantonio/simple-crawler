"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _SiteController = _interopRequireDefault(require("../controllers/SiteController"));

var _SchedulerController = _interopRequireDefault(require("../controllers/SchedulerController"));

var _CrawlerController = _interopRequireDefault(require("../controllers/CrawlerController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const siteRouter = (0, _express.Router)();
const siteController = new _SiteController.default();
const schedulerController = new _SchedulerController.default();
const crawlerController = new _CrawlerController.default();
siteRouter.get('/scheduler', schedulerController.index);
siteRouter.get('/:siteName/scheduler', schedulerController.show);
siteRouter.post('/:id/crawler', crawlerController.create);
siteRouter.post('/:id/scheduler', schedulerController.create);
siteRouter.put('/:id/scheduler', schedulerController.update);
siteRouter.delete('/:id/scheduler', schedulerController.delete);
siteRouter.get('/:id', siteController.show);
siteRouter.get('/', siteController.index);
siteRouter.post('/', siteController.create);
siteRouter.put('/:id', siteController.update);
siteRouter.delete('/:id', siteController.delete);
var _default = siteRouter;
exports.default = _default;