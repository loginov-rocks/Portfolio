interface ProviderData {
  email: string;
  phoneNumber: null;
  photoURL: string;
  providerId: string;
  uid: string;
}

export interface UserDocument {
  avatarUrl: string;
  displayName: string;
  email: string;
  providerData: ProviderData[];
}
