import { PortfolioDocument } from './PortfolioDocument';

export interface PortfoliosCollection {
  [portfolioId: string]: PortfolioDocument;
}
