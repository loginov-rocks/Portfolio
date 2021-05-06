import axios from 'axios';

import { VibrantPalette } from './Interfaces/VibrantPalette';

interface FirebaseFunctionsApiOptions {
  baseUrl: string;
}

export class FirebaseFunctionsApi {
  private readonly baseUrl: string;

  constructor({ baseUrl }: FirebaseFunctionsApiOptions) {
    this.baseUrl = baseUrl;
  }

  getVibrantPalette(img: string): Promise<VibrantPalette> {
    return axios.get(`${this.baseUrl}/vibrantPalette?img=${img}`)
      .then(({ data }) => data);
  }

  // eslint-disable-next-line class-methods-use-this
  getVibrantColor(
    vibrantPalette: VibrantPalette | null,
    type: 'vibrant' | 'light' | 'dark' | 'muted' | 'lightMuted' | 'darkMuted' = 'vibrant',
    opacity = 1,
  ): string {
    if (vibrantPalette === null) {
      return 'none';
    }

    let color;

    switch (type) {
      case 'light':
        color = vibrantPalette.LightVibrant;
        break;
      case 'dark':
        color = vibrantPalette.DarkVibrant;
        break;
      case 'muted':
        color = vibrantPalette.Muted;
        break;
      case 'lightMuted':
        color = vibrantPalette.LightMuted;
        break;
      case 'darkMuted':
        color = vibrantPalette.DarkMuted;
        break;
      default:
        color = vibrantPalette.Vibrant;
        break;
    }

    return `rgba(${color.rgb[0]}, ${color.rgb[1]}, ${color.rgb[2]}, ${opacity})`;
  }
}
