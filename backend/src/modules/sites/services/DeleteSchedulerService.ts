import { injectable, inject } from 'tsyringe';

import ISchedulerProvider from '@shared/container/providers/Scheduler/models/ISchedulerProvider';
import ISchedulerRepository from '../repositories/ISchedulerRepository';
import ISitesRepository from '../repositories/ISitesRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class DeleteShedulerService {
  constructor(
    @inject('SchedulerProvider')
    private schedulerProvider: ISchedulerProvider,
    @inject('SchedulerRepository')
    private shcedulerRepository: ISchedulerRepository,
    @inject('SitesRepository')
    private sitesRepository: ISitesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const site = await this.sitesRepository.findById(id);

    if (!site) {
      throw new AppError('Site not found');
    }

    const existsInRepository = this.shcedulerRepository.getSiteByName(
      site.name,
    );

    if (!existsInRepository) {
      throw new AppError("This site don't have a job scheduled");
    }

    const { jobId } = this.shcedulerRepository.delete(site.name);
    this.schedulerProvider.delete(jobId);
  }
}

export default DeleteShedulerService;
