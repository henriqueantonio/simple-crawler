import { injectable, inject } from 'tsyringe';

import ISiteRepository from '@modules/sites/repositories/ISitesRepository';
import ISchedulerProvider from '@shared/container/providers/Scheduler/models/ISchedulerProvider';
import ICrawlerProvider from '@modules/sites/providers/Crawler/models/ICrawlerProvider';

import AppError from '@shared/errors/AppError';
import ISchedulerRepository from '../repositories/ISchedulerRepository';
import IJobsDTO from '@shared/container/providers/Scheduler/dtos/IJobsDTO';

interface IRequest {
  expression: string;
  id: string;
}

@injectable()
class CreateCrawlerService {
  constructor(
    @inject('SitesRepository')
    private sitesRepository: ISiteRepository,
    @inject('SchedulerProvider')
    private schedulerProvider: ISchedulerProvider,
    @inject('CrawlerProvider')
    private crawlerProvider: ICrawlerProvider,
    @inject('SchedulerRepository')
    private schedulerRepository: ISchedulerRepository,
  ) {}

  public async execute({ expression, id }: IRequest): Promise<IJobsDTO> {
    const site = await this.sitesRepository.findById(id);

    if (!site) {
      throw new AppError('Site not found');
    }

    const { name, url } = site;

    const job = this.schedulerProvider.create(expression, () => {
      this.crawlerProvider.startScan(name);
      console.log(`Job started: ${name} - ${url}`);
    });

    this.schedulerRepository.create(site.name, job);

    return job;
  }
}

export default CreateCrawlerService;
