import { injectable, inject } from 'tsyringe';

import ICrawlerProvider from '../providers/Crawler/models/ICrawlerProvider';
import ISiteRepository from '@modules/sites/repositories/ISitesRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateCrawlerService {
  constructor(
    @inject('CrawlerProvider')
    private crawlerProvider: ICrawlerProvider,
    @inject('SitesRepository')
    private sitesRepository: ISiteRepository,
  ) {}

  public async execute(id: string): Promise<void | AppError> {
    const site = await this.sitesRepository.findById(id);

    if (!site) {
      throw new AppError('Site not found');
    }

    const { name } = site;

    return this.crawlerProvider.startScan(name);
  }
}

export default CreateCrawlerService;
