import { injectable, inject } from 'tsyringe';

import ISitesRepository from '@modules/sites/repositories/ISitesRepository';
import IUpdateSiteDTO from '@modules/sites/dtos/IUpdateSiteDTO';

import Site from '../infra/typeorm/schemas/Site';

import AppError from '@shared/errors/AppError';

@injectable()
class DeleteSiteService {
  constructor(
    @inject('SitesRepository')
    private sitesRepository: ISitesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const site = await this.sitesRepository.findById(id);

    if (!site) {
      throw new AppError('Site ID not found');
    }

    await this.sitesRepository.delete(site);
  }
}

export default DeleteSiteService;
