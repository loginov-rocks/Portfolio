import { AssetType } from 'AssetProvider/AssetType';

export interface CreateAssetRequest {
  externalId?: string;
  type?: AssetType;
}
