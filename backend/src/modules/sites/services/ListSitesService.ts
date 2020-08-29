import { injectable, inject } from 'tsyringe';

import ISitesRepository from '@modules/sites/repositories/ISitesRepository';
import Site from '../infra/typeorm/schemas/Site';

@injectable()
class ListSitesService {
  constructor(
    @inject('SitesRepository')
    private sitesRepository: ISitesRepository,
  ) {}

  public async execute(): Promise<Site[]> {
    const sites = await this.sitesRepository.findAll();

    return sites;
  }
}

export default ListSitesService;
