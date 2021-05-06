interface Color {
  rgb: [number, number, number];
  population: number;
}

export interface VibrantPalette {
  Vibrant: Color;
  LightVibrant: Color;
  DarkVibrant: Color;
  Muted: Color;
  LightMuted: Color;
  DarkMuted: Color;
}
