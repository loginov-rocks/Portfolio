import * as React from 'react';

import {
  ClosePositionFormEnhancerInputProps, ClosePositionFormEnhancerProps,
} from 'Layers/Behavior/Enhancers/ClosePositionFormEnhancer/ClosePositionFormEnhancer';
import { PositionForm } from 'Layers/Presentation/Components/PositionForm';

export interface ClosePositionFormProps extends ClosePositionFormEnhancerInputProps {
  onCancelButtonClick?: () => void;
}

type Props = ClosePositionFormProps & ClosePositionFormEnhancerProps;

export const ClosePositionForm: React.FunctionComponent<Props> = ({
  handleSubmit, onCancelButtonClick, position,
}: Props) => (
  <PositionForm
    cancelButtonTitle="Cancel"
    displayedFields={[
      'closePrice', 'closeCommission', 'closeDate',
    ]}
    initialData={{
      ...position,
      closeCommission: '',
      closeDate: (new Date()).toISOString().slice(0, 10),
      closePrice: '',
    }}
    onCancelButtonClick={onCancelButtonClick}
    onSubmit={handleSubmit}
    requiredFields={[
      'closePrice', 'closeCommission', 'closeDate',
    ]}
    submitButtonTitle="Close"
  />
);
