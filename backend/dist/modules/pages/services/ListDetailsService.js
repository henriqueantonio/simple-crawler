"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ISitesRepository = _interopRequireDefault(require("../../sites/repositories/ISitesRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IPagesRepository = _interopRequireDefault(require("../repositories/IPagesRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListDetailsService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PagesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('SitesRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IPagesRepository.default === "undefined" ? Object : _IPagesRepository.default, typeof _ISitesRepository.default === "undefined" ? Object : _ISitesRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListDetailsService {
  constructor(pagesRepository, sitesRepository) {
    this.pagesRepository = pagesRepository;
    this.sitesRepository = sitesRepository;
  }

  async execute(id) {
    const site = await this.sitesRepository.findById(id);

    if (!site) {
      throw new _AppError.default('Site not found');
    }

    const sites = await this.pagesRepository.getDetails(site.id.toString());
    return sites;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = ListDetailsService;
exports.default = _default;