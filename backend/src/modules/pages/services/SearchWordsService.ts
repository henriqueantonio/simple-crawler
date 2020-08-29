import { injectable, inject } from 'tsyringe';

import ISiteRepository from '@modules/sites/repositories/ISitesRepository';
import AppError from '@shared/errors/AppError';
import IPagesRepository from '../repositories/IPagesRepository';
import Page from '../infra/typeorm/schemas/Pages';

@injectable()
class SearchWordsService {
  constructor(
    @inject('PagesRepository')
    private pagesRepository: IPagesRepository,
    @inject('SitesRepository')
    private sitesRepository: ISiteRepository,
  ) {}

  public async execute(id: string, search: string): Promise<Page[] | AppError> {
    const site = await this.sitesRepository.findById(id);

    if (!site) {
      throw new AppError('Site not found');
    }

    const sites = await this.pagesRepository.search(site.id.toString(), search);

    return sites;
  }
}

export default SearchWordsService;
