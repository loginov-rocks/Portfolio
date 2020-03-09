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
  positions: PositionsCollection;
  providerData: ProviderData[];
}

export interface UsersCollection {
  [key: string]: UserDocument;
}
