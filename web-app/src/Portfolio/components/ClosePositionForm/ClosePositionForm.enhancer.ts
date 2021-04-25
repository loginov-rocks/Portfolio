import * as React from 'react';
import {
  compose, StateHandler, withHandlers, withStateHandlers,
} from 'recompose';

import {
  PositionsOperationsConnector, PositionsOperationsConnectorProps,
} from 'Layers/Adapter/Connectors/PositionsOperationsConnector/PositionsOperationsConnector';
import { formatDate } from 'Shared/lib';

import { Props } from './ClosePositionForm';

interface WithStateHandlersState {
  commission: number | '';
  date: string;
  price: number | '';
}

interface WithStateHandlersUpdaters {
  [key: string]: StateHandler<WithStateHandlersState>;
}

interface EnhancedProps {
  backButton?: React.ReactNode;
  id: string;
  onClose?: () => void;
}

interface WithHandlersProps {
  handleSubmit: (event: React.SyntheticEvent) => void;
}

type WithHandlersOutterProps = EnhancedProps & PositionsOperationsConnectorProps & WithStateHandlersState
  & WithStateHandlersUpdaters;

export default compose<Props & PositionsOperationsConnectorProps & WithStateHandlersState, EnhancedProps>(
  PositionsOperationsConnector,
  withStateHandlers<WithStateHandlersState, WithStateHandlersUpdaters>(
    {
      commission: '',
      date: formatDate(new Date()),
      price: '',
    },
    {
      handleCommissionChange: () => (event) => {
        const commission = parseFloat(event.target.value);

        return {
          commission: commission >= 0 ? commission : '',
        };
      },
      handleDateChange: () => (event) => {
        let date;

        try {
          date = formatDate(new Date(event.target.value));
        } catch (error) {
          //
        }

        if (!date) {
          date = formatDate(new Date());
        }

        return { date };
      },
      handlePriceChange: () => (event) => {
        const price = parseFloat(event.target.value);

        return {
          price: price >= 0 ? price : '',
        };
      },
    },
  ),
  withHandlers<WithHandlersOutterProps, WithHandlersProps>({

    handleSubmit: ({
      closePosition, commission, date, id, onClose, price,
    }) => (event: React.SyntheticEvent) => {
      event.preventDefault();

      if (commission === '' || price === '') {
        // TODO: Display the following error in UI.
        throw new Error('Invalid values');
      }

      closePosition(id, price, commission, date)
        .then(() => {
          if (onClose) {
            onClose();
          }
        });
    },

  }),
);
