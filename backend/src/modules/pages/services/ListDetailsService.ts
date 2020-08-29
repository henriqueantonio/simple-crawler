import { injectable, inject } from 'tsyringe';

import ISiteRepository from '@modules/sites/repositories/ISitesRepository';
import AppError from '@shared/errors/AppError';
import IPagesRepository from '../repositories/IPagesRepository';
import IDetailtsDTO from '../dtos/IDetailtsDTO';

@injectable()
class ListDetailsService {
  constructor(
    @inject('PagesRepository')
    private pagesRepository: IPagesRepository,
    @inject('SitesRepository')
    private sitesRepository: ISiteRepository,
  ) {}

  public async execute(id: string): Promise<IDetailtsDTO | AppError> {
    const site = await this.sitesRepository.findById(id);

    if (!site) {
      throw new AppError('Site not found');
    }

    const sites = await this.pagesRepository.getDetails(site.id.toString());

    return sites;
  }
}

export default ListDetailsService;
