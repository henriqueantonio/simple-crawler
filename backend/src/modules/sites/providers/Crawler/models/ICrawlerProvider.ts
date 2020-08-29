import Site from '@modules/sites/infra/typeorm/schemas/Site';

export default interface ICrawler {
  startScan(url: string): void;
  extractTitleDescriptionKeywordsFromHtml(
    htmlContent: string,
    site: Site,
    url: string,
  ): Promise<void>;
}
