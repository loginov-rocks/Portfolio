import { SorterEnhancer } from 'Layers/Behavior/SorterEnhancer/SorterEnhancer';

import { Sorter as SorterComponent, SorterProps } from './Sorter';

export const Sorter = SorterEnhancer<SorterProps>()(SorterComponent);
