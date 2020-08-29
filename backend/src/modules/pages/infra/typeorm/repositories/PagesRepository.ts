import { getMongoRepository, MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import Page from '@modules/pages/infra/typeorm/schemas/Pages';

import IPagesRepository from '@modules/pages/repositories/IPagesRepository';
import ICreatePageDTO from '@modules/pages/dtos/ICreatePageDTO';
import IDetailtsDTO from '@modules/pages/dtos/IDetailtsDTO';

export default class PagesRepository implements IPagesRepository {
  private ormRepository: MongoRepository<Page>;

  constructor() {
    this.ormRepository = getMongoRepository(Page);
  }

  public async getDetails(siteID: string): Promise<IDetailtsDTO> {
    const query = await this.ormRepository.findAndCount({
      where: { siteID },
    });

    const pages = query[1];

    let descriptions = 0;
    query[0].map(page => page.description && descriptions++);

    let keywords = 0;
    query[0].map(page => page.keywords && page.keywords.map(() => keywords++));

    return { pages, descriptions, keywords };
  }

  public async create(data: ICreatePageDTO): Promise<Page> {
    const page = this.ormRepository.create(data);

    await this.ormRepository.save(page);

    return page;
  }

  public async search(siteID: string, search: string): Promise<Page[]> {
    const pages = await this.ormRepository.find({
      where: {
        $and: [
          {
            $or: [
              { title: { $regex: search, $options: 'i' } },
              { description: { $regex: search, $options: 'i' } },
              { url: { $regex: search, $options: 'i' } },
              { keywords: { $regex: search, $options: 'i' } },
            ],
          },
          { siteID },
        ],
      },
    });

    return pages;
  }
}
