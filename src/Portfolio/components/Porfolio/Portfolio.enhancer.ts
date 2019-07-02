import { connect } from 'react-redux';
import { compose, mapProps } from 'recompose';

import { deletePosition } from '../../actions';
import { calculatePositionsValue, mergePositionsBySymbols } from '../../lib';

const mapStateToProps = ({ portfolio: { positions }, stocks: { quotes } }): { positions: []; quotes: [] } => ({
  positions, quotes,
});

const mapDispatchToProps = { closePosition: deletePosition };

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  mapProps(({ positions, quotes, ...props }) => {
    const symbols = mergePositionsBySymbols(positions);

    return {
      ...props,
      symbols: symbols.sort(({ symbol: a }, { symbol: b }) => {
        if (a < b) {
          return -1;
        }

        if (a > b) {
          return 1;
        }

        return 0;
      }),
      value: calculatePositionsValue(positions, quotes),
    };
  }),
);
