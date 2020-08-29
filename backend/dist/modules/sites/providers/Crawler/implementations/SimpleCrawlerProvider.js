"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _simplecrawler = _interopRequireDefault(require("simplecrawler"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var _crawlerConfig = _interopRequireDefault(require("../../../../../config/crawlerConfig"));

var _IPagesRepository = _interopRequireDefault(require("../../../../pages/repositories/IPagesRepository"));

var _ISitesRepository = _interopRequireDefault(require("../../../repositories/ISitesRepository"));

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let SimpleCrawlerProvider = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PagesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('SitesRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IPagesRepository.default === "undefined" ? Object : _IPagesRepository.default, typeof _ISitesRepository.default === "undefined" ? Object : _ISitesRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class SimpleCrawlerProvider {
  constructor(pagesRepository, sitesRepository) {
    this.pagesRepository = pagesRepository;
    this.sitesRepository = sitesRepository;
  }

  async extractTitleDescriptionKeywordsFromHtml(htmlContent, site, url) {
    var _$$attr, _$$attr2;

    const $ = _cheerio.default.load(htmlContent);

    const htmlTitle = $('head title').text() || 'no-title';
    const htmlDescription = ((_$$attr = $("head meta[name='description']").attr('content')) === null || _$$attr === void 0 ? void 0 : _$$attr.trim()) || 'no-description';
    const htmlKeywords = ((_$$attr2 = $("head meta[name='keywords']").attr('content')) === null || _$$attr2 === void 0 ? void 0 : _$$attr2.split(',')) || [];
    console.log(`Title: ${htmlTitle}, Description: ${htmlDescription}, Keywords: ${htmlKeywords}`);
    await this.pagesRepository.create({
      title: htmlTitle,
      description: htmlDescription,
      keywords: htmlKeywords,
      siteID: site.id.toString(),
      url
    });
  }

  async startScan(siteName) {
    const site = await this.sitesRepository.findByName(siteName);

    if (!site) {
      throw new _AppError.default('Site not found');
    }

    const {
      status
    } = site;

    if (status === 'crawling') {
      throw new _AppError.default('Already crawling');
    }

    const parsedURL = new URL(site.url);
    const crawler = new _simplecrawler.default(parsedURL.href); // Configs

    crawler.interval = _crawlerConfig.default.interval;
    crawler.maxConcurrency = _crawlerConfig.default.maxConcurrency;
    crawler.timeout = _crawlerConfig.default.timeout;
    crawler.maxResourceSize = _crawlerConfig.default.maxResourceSize;
    crawler.customHeaders = _crawlerConfig.default.customHeaders;
    crawler.acceptCookies = _crawlerConfig.default.acceptCookies; // Removing not permitted urls

    const allowedUrlPatterns = _crawlerConfig.default.allowedUrlPatterns;
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
    }); // Events

    crawler.on('crawlstart', async () => {
      console.log('FactoBrasil-Crawler: Crawl starting...');
      await this.sitesRepository.updateStatus(site.id.toString(), 'crawling');
    });
    crawler.on('fetchcomplete', (queueItem, responseBuffer, response) => {
      var _response$headers$con;

      console.log(`FactoBrasil-Crawler: Processing: ${queueItem.url}`);
      const contentTypeSplitted = (_response$headers$con = response.headers['content-type']) === null || _response$headers$con === void 0 ? void 0 : _response$headers$con.split(';');

      if (!(contentTypeSplitted === null || contentTypeSplitted === void 0 ? void 0 : contentTypeSplitted.includes('text/html'))) {
        return;
      }

      const htmlContent = responseBuffer.toString('utf-8');
      return this.extractTitleDescriptionKeywordsFromHtml(htmlContent, site, queueItem.url);
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
      console.warn(`FactoBrasil-Crawler: Error 404 processing: ${queueItem.url}, ${response.statusMessage}`);
    });
    crawler.on('fetchclienterror', async (queueItem, errorData) => {
      console.warn('FactoBrasil-Crawler: Error processing ' + queueItem.url);
      await this.sitesRepository.updateStatus(site.id.toString(), 'ready');
    });
    crawler.start();
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = SimpleCrawlerProvider;
exports.default = _default;