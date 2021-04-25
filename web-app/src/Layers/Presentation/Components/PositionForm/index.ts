import { PositionFormEnhancer } from 'Layers/Behavior/Enhancers/PositionFormEnhancer/PositionFormEnhancer';

import { PositionForm as PositionFormComponent, PositionFormProps } from './PositionForm';
import { style } from './PositionForm.style';

export const PositionForm = style(PositionFormEnhancer<PositionFormProps>()(PositionFormComponent));
