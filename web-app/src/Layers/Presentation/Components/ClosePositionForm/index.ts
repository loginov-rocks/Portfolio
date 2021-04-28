import {
  ClosePositionFormEnhancer,
} from 'Layers/Behavior/Enhancers/ClosePositionFormEnhancer/ClosePositionFormEnhancer';

import { ClosePositionForm as ClosePositionFormComponent, ClosePositionFormProps } from './ClosePositionForm';

export const ClosePositionForm = ClosePositionFormEnhancer<ClosePositionFormProps>()(ClosePositionFormComponent);
