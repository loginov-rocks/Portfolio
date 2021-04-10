/* eslint-disable import/no-extraneous-dependencies */

import { Request } from 'jest-express/lib/request';
import Vibrant from 'node-vibrant';

import * as paletteFixture from './__fixtures__/palette.json';
import { vibrantPalette } from './vibrantPalette';

jest.mock('node-vibrant');

// @ts-ignore
Vibrant.from = jest.fn((imageUrl: string) => ({
  getPalette: () => {
    if (imageUrl === 'https://storage.googleapis.com/iexcloud-hl37opg/api/logos/GOOGL.png') {
      return Promise.resolve(paletteFixture);
    }

    return Promise.reject();
  },
}));

it('passes always', () => {
  const request = new Request();
  request.setQuery('img', 'https://storage.googleapis.com/iexcloud-hl37opg/api/logos/GOOGL.png');

  // @ts-ignore
  return expect(vibrantPalette(request)).resolves.toEqual(paletteFixture);
});
