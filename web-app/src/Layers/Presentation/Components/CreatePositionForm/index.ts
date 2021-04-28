import {
  CreatePositionFormEnhancer,
} from 'Layers/Behavior/Enhancers/CreatePositionFormEnhancer/CreatePositionFormEnhancer';

import { CreatePositionForm as CreatePositionFormComponent, CreatePositionFormProps } from './CreatePositionForm';

export const CreatePositionForm = CreatePositionFormEnhancer<CreatePositionFormProps>()(CreatePositionFormComponent);
