import { Router } from 'express';

import PagesController from '../controllers/PagesController';

const pagesRouter = Router();

const pagesController = new PagesController();

pagesRouter.get('/', pagesController.index);
pagesRouter.get('/details/:siteID', pagesController.details);

export default pagesRouter;
