"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ISchedulerProvider = _interopRequireDefault(require("../../../shared/container/providers/Scheduler/models/ISchedulerProvider"));

var _ISchedulerRepository = _interopRequireDefault(require("../repositories/ISchedulerRepository"));

var _ISitesRepository = _interopRequireDefault(require("../repositories/ISitesRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DeleteShedulerService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('SchedulerProvider')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('SchedulerRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('SitesRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _ISchedulerProvider.default === "undefined" ? Object : _ISchedulerProvider.default, typeof _ISchedulerRepository.default === "undefined" ? Object : _ISchedulerRepository.default, typeof _ISitesRepository.default === "undefined" ? Object : _ISitesRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class DeleteShedulerService {
  constructor(schedulerProvider, shcedulerRepository, sitesRepository) {
    this.schedulerProvider = schedulerProvider;
    this.shcedulerRepository = shcedulerRepository;
    this.sitesRepository = sitesRepository;
  }

  async execute(id) {
    const site = await this.sitesRepository.findById(id);

    if (!site) {
      throw new _AppError.default('Site not found');
    }

    const existsInRepository = this.shcedulerRepository.getSiteByName(site.name);

    if (!existsInRepository) {
      throw new _AppError.default("This site don't have a job scheduled");
    }

    const {
      jobId
    } = this.shcedulerRepository.delete(site.name);
    this.schedulerProvider.delete(jobId);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = DeleteShedulerService;
exports.default = _default;