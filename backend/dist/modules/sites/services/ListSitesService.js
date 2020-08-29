"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ISitesRepository = _interopRequireDefault(require("../repositories/ISitesRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListSitesService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('SitesRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ISitesRepository.default === "undefined" ? Object : _ISitesRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListSitesService {
  constructor(sitesRepository) {
    this.sitesRepository = sitesRepository;
  }

  async execute() {
    const sites = await this.sitesRepository.findAll();
    return sites;
  }

}) || _class) || _class) || _class) || _class);
var _default = ListSitesService;
exports.default = _default;