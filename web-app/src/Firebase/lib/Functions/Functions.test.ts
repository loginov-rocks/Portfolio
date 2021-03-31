import axios from 'axios';

import vibrantPaletteFixture from './__fixtures__/vibrantPalette';
import Functions from './Functions';

const instance = new Functions('https://example.com');

describe('getStockLogo', () => {
  it('makes request to Firebase Function to obtain vibrant palette', () => {
    (axios as jest.Mocked<typeof axios>).get.mockImplementationOnce(() => Promise.resolve({
      data: vibrantPaletteFixture,
    }));

    return instance.getVibrantPalette('https://storage.googleapis.com/iex/api/logos/AAPL.png')
      .then((vibrantPalette) => {
        expect(vibrantPalette).toStrictEqual(vibrantPaletteFixture);
      });
  });
});
