import axios from 'axios';

// TODO: Tests.

export interface Quote {
  change: number;
  changePercent: number;
  iexRealtimePrice?: number;
  latestPrice: number;
  symbol: string;
}

export default class IEX {
  protected baseUrl: string;

  protected token: string;

  public constructor(baseUrl: string, token: string) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  public getStockLogo(symbol: string): Promise<string> {
    return axios.get(`${this.baseUrl}/stock/${symbol}/logo?token=${this.token}`)
      .then(({ data }) => data.url);
  }

  public getStockQuote(symbol: string): Promise<Quote> {
    return axios.get(`${this.baseUrl}/stock/${symbol}/quote?token=${this.token}`)
      .then(({ data }) => data);
  }
}
