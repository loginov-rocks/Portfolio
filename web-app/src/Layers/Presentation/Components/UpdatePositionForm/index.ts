import {
  UpdatePositionFormEnhancer,
} from 'Layers/Behavior/Enhancers/UpdatePositionFormEnhancer/UpdatePositionFormEnhancer';

import { UpdatePositionForm as UpdatePositionFormComponent, UpdatePositionFormProps } from './UpdatePositionForm';

export const UpdatePositionForm = UpdatePositionFormEnhancer<UpdatePositionFormProps>()(UpdatePositionFormComponent);
