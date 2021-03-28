import { PortfoliosCollection } from './Portfolios';

export interface UserPortfoliosDocument {
  portfolios: PortfoliosCollection;
}

export interface UsersPortfoliosCollection {
  [userId: string]: UserPortfoliosDocument;
}
