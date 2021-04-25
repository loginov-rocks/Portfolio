import * as React from 'react';

import { PositionForm } from 'Layers/Presentation/Components/PositionForm';
import {
  UpdatePositionFormEnhancerInputProps, UpdatePositionFormEnhancerProps,
} from 'Layers/Behavior/Enhancers/UpdatePositionFormEnhancer/UpdatePositionFormEnhancer';

export interface UpdatePositionFormProps extends UpdatePositionFormEnhancerInputProps {
  backButton?: React.ReactNode;
}

type Props = UpdatePositionFormProps & UpdatePositionFormEnhancerProps;

export const UpdatePositionForm: React.FunctionComponent<Props> = ({
  backButton, handleSubmit, position,
}: Props) => (
  <PositionForm
    backButton={backButton}
    initialPositionFormData={{
      ...position,
      closeCommission: position.closeCommission === null ? '' : position.closeCommission,
      closeDate: position.closeDate === null ? (new Date()).toISOString().slice(0, 10) : position.closeDate,
      closePrice: position.closePrice === null ? '' : position.closePrice,
    }}
    onSubmit={handleSubmit}
  />
);
