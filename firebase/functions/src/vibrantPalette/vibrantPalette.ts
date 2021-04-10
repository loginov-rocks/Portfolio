import { Request } from 'firebase-functions/lib/providers/https';
import Vibrant from 'node-vibrant';
import { Palette } from 'node-vibrant/lib/color';

export const vibrantPalette = (request: Request): Promise<Palette> => (
  Vibrant.from(request.query.img as string).getPalette()
);
