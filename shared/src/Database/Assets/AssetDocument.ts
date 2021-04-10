import { AssetType } from './AssetType';

export interface AssetDocument {
  externalId: string;
  type: AssetType;

  // Financials.
  price: number;
  title: string;
  financialsUpdatedAt: Date;

  // Logo.
  logoUrl?: string;
  logoUpdatedAt: Date;

  // Palette.
  paletteUrl?: string;
  paletteUpdatedAt?: Date;
}
