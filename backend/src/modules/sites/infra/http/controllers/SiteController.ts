import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSiteService from '@modules/sites/services/CreateSiteService';
import UpdateSiteService from '@modules/sites/services/UpdateSiteService';
import DeleteSiteService from '@modules/sites/services/DeleteSiteService';
import ListSitesService from '@modules/sites/services/ListSitesService';
import ListSiteService from '@modules/sites/services/ListSiteService';

class CrawlerController {
  public async show(request: Request, response: Response) {
    const { id } = request.params;

    const listSiteService = container.resolve(ListSiteService);

    const site = await listSiteService.execute(id);

    return response.json(site);
  }

  public async index(_: Request, response: Response) {
    const listSitesService = container.resolve(ListSitesService);

    const sites = await listSitesService.execute();

    return response.json(sites);
  }

  public async create(request: Request, response: Response) {
    const { name, url } = request.body;

    const createSiteService = container.resolve(CreateSiteService);

    const site = await createSiteService.execute({ name, url });

    return response.json({ site });
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, url } = request.body;

    const updateSiteService = container.resolve(UpdateSiteService);

    const site = await updateSiteService.execute({ id, name, url });

    return response.json(site);
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    const deleteSiteService = container.resolve(DeleteSiteService);

    await deleteSiteService.execute(id);

    return response.json({ success: 'Site deleted' });
  }
}

export default CrawlerController;
