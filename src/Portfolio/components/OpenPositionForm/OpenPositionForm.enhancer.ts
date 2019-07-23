import { connect } from 'react-redux';
import {
  compose, StateHandler, withHandlers, withStateHandlers,
} from 'recompose';

import { formatDate } from 'Shared/lib';

import { openPosition as openPositionAction, OpenPositionAction } from '../../actions';
import { Position } from '../../lib';
import { Props } from './OpenPositionForm';

const mapDispatchToProps = { openPosition: openPositionAction };

interface DispatchProps {
  openPosition: OpenPositionAction;
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
      handleAmountChange: () => event => {
        const amount = parseInt(event.target.value, 10);

        return {
          amount: amount > 0 ? amount : '',
        };
      },
      handleCommissionChange: () => event => {
        const commission = parseFloat(event.target.value);

        return {
          commission: commission >= 0 ? commission : '',
        };
      },
      handleDateChange: () => event => {
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
      handlePriceChange: () => event => {
        const price = parseFloat(event.target.value);

        return {
          price: price >= 0 ? price : '',
        };
      },
      handleSymbolChange: () => event => ({
        symbol: event.target.value.toUpperCase(),
      }),
    },
  ),
  withHandlers<EnhancedProps & DispatchProps & WithStateHandlersState & WithStateHandlersUpdaters, {}>({

    handleSubmit: ({
      amount, commission, date, onCreate, openPosition, price, symbol,
    }) => (event: React.SyntheticEvent) => {
      event.preventDefault();

      if (amount === '' || commission === '' || price === '') {
        // TODO: Display the following error in UI.
        throw new Error('Invalid values');
      }

      openPosition(symbol, amount, price, commission, date)
        .then(position => {
          if (onCreate) {
            onCreate(position);
          }
        });
    },

  }),
);
