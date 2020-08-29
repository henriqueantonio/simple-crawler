"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateSiteService = _interopRequireDefault(require("../../../services/CreateSiteService"));

var _UpdateSiteService = _interopRequireDefault(require("../../../services/UpdateSiteService"));

var _DeleteSiteService = _interopRequireDefault(require("../../../services/DeleteSiteService"));

var _ListSitesService = _interopRequireDefault(require("../../../services/ListSitesService"));

var _ListSiteService = _interopRequireDefault(require("../../../services/ListSiteService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CrawlerController {
  async show(request, response) {
    const {
      id
    } = request.params;

    const listSiteService = _tsyringe.container.resolve(_ListSiteService.default);

    const site = await listSiteService.execute(id);
    return response.json(site);
  }

  async index(_, response) {
    const listSitesService = _tsyringe.container.resolve(_ListSitesService.default);

    const sites = await listSitesService.execute();
    return response.json(sites);
  }

  async create(request, response) {
    const {
      name,
      url
    } = request.body;

    const createSiteService = _tsyringe.container.resolve(_CreateSiteService.default);

    const site = await createSiteService.execute({
      name,
      url
    });
    return response.json({
      site
    });
  }

  async update(request, response) {
    const {
      id
    } = request.params;
    const {
      name,
      url
    } = request.body;

    const updateSiteService = _tsyringe.container.resolve(_UpdateSiteService.default);

    const site = await updateSiteService.execute({
      id,
      name,
      url
    });
    return response.json(site);
  }

  async delete(request, response) {
    const {
      id
    } = request.params;

    const deleteSiteService = _tsyringe.container.resolve(_DeleteSiteService.default);

    await deleteSiteService.execute(id);
    return response.json({
      success: 'Site deleted'
    });
  }

}

var _default = CrawlerController;
exports.default = _default;