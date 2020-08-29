import IJobsDTO from '@shared/container/providers/Scheduler/dtos/IJobsDTO';
import ISiteJobsDTO from '../dtos/ISiteJobDTO';

export default interface ISchedulerRepository {
  create(siteName: string, job: IJobsDTO): IJobsDTO;
  delete(siteName: string): ISiteJobsDTO;
  update(newJob: IJobsDTO): { siteName: string; expression: string };
  getAll(): ISiteJobsDTO[];
  getSiteByName(siteName: string): ISiteJobsDTO | undefined;
}
