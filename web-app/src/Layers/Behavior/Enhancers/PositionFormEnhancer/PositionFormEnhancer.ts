import * as React from 'react';
import {
  ComponentEnhancer, compose, StateHandler, StateHandlerMap, withHandlers, withStateHandlers,
} from 'recompose';

import { PositionFormData } from './PositionFormData';
import { parseDateString, parseNonNegativeFloat, parsePositiveInteger } from './PositionFormDataParsers';

export interface PositionFormEnhancerInputProps {
  initialData: PositionFormData;
  onSubmit: (data: PositionFormData) => void;
}

type WithStateHandlersState = PositionFormData;

interface WithStateHandlersUpdaters {
  handleSymbolChange: StateHandler<WithStateHandlersState>;
  handleAmountChange: StateHandler<WithStateHandlersState>;

  handleOpenPriceChange: StateHandler<WithStateHandlersState>;
  handleOpenCommissionChange: StateHandler<WithStateHandlersState>;
  handleOpenDateChange: StateHandler<WithStateHandlersState>;

  handleClosePriceChange: StateHandler<WithStateHandlersState>;
  handleCloseCommissionChange: StateHandler<WithStateHandlersState>;
  handleCloseDateChange: StateHandler<WithStateHandlersState>;
}

interface WithHandlersProps {
  handleSubmit: (event: React.SyntheticEvent) => void;
}

export type PositionFormEnhancerProps = WithStateHandlersState & WithStateHandlersUpdaters & WithHandlersProps;

// eslint-disable-next-line max-len
export const PositionFormEnhancer = <OwnProps extends PositionFormEnhancerInputProps>(): ComponentEnhancer<OwnProps & PositionFormEnhancerProps, OwnProps> => (
  compose(
    // StateHandlerMap<WithStateHandlersState> used here instead of WithStateHandlersUpdaters to comply with the
    // sophisticated withStateHandlers contract that doesn't recognize map in WithStateHandlersUpdaters.
    withStateHandlers<WithStateHandlersState, StateHandlerMap<WithStateHandlersState>, OwnProps>(
      ({ initialData }) => initialData,
      {
        handleAmountChange: () => (event) => ({ amount: parsePositiveInteger(event.target.value) }),
        handleCloseCommissionChange: () => (event) => ({ closeCommission: parseNonNegativeFloat(event.target.value) }),
        handleCloseDateChange: () => (event) => ({ closeDate: parseDateString(event.target.value) }),
        handleClosePriceChange: () => (event) => ({ closePrice: parseNonNegativeFloat(event.target.value) }),
        handleOpenCommissionChange: () => (event) => ({ openCommission: parseNonNegativeFloat(event.target.value) }),
        handleOpenDateChange: () => (event) => ({ openDate: parseDateString(event.target.value) }),
        handleOpenPriceChange: () => (event) => ({ openPrice: parseNonNegativeFloat(event.target.value) }),
        handleSymbolChange: () => (event) => ({ symbol: event.target.value.toUpperCase() }),
      },
    ),
    withHandlers<OwnProps & WithStateHandlersState & WithStateHandlersUpdaters, WithHandlersProps>({

      handleSubmit: ({
        amount, closeCommission, closeDate, closePrice, onSubmit, openCommission, openDate, openPrice, symbol,
      }) => (event) => {
        event.preventDefault();

        onSubmit({
          amount, closeCommission, closeDate, closePrice, openCommission, openDate, openPrice, symbol,
        });
      },

    }),
  )
);
