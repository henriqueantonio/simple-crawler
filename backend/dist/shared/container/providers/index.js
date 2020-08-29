"use strict";

var _tsyringe = require("tsyringe");

var _CronJobProvider = _interopRequireDefault(require("../providers/Scheduler/implementations/CronJobProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('SchedulerProvider', _CronJobProvider.default);