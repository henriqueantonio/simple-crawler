import { container } from 'tsyringe';

import ISchedulerProvider from '../providers/Scheduler/models/ISchedulerProvider';
import CronJobProvider from '../providers/Scheduler/implementations/CronJobProvider';

container.registerSingleton<ISchedulerProvider>(
  'SchedulerProvider',
  CronJobProvider,
);
