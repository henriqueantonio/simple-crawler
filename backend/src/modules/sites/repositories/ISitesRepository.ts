import Site from '../infra/typeorm/schemas/Site';

import ICreateSiteDTO from '../dtos/ICreateSiteDTO';

export default interface ISitesRepository {
  create(data: ICreateSiteDTO): Promise<Site>;
  delete(site: Site): Promise<void>;
  save(site: Site): Promise<Site>;
  findByName(name: string): Promise<Site | undefined>;
  findById(id: string): Promise<Site | undefined>;
  findAll(): Promise<Site[]>;
  updateStatus(id: string, status: 'ready' | 'crawling'): Promise<void>;
}
