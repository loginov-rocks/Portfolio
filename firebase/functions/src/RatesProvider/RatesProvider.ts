import fetch from 'node-fetch';

import { Rates } from './Rates';

interface Options {
  baseCurrency: string;
  baseUrl: string;
}

export class RatesProvider {
  private readonly baseCurrency: string;

  private readonly baseUrl: string;

  constructor({ baseCurrency, baseUrl }: Options) {
    this.baseCurrency = baseCurrency;
    this.baseUrl = baseUrl;
  }

  async getRates(): Promise<Rates> {
    const response = await fetch(`${this.baseUrl}/latest?base=${this.baseCurrency}`);
    const rates: Rates = await response.json();

    return rates;
  }
}
