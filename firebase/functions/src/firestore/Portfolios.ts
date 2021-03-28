import { PositionsCollection } from './Positions';

export interface PortfolioDocument {
  openPositions: PositionsCollection;
  closedPositions: PositionsCollection;

  title: string;
  public: boolean;
}

export interface PortfoliosCollection {
  [portfolioId: string]: PortfolioDocument;
}
