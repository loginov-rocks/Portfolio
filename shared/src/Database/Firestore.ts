import { AssetsCollection } from './Assets/AssetsCollection';
import { UsersCollection } from './Users/UsersCollection';
import { UsersPortfoliosCollection } from './UsersPortfolios/UsersPortfoliosCollection';

export interface Firestore {
  assets: AssetsCollection;
  users: UsersCollection;
  usersPortfolios: UsersPortfoliosCollection;
}
