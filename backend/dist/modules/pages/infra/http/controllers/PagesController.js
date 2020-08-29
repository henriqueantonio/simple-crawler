"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _SearchWordsService = _interopRequireDefault(require("../../../services/SearchWordsService"));

var _ListDetailsService = _interopRequireDefault(require("../../../services/ListDetailsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PagesController {
  async index(request, response) {
    const {
      siteId,
      search
    } = request.query;

    const searchWordsService = _tsyringe.container.resolve(_SearchWordsService.default);

    const sites = await searchWordsService.execute(siteId, search);
    return response.json(sites);
  }

  async details(request, response) {
    const {
      siteID
    } = request.params;

    const listDetailsService = _tsyringe.container.resolve(_ListDetailsService.default);

    const details = await listDetailsService.execute(siteID);
    return response.json(details);
  }

}

var _default = PagesController;
exports.default = _default;