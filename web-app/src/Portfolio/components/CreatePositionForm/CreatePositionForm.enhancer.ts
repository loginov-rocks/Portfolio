import * as React from 'react';
import { connect } from 'react-redux';
import {
  compose, StateHandler, withHandlers, withStateHandlers,
} from 'recompose';

import {
  createPosition as createPositionAction, CreatePositionAction,
} from 'Layers/Application/ActionCreators/PortfolioActionCreators/PortfolioActionCreators';
import { Position } from 'Layers/Business/Services/PortfolioService/PortfolioService';
import { formatDate } from 'Shared/lib';

import { Props } from './CreatePositionForm';

const mapDispatchToProps = { createPosition: createPositionAction };

interface DispatchProps {
  createPosition: CreatePositionAction;
}

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

export default compose<Props & DispatchProps & WithStateHandlersState, EnhancedProps>(
  connect(null, mapDispatchToProps),
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
  withHandlers<EnhancedProps & DispatchProps & WithStateHandlersState & WithStateHandlersUpdaters, WithHandlersProps>({

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
