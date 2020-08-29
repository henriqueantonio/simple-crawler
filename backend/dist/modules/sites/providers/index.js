"use strict";

var _tsyringe = require("tsyringe");

var _SimpleCrawlerProvider = _interopRequireDefault(require("./Crawler/implementations/SimpleCrawlerProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('CrawlerProvider', _SimpleCrawlerProvider.default);