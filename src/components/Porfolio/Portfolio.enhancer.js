/* @flow */

import { connect } from 'react-redux';
import { compose, withHandlers, withStateHandlers } from 'recompose';

import { addStock, removeStock } from '../../actions';

const mapStateToProps = ({ portfolio }) => ({ portfolio });

const mapDispatchToProps = {
  addStock,
  removeStock,
};

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
);
