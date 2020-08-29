import { injectable, inject } from 'tsyringe';

import ISchedulerProvider from '@shared/container/providers/Scheduler/models/ISchedulerProvider';

import AppError from '@shared/errors/AppError';
import ISchedulerRepository from '../repositories/ISchedulerRepository';
import IJobsDTO from '@shared/container/providers/Scheduler/dtos/IJobsDTO';

interface IRequest {
  expression: string;
  jobID: string;
}

@injectable()
class UpdateSchedulerService {
  constructor(
    @inject('SchedulerProvider')
    private schedulerProvider: ISchedulerProvider,
    @inject('SchedulerRepository')
    private schedulerRepository: ISchedulerRepository,
  ) {}

  public execute({
    expression,
    jobID,
  }: IRequest): { siteName: string; expression: string } {
    const newJob = this.schedulerProvider.update(expression, jobID);
    const newSiteJob = this.schedulerRepository.update(newJob);

    return newSiteJob;
  }
}

export default UpdateSchedulerService;
