import { AssetDocument } from './AssetDocument';

export interface AssetsCollection {
  [assetId: string]: AssetDocument;
}
