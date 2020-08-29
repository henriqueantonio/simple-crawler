"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodeCron = _interopRequireDefault(require("node-cron"));

var _uuid = require("uuid");

var _jobConfig = _interopRequireDefault(require("../../../../../config/jobConfig"));

var _AppError = _interopRequireDefault(require("../../../../errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const jobsArray = [];

class CronJobProvider {
  create(expression, functionToBeExecuted) {
    if (jobsArray.length >= _jobConfig.default.maxJobsPermitted) {
      throw new _AppError.default("Can't create more jobs");
    }

    try {
      const job = _nodeCron.default.schedule(expression, () => functionToBeExecuted());

      job.start();
      const newJob = {
        id: (0, _uuid.v4)(),
        job,
        expression
      };
      jobsArray.push(newJob);
      return newJob;
    } catch (err) {
      throw new _AppError.default('Expression invalid');
    }
  }

  delete(id) {
    const jobIndex = jobsArray.findIndex(job => job.id === id);

    if (jobIndex === -1) {
      throw new _AppError.default('Job not finded');
    }

    jobsArray[jobIndex].job.destroy();
    jobsArray.splice(jobIndex, 1);
  }

  update(expression, jobID) {
    const jobIndex = jobsArray.findIndex(job => job.id === jobID);

    if (jobIndex === -1) {
      throw new _AppError.default('Job not found');
    }

    const job = jobsArray[jobIndex];
    const newJob = { ...job,
      expression
    };
    jobsArray[jobIndex] = newJob;
    return newJob;
  }

  getJob(id) {
    const job = jobsArray.find(job => job.id === id);

    if (!job) {
      throw new _AppError.default('Job not finded');
    }

    return job;
  }

}

var _default = CronJobProvider;
exports.default = _default;