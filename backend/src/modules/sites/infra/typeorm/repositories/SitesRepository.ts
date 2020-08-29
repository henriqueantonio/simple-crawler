import { getMongoRepository, MongoRepository, ObjectID } from 'typeorm';

import Site from '@modules/sites/infra/typeorm/schemas/Site';

import ISiteRepository from '@modules/sites/repositories/ISitesRepository';
import ICreateSiteDTO from '@modules/sites/dtos/ICreateSiteDTO';
import siteRouter from '../../http/routes/site.routes';
import AppError from '@shared/errors/AppError';

export default class SitesRepository implements ISiteRepository {
  private ormRepository: MongoRepository<Site>;

  constructor() {
    this.ormRepository = getMongoRepository(Site, 'default');
  }

  public async create(data: ICreateSiteDTO): Promise<Site> {
    const site = this.ormRepository.create(data);
    await this.ormRepository.save(site);
    return site;
  }

  public async save(site: Site): Promise<Site> {
    return this.ormRepository.save(site);
  }

  public async delete(site: Site): Promise<void> {
    await this.ormRepository.deleteOne({
      _id: site.id,
    });
  }

  public async findByName(name: string): Promise<Site | undefined> {
    const siteFinded = await this.ormRepository.findOne({ where: { name } });
    return siteFinded;
  }

  public async findById(id: string): Promise<Site | undefined> {
    const siteFinded = await this.ormRepository.findOne(id);
    return siteFinded;
  }

  public async findAll(): Promise<Site[]> {
    const sites = await this.ormRepository.find();

    return sites;
  }

  public async updateStatus(
    id: string,
    status: 'ready' | 'crawling',
  ): Promise<void> {
    const site = await this.ormRepository.findOne(id);

    if (!site) {
      throw new AppError('Site not found');
    }

    site.status = status;

    await this.save(site);
  }
}
