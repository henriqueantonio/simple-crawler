import { Router } from 'express';

import SiteRouter from '@modules/sites/infra/http/routes/site.routes';
import PageRouter from '@modules/pages/infra/http/routes/page.routes';

const routes = Router();

routes.use('/sites', SiteRouter);
routes.use('/pages', PageRouter);

export default routes;
