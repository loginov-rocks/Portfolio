import { connect } from 'react-redux';
import { compose, withHandlers, withStateHandlers } from 'recompose';

import { openPosition as openPositionAction, OpenPositionAction } from '../../actions';
import { formatDate, Position } from '../../lib';
import { Props } from './OpenPositionForm';

const mapDispatchToProps = { openPosition: openPositionAction };

interface WithHandlersProps {
  amount: number;
  commission: number;
  date: string;
  openPosition: OpenPositionAction;
  price: number;
  symbol: string;
}

interface EnhancedProps {
  onCreate: (position: Position) => void;
}

export default compose<Props & WithHandlersProps, EnhancedProps>(
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
        const date = new Date(event.target.value);

        return {
          date: formatDate(date || new Date()),
        };
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
  withHandlers<WithHandlersProps & EnhancedProps, {}>({

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
