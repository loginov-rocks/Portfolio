import { MoneyEnhancer } from 'Layers/Behavior/Enhancers/MoneyEnhancer/MoneyEnhancer';

import { Money as MoneyComponent, MoneyProps } from './Money';
import { style } from './Money.style';

export const Money = style(MoneyEnhancer<MoneyProps>()(MoneyComponent));
