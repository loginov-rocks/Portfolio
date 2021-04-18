import { compose, withProps } from 'recompose';

import {
  StocksLogosBySymbolsMiddleware, StocksLogosBySymbolsMiddlewareProps,
} from 'Layers/Behavior/Middlewares/StocksLogosBySymbolsMiddleware/StocksLogosBySymbolsMiddleware';
import {
  VibrantPalettesByImagesMiddleware, VibrantPalettesByImagesMiddlewareProps,
} from 'Layers/Behavior/Middlewares/VibrantPalettesByImagesMiddleware/VibrantPalettesByImagesMiddleware';
import { VibrantPalette } from 'Layers/Business/Services/FirebaseFunctionsService/VibrantPalette';
import withPositions from 'Portfolio/enhancers/withPositions';
import { sortCollection } from 'Shared/lib';

import { Props } from './Analytics';
import withStockPositions, { Props as WithStockPositionsProps } from '../../enhancers/withStockPositions';
import { calculateTotals, createOpenPositionsSummaries } from '../../lib';

export default compose<Props, Record<string, never>>(
  withPositions,
  withStockPositions,
  withProps<Partial<WithStockPositionsProps>, WithStockPositionsProps>(({ stockPositions }) => ({
    stockPositions: stockPositions.filter((position) => position.closeDate === null),
  })),
  withProps<Partial<Props>, WithStockPositionsProps>(({ stockPositions }) => ({
    ...calculateTotals(stockPositions),
    summaries: sortCollection(createOpenPositionsSummaries(stockPositions), 'marketSum', 'desc'),
  })),
  StocksLogosBySymbolsMiddleware<Props>(({ summaries }) => summaries.map((summary) => summary.symbol)),
  VibrantPalettesByImagesMiddleware<StocksLogosBySymbolsMiddlewareProps>(({ logosBySymbols }) => (
    Object.keys(logosBySymbols)
      .map((symbol) => logosBySymbols[symbol].logo)
      .filter((logo) => logo !== null) as string[]
  )),
  // eslint-disable-next-line max-len
  withProps<Partial<Props>, WithStockPositionsProps & StocksLogosBySymbolsMiddlewareProps & VibrantPalettesByImagesMiddlewareProps>(
    ({ logosBySymbols, vibrantPalettesByImages }) => {
      const vibrantPalettesBySymbols: { [key: string]: VibrantPalette | null } = {};

      Object.keys(logosBySymbols).forEach((symbol) => {
        const image = logosBySymbols[symbol].logo;

        vibrantPalettesBySymbols[symbol] = image === null ? null : vibrantPalettesByImages[image].vibrantPalette;
      });

      return { vibrantPalettesBySymbols };
    },
  ),
);
