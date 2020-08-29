"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const siteJobsArray = [];

class SchedulerRepository {
  create(siteName, job) {
    const {
      id,
      expression
    } = job;
    const checkNameExists = siteJobsArray.find(siteJob => siteJob.siteName === siteName);

    if (checkNameExists) {
      throw new _AppError.default("Can't create more than one CronJob for the same site");
    }

    siteJobsArray.push({
      siteName,
      jobId: id,
      expression
    });
    return job;
  }

  delete(siteName) {
    const siteIndex = siteJobsArray.findIndex(siteJob => siteJob.siteName === siteName);

    if (siteIndex === -1) {
      throw new _AppError.default('Site not found');
    }

    const history = siteJobsArray[siteIndex];
    siteJobsArray.splice(siteIndex, 1);
    return history;
  }

  update(newJob) {
    const jobIndex = siteJobsArray.findIndex(job => job.jobId === newJob.id);

    if (jobIndex === -1) {
      throw new _AppError.default('Job not found');
    }

    const oldJob = siteJobsArray[jobIndex];
    const {
      siteName
    } = oldJob;
    siteJobsArray[jobIndex] = { ...oldJob,
      expression: newJob.expression
    };
    return {
      siteName,
      expression: newJob.expression
    };
  }

  getAll() {
    return siteJobsArray;
  }

  getSiteByName(siteName) {
    const site = siteJobsArray.find(siteJob => siteJob.siteName === siteName);
    return site;
  }

}

exports.default = SchedulerRepository;