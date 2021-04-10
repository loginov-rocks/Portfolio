import { ClosedPositionsCollection } from './ClosedPositions/ClosedPositionsCollection';
import { OpenPositionsCollection } from './OpenPositions/OpenPositionsCollection';

export interface PortfolioDocument {
  openPositions: OpenPositionsCollection;
  closedPositions: ClosedPositionsCollection;

  title: string;
}
