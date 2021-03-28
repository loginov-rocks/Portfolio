import { PositionsCollection } from './Positions';

interface ProviderData {
  email: string;
  phoneNumber: string | null;
  photoURL: string;
  providerId: string;
  uid: string;
}

export interface UserDocument {
  avatarUrl: string;
  displayName: string;
  email: string;
  // TODO: Remove positions in favor of usersPortfolios collection.
  positions: PositionsCollection;
  providerData: ProviderData[];
}

export interface UsersCollection {
  [userId: string]: UserDocument;
}
