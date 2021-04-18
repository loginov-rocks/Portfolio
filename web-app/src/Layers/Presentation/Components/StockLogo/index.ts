import {
  StockLogoEnhancer,
} from 'Layers/Behavior/Enhancers/StockLogoEnhancer/StockLogoEnhancer';

import { StockLogo as StockLogoComponent, StockLogoProps } from './StockLogo';
import { style } from './StockLogo.style';

export const StockLogo = style(StockLogoEnhancer<StockLogoProps>()(StockLogoComponent));
