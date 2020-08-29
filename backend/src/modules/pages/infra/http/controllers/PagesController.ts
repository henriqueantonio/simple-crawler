import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SearchWordsService from '@modules/pages/services/SearchWordsService';
import ListDetailsService from '@modules/pages/services/ListDetailsService';

class PagesController {
  public async index(request: any, response: Response) {
    const { siteId, search } = request.query;

    const searchWordsService = container.resolve(SearchWordsService);

    const sites = await searchWordsService.execute(siteId, search);

    return response.json(sites);
  }

  public async details(request: Request, response: Response) {
    const { siteID } = request.params;

    const listDetailsService = container.resolve(ListDetailsService);

    const details = await listDetailsService.execute(siteID);

    return response.json(details);
  }
}

export default PagesController;
