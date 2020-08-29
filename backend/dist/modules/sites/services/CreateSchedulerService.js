"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ISitesRepository = _interopRequireDefault(require("../repositories/ISitesRepository"));

var _ISchedulerProvider = _interopRequireDefault(require("../../../shared/container/providers/Scheduler/models/ISchedulerProvider"));

var _ICrawlerProvider = _interopRequireDefault(require("../providers/Crawler/models/ICrawlerProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ISchedulerRepository = _interopRequireDefault(require("../repositories/ISchedulerRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateCrawlerService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('SitesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('SchedulerProvider')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('CrawlerProvider')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('SchedulerRepository')(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _ISitesRepository.default === "undefined" ? Object : _ISitesRepository.default, typeof _ISchedulerProvider.default === "undefined" ? Object : _ISchedulerProvider.default, typeof _ICrawlerProvider.default === "undefined" ? Object : _ICrawlerProvider.default, typeof _ISchedulerRepository.default === "undefined" ? Object : _ISchedulerRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class CreateCrawlerService {
  constructor(sitesRepository, schedulerProvider, crawlerProvider, schedulerRepository) {
    this.sitesRepository = sitesRepository;
    this.schedulerProvider = schedulerProvider;
    this.crawlerProvider = crawlerProvider;
    this.schedulerRepository = schedulerRepository;
  }

  async execute({
    expression,
    id
  }) {
    const site = await this.sitesRepository.findById(id);

    if (!site) {
      throw new _AppError.default('Site not found');
    }

    const {
      name,
      url
    } = site;
    const job = this.schedulerProvider.create(expression, () => {
      this.crawlerProvider.startScan(name);
      console.log(`Job started: ${name} - ${url}`);
    });
    this.schedulerRepository.create(site.name, job);
    return job;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = CreateCrawlerService;
exports.default = _default;