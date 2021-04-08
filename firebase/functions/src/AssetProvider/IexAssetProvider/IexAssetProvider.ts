import fetch from 'node-fetch';

import { AssetFinancials } from '../AssetFinancials';
import { AssetNotFound } from '../AssetNotFound';
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

  async getAssetFinancials(id: string): Promise<AssetFinancials> {
    const response = await fetch(`${this.baseUrl}/stock/${id.toLowerCase()}/quote?token=${this.secretToken}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new AssetNotFound();
      }

      throw new Error(response.statusText);
    }

    const data: IexQuote = await response.json();

    return {
      price: data.latestPrice,
      title: data.companyName,
    };
  }

  async getAssetLogo(id: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/stock/${id.toLowerCase()}/logo?token=${this.secretToken}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new AssetNotFound();
      }

      throw new Error(response.statusText);
    }

    const data: IexLogo = await response.json();

    return data.url;
  }
}
