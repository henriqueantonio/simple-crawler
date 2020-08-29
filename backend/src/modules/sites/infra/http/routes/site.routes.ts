import { Router } from 'express';

import SiteController from '../controllers/SiteController';
import SchedulerController from '../controllers/SchedulerController';
import CrawlerController from '../controllers/CrawlerController';

const siteRouter = Router();

const siteController = new SiteController();
const schedulerController = new SchedulerController();
const crawlerController = new CrawlerController();

siteRouter.get('/scheduler', schedulerController.index);
siteRouter.get('/:siteName/scheduler', schedulerController.show);

siteRouter.post('/:id/crawler', crawlerController.create);
siteRouter.post('/:id/scheduler', schedulerController.create);
siteRouter.put('/:id/scheduler', schedulerController.update);
siteRouter.delete('/:id/scheduler', schedulerController.delete);

siteRouter.get('/:id', siteController.show);
siteRouter.get('/', siteController.index);
siteRouter.post('/', siteController.create);
siteRouter.put('/:id', siteController.update);
siteRouter.delete('/:id', siteController.delete);

export default siteRouter;
