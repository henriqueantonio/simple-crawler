import Page from '../infra/typeorm/schemas/Pages';

import ICreatePageDTO from '../dtos/ICreatePageDTO';
import IDetailtsDTO from '../dtos/IDetailtsDTO';

export default interface IPagesRepository {
  create(data: ICreatePageDTO): Promise<Page>;
  search(siteId: string, search: string): Promise<Page[]>;
  getDetails(siteID: string): Promise<IDetailtsDTO>;
}
