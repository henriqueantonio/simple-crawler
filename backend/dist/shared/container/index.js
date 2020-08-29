"use strict";

var _tsyringe = require("tsyringe");

require("../../modules/sites/providers");

require("./providers");

var _SitesRepository = _interopRequireDefault(require("../../modules/sites/infra/typeorm/repositories/SitesRepository"));

var _SchedulerRepository = _interopRequireDefault(require("../../modules/sites/infra/typeorm/repositories/SchedulerRepository"));

var _PagesRepository = _interopRequireDefault(require("../../modules/pages/infra/typeorm/repositories/PagesRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('SitesRepository', _SitesRepository.default);

_tsyringe.container.registerSingleton('PagesRepository', _PagesRepository.default);

_tsyringe.container.registerSingleton('SchedulerRepository', _SchedulerRepository.default);