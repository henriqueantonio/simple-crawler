import Cron from 'node-cron';
import { v4 as uuidv4 } from 'uuid';

import jobConfig from '@config/jobConfig';

import ISchedulerProvider from '@shared/container/providers/Scheduler/models/ISchedulerProvider';
import AppError from '@shared/errors/AppError';
import IJobsDTO from '../dtos/IJobsDTO';

const jobsArray: IJobsDTO[] = [];

class CronJobProvider implements ISchedulerProvider {
  public create(expression: string, functionToBeExecuted: () => any): IJobsDTO {
    if (jobsArray.length >= jobConfig.maxJobsPermitted) {
      throw new AppError("Can't create more jobs");
    }

    try {
      const job = Cron.schedule(expression, () => functionToBeExecuted());

      job.start();

      const newJob = { id: uuidv4(), job, expression };

      jobsArray.push(newJob);

      return newJob;
    } catch (err) {
      throw new AppError('Expression invalid');
    }
  }

  public delete(id: string): void {
    const jobIndex = jobsArray.findIndex(job => job.id === id);

    if (jobIndex === -1) {
      throw new AppError('Job not finded');
    }

    jobsArray[jobIndex].job.destroy();

    jobsArray.splice(jobIndex, 1);
  }

  public update(expression: string, jobID: string): IJobsDTO {
    const jobIndex = jobsArray.findIndex(job => job.id === jobID);

    if (jobIndex === -1) {
      throw new AppError('Job not found');
    }

    const job = jobsArray[jobIndex];

    const newJob = { ...job, expression };

    jobsArray[jobIndex] = newJob;

    return newJob;
  }

  public getJob(id: string): IJobsDTO {
    const job = jobsArray.find(job => job.id === id);

    if (!job) {
      throw new AppError('Job not finded');
    }

    return job;
  }
}

export default CronJobProvider;
