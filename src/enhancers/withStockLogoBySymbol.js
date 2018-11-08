/* @flow */

import { connect } from 'react-redux';
import { compose, lifecycle, withProps } from 'recompose';
import { getResourceById } from 'redux-repository/lib/repository';
import { extractData, isRequested } from 'redux-repository/lib/resource';

import { fetchStockLogo } from '../actions';

const mapStateToProps = ({ stockLogos }) => ({ stockLogos });

const mapDispatchToProps = { fetchStockLogo };

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({

    componentDidMount() {
      const { fetchStockLogo, symbol } = this.props;

      if (symbol) {
        fetchStockLogo(symbol);
      }
    },

    componentDidUpdate(prevProps) {
      const { fetchStockLogo, symbol } = this.props;

      if (symbol && symbol !== prevProps.symbol) {
        fetchStockLogo(symbol);
      }
    },

  }),
  withProps(({ stockLogos, symbol }) => {
    const logo = getResourceById(stockLogos, symbol);

    return {
      logo: extractData(logo),
      logoProgress: isRequested(logo),
    };
  }),
);
