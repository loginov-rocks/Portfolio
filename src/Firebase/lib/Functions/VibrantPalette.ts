interface Color {
  rgb: [number, number, number];
  population: number;
}

export default interface VibrantPalette {
  Vibrant: Color;
  LightVibrant: Color;
  DarkVibrant: Color;
  Muted: Color;
  LightMuted: Color;
  DarkMuted: Color;
}
