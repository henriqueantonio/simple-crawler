import { injectable, inject } from 'tsyringe';

import ISitesRepository from '@modules/sites/repositories/ISitesRepository';
import Site from '../infra/typeorm/schemas/Site';

@injectable()
class ListSitesService {
  constructor(
    @inject('SitesRepository')
    private sitesRepository: ISitesRepository,
  ) {}

  public async execute(id: string): Promise<Site | undefined> {
    const site = await this.sitesRepository.findById(id);
    return site;
  }
}

export default ListSitesService;
