import { injectable, inject } from 'tsyringe';

import ISchedulerRepository from '../repositories/ISchedulerRepository';
import ISiteJobsDTO from '../dtos/ISiteJobDTO';

@injectable()
class ListSchedulerService {
  constructor(
    @inject('SchedulerRepository')
    private shcedulerRepository: ISchedulerRepository,
  ) {}

  public execute(): ISiteJobsDTO[] {
    const jobReferences = this.shcedulerRepository.getAll();

    return jobReferences;
  }
}

export default ListSchedulerService;
