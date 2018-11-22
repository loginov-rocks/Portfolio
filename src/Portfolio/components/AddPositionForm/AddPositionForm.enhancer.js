/* @flow */

import { connect } from 'react-redux';
import { compose, withHandlers, withStateHandlers } from 'recompose';

import { openPosition } from '../../actions';

const mapDispatchToProps = { openPosition };

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
      handleAmountChange: () => (event) => {
        const amount = parseInt(event.target.value);

        return {
          amount: amount > 0 ? amount : 1,
        };
      },
      handleDateChange: () => (event) => {
        const date = new Date(event.target.value);

        return {
          date: formatDate(date ? date : new Date()),
        };
      },
      handlePriceChange: () => (event) => {
        const price = parseFloat(event.target.value);

        return {
          price: price >= 0 ? price : 0,
        };
      },
      handleSymbolChange: () => (event) => ({
        symbol: event.target.value.toUpperCase(),
      }),
    },
  ),
  withHandlers({

    handleSubmit: ({
      amount, date, openPosition, price, symbol,
    }) => (event) => {
      event.preventDefault();
      openPosition(symbol, price, amount, date);
    },

  }),
);
