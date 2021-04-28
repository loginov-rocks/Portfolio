import { TotalsEnhancer } from 'App/components/Totals/TotalsEnhancer';

import { Totals as TotalsComponent, TotalsProps } from './Totals';
import { style } from './Totals.style';

export const Totals = style(TotalsEnhancer<TotalsProps>()(TotalsComponent));
