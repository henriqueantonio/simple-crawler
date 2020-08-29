import { injectable, inject } from 'tsyringe';

import ISitesRepository from '@modules/sites/repositories/ISitesRepository';
import ICreateSiteDTO from '@modules/sites/dtos/ICreateSiteDTO';
import Site from '../infra/typeorm/schemas/Site';

import AppError from '@shared/errors/AppError';

@injectable()
class CreateSiteService {
  constructor(
    @inject('SitesRepository')
    private sitesRepository: ISitesRepository,
  ) {}

  public async execute(data: ICreateSiteDTO): Promise<Site> {
    const { name } = data;

    const checkNameExists = await this.sitesRepository.findByName(name);

    if (checkNameExists) {
      throw new AppError('Name already registered');
    }

    const site = await this.sitesRepository.create(data);
    return site;
  }
}

export default CreateSiteService;
