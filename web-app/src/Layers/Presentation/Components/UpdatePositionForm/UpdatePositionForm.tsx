import * as React from 'react';

import {
  UpdatePositionFormEnhancerInputProps, UpdatePositionFormEnhancerProps,
} from 'Layers/Behavior/Enhancers/UpdatePositionFormEnhancer/UpdatePositionFormEnhancer';
import { PositionForm } from 'Layers/Presentation/Components/PositionForm';

export interface UpdatePositionFormProps extends UpdatePositionFormEnhancerInputProps {
  onCancelButtonClick?: () => void;
}

type Props = UpdatePositionFormProps & UpdatePositionFormEnhancerProps;

export const UpdatePositionForm: React.FunctionComponent<Props> = ({
  handleSubmit, onCancelButtonClick, position,
}: Props) => (
  <PositionForm
    cancelButtonTitle="Cancel"
    displayedFields={[
      'symbol', 'amount', 'openPrice', 'openCommission', 'openDate', 'closePrice', 'closeCommission', 'closeDate',
    ]}
    initialData={{
      ...position,
      closeCommission: position.closeCommission === null ? '' : position.closeCommission,
      closeDate: position.closeDate === null ? (new Date()).toISOString().slice(0, 10) : position.closeDate,
      closePrice: position.closePrice === null ? '' : position.closePrice,
    }}
    onCancelButtonClick={onCancelButtonClick}
    onSubmit={handleSubmit}
    requiredFields={[
      'symbol', 'amount', 'openPrice', 'openCommission', 'openDate',
    ]}
    submitButtonTitle="Update"
  />
);
