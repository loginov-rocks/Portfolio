import axios from 'axios';

import { Quote } from './Quote';

export class IexApi {
  protected baseUrl: string;

  protected token: string;

  public constructor(baseUrl: string, token: string) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  public getStockLogo(symbol: string): Promise<string> {
    return axios.get(`${this.baseUrl}/stock/${symbol.toLowerCase()}/logo?token=${this.token}`)
      .then(({ data }) => data.url);
  }

  public getStockQuote(symbol: string): Promise<Quote> {
    return axios.get(`${this.baseUrl}/stock/${symbol.toLowerCase()}/quote?token=${this.token}`)
      .then(({ data }) => data);
  }
}
