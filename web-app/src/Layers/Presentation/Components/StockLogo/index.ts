import {
  StockLogoBySymbolEnhancer,
} from 'Layers/Behavior/Enhancers/StockLogoBySymbolEnhancer/StockLogoBySymbolEnhancer';

import { StockLogo as StockLogoComponent, StockLogoProps } from './StockLogo';
import { style } from './StockLogo.style';

export const StockLogo = style(StockLogoBySymbolEnhancer<StockLogoProps>()(StockLogoComponent));
