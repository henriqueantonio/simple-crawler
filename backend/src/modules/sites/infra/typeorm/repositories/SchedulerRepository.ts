import ISchedulerRepository from '@modules/sites/repositories/ISchedulerRepository';
import ISiteJobsDTO from '@modules/sites/dtos/ISiteJobDTO';
import IJobsDTO from '@shared/container/providers/Scheduler/dtos/IJobsDTO';
import AppError from '@shared/errors/AppError';

const siteJobsArray: ISiteJobsDTO[] = [];

export default class SchedulerRepository implements ISchedulerRepository {
  create(siteName: string, job: IJobsDTO): IJobsDTO {
    const { id, expression } = job;

    const checkNameExists = siteJobsArray.find(
      siteJob => siteJob.siteName === siteName,
    );

    if (checkNameExists) {
      throw new AppError(
        "Can't create more than one CronJob for the same site",
      );
    }

    siteJobsArray.push({ siteName, jobId: id, expression });

    return job;
  }

  delete(siteName: string): ISiteJobsDTO {
    const siteIndex = siteJobsArray.findIndex(
      siteJob => siteJob.siteName === siteName,
    );

    if (siteIndex === -1) {
      throw new AppError('Site not found');
    }

    const history = siteJobsArray[siteIndex];

    siteJobsArray.splice(siteIndex, 1);

    return history;
  }

  update(newJob: IJobsDTO): { siteName: string; expression: string } {
    const jobIndex = siteJobsArray.findIndex(job => job.jobId === newJob.id);

    if (jobIndex === -1) {
      throw new AppError('Job not found');
    }

    const oldJob = siteJobsArray[jobIndex];
    const { siteName } = oldJob;

    siteJobsArray[jobIndex] = { ...oldJob, expression: newJob.expression };

    return { siteName, expression: newJob.expression };
  }

  public getAll(): ISiteJobsDTO[] {
    return siteJobsArray;
  }

  public getSiteByName(siteName: string): ISiteJobsDTO | undefined {
    const site = siteJobsArray.find(siteJob => siteJob.siteName === siteName);
    return site;
  }
}
