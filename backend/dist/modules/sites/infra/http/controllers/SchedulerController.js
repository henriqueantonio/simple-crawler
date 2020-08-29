"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateSchedulerService = _interopRequireDefault(require("../../../services/CreateSchedulerService"));

var _ListSchedulerService = _interopRequireDefault(require("../../../services/ListSchedulerService"));

var _ListOneSchedulerService = _interopRequireDefault(require("../../../services/ListOneSchedulerService"));

var _DeleteSchedulerService = _interopRequireDefault(require("../../../services/DeleteSchedulerService"));

var _UpdateSchedulerService = _interopRequireDefault(require("../../../services/UpdateSchedulerService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SchedulerController {
  show(request, response) {
    const {
      siteName
    } = request.params;

    const listOneSchedulerService = _tsyringe.container.resolve(_ListOneSchedulerService.default);

    const schedule = listOneSchedulerService.execute(siteName);
    return response.json(schedule);
  }

  index(_, response) {
    const listSchedulerService = _tsyringe.container.resolve(_ListSchedulerService.default);

    const jobs = listSchedulerService.execute();
    return response.json(jobs);
  }

  async create(request, response) {
    const {
      id
    } = request.params;
    const {
      expression
    } = request.body;

    const createSchedulerService = _tsyringe.container.resolve(_CreateSchedulerService.default);

    await createSchedulerService.execute({
      expression,
      id
    });
    return response.json({
      success: 'job created'
    });
  }

  async delete(request, response) {
    const {
      id
    } = request.body;

    const deleteSchedulerService = _tsyringe.container.resolve(_DeleteSchedulerService.default);

    await deleteSchedulerService.execute(id);
    return response.json({
      success: 'Job deleted'
    });
  }

  async update(request, response) {
    const {
      id
    } = request.params;
    const {
      expression
    } = request.body;

    const updateSchedulerService = _tsyringe.container.resolve(_UpdateSchedulerService.default);

    const job = updateSchedulerService.execute({
      jobID: id,
      expression
    });
    return response.json(job);
  }

}

var _default = SchedulerController;
exports.default = _default;