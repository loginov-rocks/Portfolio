/* @flow */

import { connect } from 'react-redux';
import {
  compose, withHandlers, withStateHandlers, type HOC,
} from 'recompose';

import { createPosition } from '../../actions';
import type { Position } from '../../lib/flow';

type EnhancedComponentProps = {
  onCreate?: (Position) => void,
};

const mapDispatchToProps = { createPosition };

const formatDate = date => date.toISOString().slice(0, 10);

const enhancer: HOC<*, EnhancedComponentProps> = compose(
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
      amount, createPosition, date, onCreate, price, symbol,
    }) => (event) => {
      event.preventDefault();

      createPosition(symbol, price, amount, date)
        .then((position) => {
          if (onCreate) {
            onCreate(position);
          }
        });
    },

  }),
);

export default enhancer;
