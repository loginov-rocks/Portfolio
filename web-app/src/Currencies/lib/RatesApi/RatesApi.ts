import axios from 'axios';

import Rates from './Rates';

export default class RatesApi {
  protected baseUrl: string;

  protected baseCurrency: string;

  public constructor(baseUrl: string, baseCurrency: string) {
    this.baseUrl = baseUrl;
    this.baseCurrency = baseCurrency;
  }

  public getLatest(): Promise<Rates> {
    return axios.get(`${this.baseUrl}/latest?base=${this.baseCurrency}`)
      .then(({ data }) => data);
  }
}
