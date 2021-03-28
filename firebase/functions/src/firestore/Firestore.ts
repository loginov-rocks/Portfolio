import { StocksCollection } from './Stocks';
import { UsersCollection } from './Users';
import { UsersPortfoliosCollection } from './UsersPortfolios';

export interface Firestore {
  stocks: StocksCollection;
  users: UsersCollection;
  usersPortfolios: UsersPortfoliosCollection;
}
