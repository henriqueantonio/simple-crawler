"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ISitesRepository = _interopRequireDefault(require("../repositories/ISitesRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DeleteSiteService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('SitesRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ISitesRepository.default === "undefined" ? Object : _ISitesRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class DeleteSiteService {
  constructor(sitesRepository) {
    this.sitesRepository = sitesRepository;
  }

  async execute(id) {
    const site = await this.sitesRepository.findById(id);

    if (!site) {
      throw new _AppError.default('Site ID not found');
    }

    await this.sitesRepository.delete(site);
  }

}) || _class) || _class) || _class) || _class);
var _default = DeleteSiteService;
exports.default = _default;