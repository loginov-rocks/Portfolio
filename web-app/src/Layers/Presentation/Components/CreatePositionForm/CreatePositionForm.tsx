import * as React from 'react';

import {
  CreatePositionFormEnhancerInputProps, CreatePositionFormEnhancerProps,
} from 'Layers/Behavior/Enhancers/CreatePositionFormEnhancer/CreatePositionFormEnhancer';
import { PositionForm } from 'Layers/Presentation/Components/PositionForm';

export type CreatePositionFormProps = CreatePositionFormEnhancerInputProps;

type Props = CreatePositionFormProps & CreatePositionFormEnhancerProps;

export const CreatePositionForm: React.FunctionComponent<Props> = ({ handleSubmit }: Props) => (
  <PositionForm
    displayedFields={[
      'symbol', 'amount', 'openPrice', 'openCommission', 'openDate',
    ]}
    initialData={{
      amount: 1,
      closeCommission: '',
      closeDate: '',
      closePrice: '',
      openCommission: '',
      openDate: (new Date()).toISOString().slice(0, 10),
      openPrice: '',
      symbol: '',
    }}
    onSubmit={handleSubmit}
    requiredFields={[
      'symbol', 'amount', 'openPrice', 'openCommission', 'openDate',
    ]}
    submitButtonTitle="Open"
  />
);
