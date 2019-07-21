import axios from 'axios';

import Rates from './Rates';

export default class RatesApi {
  public baseUrl: string;

  public constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public getLatest(): Promise<Rates> {
    return axios.get(`${this.baseUrl}/latest?base=USD`)
      .then(({ data }) => data);
  }
}
