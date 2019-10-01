import { Request } from 'firebase-functions/lib/providers/https';
import Vibrant from 'node-vibrant';
import { Palette } from 'node-vibrant/lib/color';

export default (request: Request): Promise<Palette> => Vibrant.from(request.query.img).getPalette();
