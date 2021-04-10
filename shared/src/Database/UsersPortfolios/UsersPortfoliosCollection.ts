import { UserPortfoliosDocument } from './UserPortfoliosDocument';

export interface UsersPortfoliosCollection {
  [userId: string]: UserPortfoliosDocument;
}
