import { connect } from 'react-redux';
import { compose, withHandlers, withStateHandlers } from 'recompose';

import { createPosition as createPositionAction } from '../../actions';

const mapDispatchToProps = { createPosition: createPositionAction };

const formatDate = date => date.toISOString().slice(0, 10);

export default compose(
  connect(null, mapDispatchToProps),
  withStateHandlers(
    {
      amount: 1,
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
  withHandlers({

    handleSubmit: ({
      amount, createPosition, date, onCreate, price, symbol,
    }) => event => {
      event.preventDefault();

      createPosition(symbol, price, amount, date)
        .then(position => {
          if (onCreate) {
            onCreate(position);
          }
        });
    },

  }),
);
