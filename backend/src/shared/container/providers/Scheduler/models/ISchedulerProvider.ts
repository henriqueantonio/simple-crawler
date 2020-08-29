import IJobsDTO from '../dtos/IJobsDTO';

export default interface ISchedulerProvider {
  create(expression: string, functionToBeExecuted: () => any): IJobsDTO;
  delete(id: string): void;
  update(expression: string, jobID: string): IJobsDTO;
  getJob(id: string): IJobsDTO;
}
