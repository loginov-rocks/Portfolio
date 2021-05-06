import axios from 'axios';

import { Quote } from './Interfaces/Quote';

interface IexApiOptions {
  baseUrl: string;
  token: string;
}

export class IexApi {
  private readonly baseUrl: string;

  private readonly token: string;

  constructor({ baseUrl, token }: IexApiOptions) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  getStockLogo(symbol: string): Promise<string> {
    return axios.get(`${this.baseUrl}/stock/${symbol.toLowerCase()}/logo?token=${this.token}`)
      .then(({ data }) => data.url);
  }

  getStockQuote(symbol: string): Promise<Quote> {
    return axios.get(`${this.baseUrl}/stock/${symbol.toLowerCase()}/quote?token=${this.token}`)
      .then(({ data }) => data);
  }
}
