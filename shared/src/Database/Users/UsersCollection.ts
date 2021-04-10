import { UserDocument } from './UserDocument';

export interface UsersCollection {
  [userId: string]: UserDocument;
}
