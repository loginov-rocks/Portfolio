/* @flow */

import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { fetchStockPrice } from '../../actions';

const mapStateToProps = ({ prices }, { symbol }) => ({
  price: prices[symbol] ? prices[symbol] : undefined,
});

const mapDispatchToProps = {
  fetchStockPrice,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({

    componentDidMount() {
      const { fetchStockPrice, symbol } = this.props;

      fetchStockPrice(symbol);
    },

  }),
);
