/* @flow */

import { connect } from 'react-redux';
import {
  compose, withHandlers, withProps, withStateHandlers,
} from 'recompose';

import { addStock, removeStock } from '../../actions';
import { calculatePortfolioBalance } from '../../lib/stocks';

const mapStateToProps = ({ portfolio, stockQuotes }) => ({
  portfolio, stockQuotes,
});

const mapDispatchToProps = { addStock, removeStock };

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStateHandlers(
    {
      addAmount: 1,
      addSymbol: '',
    },
    {
      handleAddAmountChange: () => (event) => ({
        addAmount: (parseInt(event.target.value) > 0
          ? parseInt(event.target.value)
          : 1),
      }),
      handleAddSymbolChange: () => (event) => ({
        addSymbol: event.target.value.toUpperCase(),
      }),
    },
  ),
  withHandlers({

    handleSubmit: ({ addAmount, addStock, addSymbol }) => (event) => {
      event.preventDefault();
      addStock(addSymbol, addAmount);
    },

  }),
  withProps(({ portfolio, stockQuotes }) => ({
    balance: calculatePortfolioBalance(portfolio, stockQuotes),
  })),
);
