import * as React from 'react';
import {
  compose, StateHandler, withHandlers, withStateHandlers,
} from 'recompose';

import {
  PositionsOperationsConnector, PositionsOperationsConnectorProps,
} from 'Layers/Adapter/Connectors/PositionsOperationsConnector/PositionsOperationsConnector';
import { Position } from 'Layers/Business/Services/PortfolioService/PortfolioService';
import { formatDate } from 'Shared/lib';

import { Props } from './CreatePositionForm';

interface WithStateHandlersState {
  amount: number | '';
  commission: number | '';
  date: string;
  price: number | '';
  symbol: string;
}

interface WithStateHandlersUpdaters {
  [key: string]: StateHandler<WithStateHandlersState>;
}

interface EnhancedProps {
  onCreate?: (position: Position) => void;
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
      amount: 1,
      commission: '',
      date: formatDate(new Date()),
      price: '',
      symbol: '',
    },
    {
      handleAmountChange: () => (event) => {
        const amount = parseInt(event.target.value, 10);

        return {
          amount: amount > 0 ? amount : '',
        };
      },
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
      handleSymbolChange: () => (event) => ({
        symbol: event.target.value.toUpperCase(),
      }),
    },
  ),
  withHandlers<WithHandlersOutterProps, WithHandlersProps>({

    handleSubmit: ({
      amount, commission, createPosition, date, onCreate, price, symbol,
    }) => (event: React.SyntheticEvent) => {
      event.preventDefault();

      if (amount === '' || commission === '' || price === '' || symbol === '') {
        // TODO: Display the following error in UI.
        throw new Error('Invalid values');
      }

      createPosition(symbol, amount, price, commission, date)
        .then((position) => {
          if (onCreate) {
            onCreate(position);
          }
        });
    },

  }),
);
