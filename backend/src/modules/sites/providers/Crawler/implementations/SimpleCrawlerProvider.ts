import { injectable, inject } from 'tsyringe';
import SimpleCrawler from 'simplecrawler';
import Cheerio from 'cheerio';

import crawlerConfig from '@config/crawlerConfig';

import Site from '@modules/sites/infra/typeorm/schemas/Site';
import ICralwer from '../models/ICrawlerProvider';
import IPagesRepository from '@modules/pages/repositories/IPagesRepository';
import ISitesRepository from '@modules/sites/repositories/ISitesRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class SimpleCrawlerProvider implements ICralwer {
  constructor(
    @inject('PagesRepository')
    private pagesRepository: IPagesRepository,
    @inject('SitesRepository')
    private sitesRepository: ISitesRepository,
  ) {}

  public async extractTitleDescriptionKeywordsFromHtml(
    htmlContent: string,
    site: Site,
    url: string,
  ): Promise<void> {
    const $ = Cheerio.load(htmlContent);

    const htmlTitle = $('head title').text() || 'no-title';
    const htmlDescription =
      $("head meta[name='description']").attr('content')?.trim() ||
      'no-description';
    const htmlKeywords =
      $("head meta[name='keywords']").attr('content')?.split(',') || [];

    console.log(
      `Title: ${htmlTitle}, Description: ${htmlDescription}, Keywords: ${htmlKeywords}`,
    );

    await this.pagesRepository.create({
      title: htmlTitle,
      description: htmlDescription,
      keywords: htmlKeywords,
      siteID: site.id.toString(),
      url,
    });
  }

  public async startScan(siteName: string) {
    const site = await this.sitesRepository.findByName(siteName);

    if (!site) {
      throw new AppError('Site not found');
    }
    const { status } = site;

    if (status === 'crawling') {
      throw new AppError('Already crawling');
    }

    const parsedURL = new URL(site.url);
    const crawler = new SimpleCrawler(parsedURL.href);

    // Configs
    crawler.interval = crawlerConfig.interval;
    crawler.maxConcurrency = crawlerConfig.maxConcurrency;
    crawler.timeout = crawlerConfig.timeout;
    crawler.maxResourceSize = crawlerConfig.maxResourceSize;
    crawler.customHeaders = crawlerConfig.customHeaders;
    crawler.acceptCookies = crawlerConfig.acceptCookies;

    // Removing not permitted urls
    const allowedUrlPatterns = crawlerConfig.allowedUrlPatterns;

    crawler.addFetchCondition(parsedURL => {
      let foundPermitted = false;

      allowedUrlPatterns.map(allowedUrlPattern => {
        const pattern = new RegExp(allowedUrlPattern, 'i');
        if (pattern.test(parsedURL.uriPath)) {
          foundPermitted = true;
          return;
        }
      });

      return foundPermitted;
    });

    // Events
    crawler.on('crawlstart', async () => {
      console.log('FactoBrasil-Crawler: Crawl starting...');
      await this.sitesRepository.updateStatus(site.id.toString(), 'crawling');
    });

    crawler.on('fetchcomplete', (queueItem, responseBuffer, response) => {
      console.log(`FactoBrasil-Crawler: Processing: ${queueItem.url}`);

      const contentTypeSplitted = response.headers['content-type']?.split(';');

      if (!contentTypeSplitted?.includes('text/html')) {
        return;
      }
      const htmlContent = responseBuffer.toString('utf-8');
      return this.extractTitleDescriptionKeywordsFromHtml(
        htmlContent,
        site,
        queueItem.url,
      );
    });

    crawler.on('complete', async () => {
      console.log('FactoBrasil-Crawler: Crawl finished!');
      site.updated_at = new Date();
      await this.sitesRepository.save(site);
      await this.sitesRepository.updateStatus(site.id.toString(), 'ready');
    });

    crawler.on('fetcherror', async (queueItem, response) => {
      console.warn('FactoBrasil-Crawler: Error processing ' + queueItem.url);
    });

    crawler.on('fetch404', async (queueItem, response) => {
      console.warn(
        `FactoBrasil-Crawler: Error 404 processing: ${queueItem.url}, ${response.statusMessage}`,
      );
    });

    crawler.on('fetchclienterror', async (queueItem, errorData) => {
      console.warn('FactoBrasil-Crawler: Error processing ' + queueItem.url);
      await this.sitesRepository.updateStatus(site.id.toString(), 'ready');
    });

    crawler.start();
  }
}

export default SimpleCrawlerProvider;
