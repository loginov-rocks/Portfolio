/* @flow */

import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';

import { closePosition } from '../../../actions/portfolio';
import { calculatePositionsValue } from '../../../lib/stocks';

const mapStateToProps = ({ portfolio: { positions }, stocks: { quotes } }) => ({
  positions, quotes,
});

const mapDispatchToProps = { closePosition };

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps(({ positions, quotes }) => ({
    balance: calculatePositionsValue(positions, quotes),
  })),
);
