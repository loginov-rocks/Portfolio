import { AssetType } from '@loginov-rocks/portfolio-shared';

export interface CreateAssetRequest {
  externalId?: string;
  type?: AssetType;
}
