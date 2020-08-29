import { injectable, inject } from 'tsyringe';

import ISitesRepository from '@modules/sites/repositories/ISitesRepository';
import IUpdateSiteDTO from '@modules/sites/dtos/IUpdateSiteDTO';

import Site from '../infra/typeorm/schemas/Site';

import AppError from '@shared/errors/AppError';

@injectable()
class CreateSiteService {
  constructor(
    @inject('SitesRepository')
    private sitesRepository: ISitesRepository,
  ) {}

  public async execute({ id, name, url }: IUpdateSiteDTO): Promise<Site> {
    const site = await this.sitesRepository.findById(id);

    if (!site) {
      throw new AppError('Site ID not found');
    }

    if (name) {
      const nameAlreadyExists = await this.sitesRepository.findByName(name);

      if (nameAlreadyExists) {
        throw new AppError('Name already in use');
      }

      site.name = name;
    }

    if (url) {
      site.url = url;
    }

    await this.sitesRepository.save(site);
    return site;
  }
}

export default CreateSiteService;
