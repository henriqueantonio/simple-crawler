import { container } from 'tsyringe';

import ICrawlerProvider from './Crawler/models/ICrawlerProvider';
import SimpleCrawlerProvider from './Crawler/implementations/SimpleCrawlerProvider';

container.registerSingleton<ICrawlerProvider>(
  'CrawlerProvider',
  SimpleCrawlerProvider,
);
