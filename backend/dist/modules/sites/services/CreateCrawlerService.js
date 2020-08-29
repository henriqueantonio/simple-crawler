"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ICrawlerProvider = _interopRequireDefault(require("../providers/Crawler/models/ICrawlerProvider"));

var _ISitesRepository = _interopRequireDefault(require("../repositories/ISitesRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateCrawlerService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CrawlerProvider')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('SitesRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ICrawlerProvider.default === "undefined" ? Object : _ICrawlerProvider.default, typeof _ISitesRepository.default === "undefined" ? Object : _ISitesRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateCrawlerService {
  constructor(crawlerProvider, sitesRepository) {
    this.crawlerProvider = crawlerProvider;
    this.sitesRepository = sitesRepository;
  }

  async execute(id) {
    const site = await this.sitesRepository.findById(id);

    if (!site) {
      throw new _AppError.default('Site not found');
    }

    const {
      name
    } = site;
    return this.crawlerProvider.startScan(name);
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = CreateCrawlerService;
exports.default = _default;