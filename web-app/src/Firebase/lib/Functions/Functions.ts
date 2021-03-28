import axios from 'axios';

import VibrantPalette from './VibrantPalette';

export default class Functions {
  protected baseUrl: string;

  public constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public getVibrantPalette(img: string): Promise<VibrantPalette> {
    return axios.get(`${this.baseUrl}/vibrantPalette?img=${img}`)
      .then(({ data }) => data);
  }
}
