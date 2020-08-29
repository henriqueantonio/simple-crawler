import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCrawlerService from '@modules/sites/services/CreateCrawlerService';

class CrawlerController {
  public async create(request: Request, response: Response) {
    const { id } = request.params;
    const crawlPageService = container.resolve(CreateCrawlerService);

    await crawlPageService.execute(id);

    return response.json({ success: 'Crawler started.' });
  }
}

export default CrawlerController;
