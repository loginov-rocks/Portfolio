import { connect } from 'react-redux';
import { compose, withHandlers, withStateHandlers } from 'recompose';

import { openPosition as openPositionAction, OpenPositionAction } from '../../actions';
import { formatDate, Position } from '../../lib';
import { Props } from './OpenPositionForm';

const mapDispatchToProps = { openPosition: openPositionAction };

interface DispatchProps {
  openPosition: OpenPositionAction;
}

interface WithStateHandlersProps {
  amount: number;
  commission: number;
  date: string;
  price: number;
  symbol: string;
}

interface EnhancedProps {
  onCreate?: (position: Position) => void;
}

export default compose<Props & DispatchProps & WithStateHandlersProps, EnhancedProps>(
  connect(null, mapDispatchToProps),
  withStateHandlers(
    {
      amount: 1,
      commission: 0,
      date: formatDate(new Date()),
      price: 0,
      symbol: '',
    },
    {
      handleAmountChange: () => event => {
        const amount = parseInt(event.target.value, 10);

        return {
          amount: amount > 0 ? amount : 1,
        };
      },
      handleCommissionChange: () => event => {
        const price = parseFloat(event.target.value);

        return {
          commission: price >= 0 ? price : 0,
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
          price: price >= 0 ? price : 0,
        };
      },
      handleSymbolChange: () => event => ({
        symbol: event.target.value.toUpperCase(),
      }),
    },
  ),
  withHandlers<EnhancedProps & DispatchProps & WithStateHandlersProps, {}>({

    handleSubmit: ({
      amount, commission, date, onCreate, openPosition, price, symbol,
    }) => (event: React.SyntheticEvent) => {
      event.preventDefault();

      openPosition(symbol, amount, price, commission, date)
        .then(position => {
          if (onCreate) {
            onCreate(position);
          }
        });
    },

  }),
);
