import { connect } from 'react-redux';
import { compose, mapProps } from 'recompose';

import { mergePositionsBySymbols, mergeSymbolsBySectors } from '../../lib';

const mapStateToProps = ({ portfolio: { positions }, stocks: { quotes } }): { positions: []; quotes: [] } => ({
  positions,
  quotes,
});

export default compose(
  connect(mapStateToProps),
  mapProps(({ positions, quotes }) => {
    const symbols = mergePositionsBySymbols(positions);
    const sectors = mergeSymbolsBySectors(symbols, quotes);

    return {
      sectors: sectors.sort(({ share: a }, { share: b }) => {
        if (a > b) {
          return -1;
        }

        if (a < b) {
          return 1;
        }

        return 0;
      }),
    };
  }),
);
