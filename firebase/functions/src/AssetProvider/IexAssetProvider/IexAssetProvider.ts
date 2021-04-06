import fetch from 'node-fetch';

import { AssetFinancials } from '../AssetFinancials';
import { AssetProvider } from '../AssetProvider';

import { IexLogo } from './IexLogo';
import { IexQuote } from './IexQuote';

interface Options {
  baseUrl: string;
  secretToken: string;
}

export class IexAssetProvider implements AssetProvider {
  protected readonly baseUrl: string;

  protected readonly secretToken: string;

  constructor({ baseUrl, secretToken }: Options) {
    this.baseUrl = baseUrl;
    this.secretToken = secretToken;
  }

  getAssetFinancials(id: string): Promise<AssetFinancials> {
    return fetch(`${this.baseUrl}/stock/${id.toLowerCase()}/quote?token=${this.secretToken}`)
      .then((response) => response.json())
      .then((data: IexQuote) => ({
        price: data.latestPrice,
        title: data.companyName,
      }));
  }

  getAssetLogo(id: string): Promise<string> {
    return fetch(`${this.baseUrl}/stock/${id.toLowerCase()}/logo?token=${this.secretToken}`)
      .then((response) => response.json())
      .then((data: IexLogo) => data.url);
  }
}
