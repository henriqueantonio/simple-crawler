"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ISchedulerProvider = _interopRequireDefault(require("../../../shared/container/providers/Scheduler/models/ISchedulerProvider"));

var _ISchedulerRepository = _interopRequireDefault(require("../repositories/ISchedulerRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateSchedulerService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('SchedulerProvider')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('SchedulerRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ISchedulerProvider.default === "undefined" ? Object : _ISchedulerProvider.default, typeof _ISchedulerRepository.default === "undefined" ? Object : _ISchedulerRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateSchedulerService {
  constructor(schedulerProvider, schedulerRepository) {
    this.schedulerProvider = schedulerProvider;
    this.schedulerRepository = schedulerRepository;
  }

  execute({
    expression,
    jobID
  }) {
    const newJob = this.schedulerProvider.update(expression, jobID);
    const newSiteJob = this.schedulerRepository.update(newJob);
    return newSiteJob;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = UpdateSchedulerService;
exports.default = _default;