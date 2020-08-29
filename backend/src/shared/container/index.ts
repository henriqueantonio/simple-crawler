import { container } from 'tsyringe';

import '@modules/sites/providers';
import '@shared/container/providers';

import ISiteRepository from '@modules/sites/repositories/ISitesRepository';
import SiteRepository from '@modules/sites/infra/typeorm/repositories/SitesRepository';

import ISchedulerRepository from '@modules/sites/repositories/ISchedulerRepository';
import SchedulerRepository from '@modules/sites/infra/typeorm/repositories/SchedulerRepository';

import IPageRepository from '@modules/pages/repositories/IPagesRepository';
import PageRepository from '@modules/pages/infra/typeorm/repositories/PagesRepository';

container.registerSingleton<ISiteRepository>('SitesRepository', SiteRepository);

container.registerSingleton<IPageRepository>('PagesRepository', PageRepository);

container.registerSingleton<ISchedulerRepository>(
  'SchedulerRepository',
  SchedulerRepository,
);
