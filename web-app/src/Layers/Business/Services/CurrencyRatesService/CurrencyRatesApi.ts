import axios from 'axios';

import { AvailableCurrency } from './Interfaces/AvailableCurrency';
import { CurrencyRatesData } from './Interfaces/CurrencyRatesData';

interface CurrencyRatesApiOptions {
  availableCurrencies: AvailableCurrency[];
  baseCurrency: string;
  baseUrl: string;
}

export class CurrencyRatesApi {
  private readonly availableCurrencies: AvailableCurrency[];

  private readonly baseCurrency: string;

  private readonly baseUrl: string;

  constructor({ availableCurrencies, baseCurrency, baseUrl }: CurrencyRatesApiOptions) {
    this.availableCurrencies = availableCurrencies;
    this.baseCurrency = baseCurrency;
    this.baseUrl = baseUrl;
  }

  getAvailableCurrencies(): AvailableCurrency[] {
    return this.availableCurrencies;
  }

  getBaseCurrency(): string {
    return this.baseCurrency;
  }

  getLatest(): Promise<CurrencyRatesData> {
    return axios.get(`${this.baseUrl}/latest?base=${this.baseCurrency}`)
      .then(({ data }) => data);
  }
}
