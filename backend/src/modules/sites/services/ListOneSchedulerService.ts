import { injectable, inject } from 'tsyringe';

import ISchedulerRepository from '../repositories/ISchedulerRepository';
import ISiteJobsDTO from '../dtos/ISiteJobDTO';

@injectable()
class ListSchedulerService {
  constructor(
    @inject('SchedulerRepository')
    private shcedulerRepository: ISchedulerRepository,
  ) {}

  public execute(siteName: string): ISiteJobsDTO | undefined {
    const jobReferences = this.shcedulerRepository.getSiteByName(siteName);

    return jobReferences;
  }
}

export default ListSchedulerService;
