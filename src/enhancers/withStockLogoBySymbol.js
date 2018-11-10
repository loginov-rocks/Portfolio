/* @flow */

import { connect } from 'react-redux';
import { compose, lifecycle, mapProps } from 'recompose';
import { getResourceById } from 'redux-repository/lib/repository';
import { extractData, isRequested } from 'redux-repository/lib/resource';

import { fetchLogo } from '../actions/stocks';

const mapStateToProps = ({ stocks: { logos } }) => ({ logos });

const mapDispatchToProps = { fetchLogo };

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({

    componentDidMount() {
      const { fetchLogo, symbol } = this.props;

      if (symbol) {
        fetchLogo(symbol);
      }
    },

    componentDidUpdate(prevProps) {
      const { fetchLogo, symbol } = this.props;

      if (symbol && symbol !== prevProps.symbol) {
        fetchLogo(symbol);
      }
    },

  }),
  mapProps(({ fetchLogo, logos, symbol, ...props }) => {
    const logo = getResourceById(logos, symbol);

    return {
      logo: extractData(logo),
      logoProgress: isRequested(logo),
      symbol,
      ...props,
    };
  }),
);
