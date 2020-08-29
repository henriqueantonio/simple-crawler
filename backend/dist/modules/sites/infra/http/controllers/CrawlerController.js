"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateCrawlerService = _interopRequireDefault(require("../../../services/CreateCrawlerService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CrawlerController {
  async create(request, response) {
    const {
      id
    } = request.params;

    const crawlPageService = _tsyringe.container.resolve(_CreateCrawlerService.default);

    await crawlPageService.execute(id);
    return response.json({
      success: 'Crawler started.'
    });
  }

}

var _default = CrawlerController;
exports.default = _default;