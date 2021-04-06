import { AssetFinancials } from './AssetFinancials';

export interface AssetProvider {
  getAssetFinancials(id: string): Promise<AssetFinancials>;

  getAssetLogo(id: string): Promise<string>;
}
