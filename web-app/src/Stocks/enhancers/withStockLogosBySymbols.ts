import { connect } from 'react-redux';
import {
  ComponentEnhancer, compose, lifecycle, mapProps,
} from 'recompose';
import { Repository } from 'redux-repository/lib/interfaces';
import { getResourceById } from 'redux-repository/lib/repository';
import { extractData, isRequested } from 'redux-repository/lib/resource';

import { areArraysEqual } from 'Shared/lib';
import State from 'State';

import { fetchLogo as fetchLogoAction, FetchLogoAction } from '../actions';

// TODO: Tests.

interface SymbolsExtractor<OwnProps> {
  (ownProps: OwnProps): string[];
}

interface StateProps {
  logos: Repository<string, string>;
}

interface DispatchProps {
  fetchLogo: FetchLogoAction;
}

interface LogosBySymbols {
  [key: string]: {
    logo: string | null;
    progress: boolean;
  };
}

export interface Props {
  logosBySymbols: LogosBySymbols;
}

const mapStateToProps = ({ stocks: { logos } }: State): StateProps => ({ logos });

const mapDispatchToProps = { fetchLogo: fetchLogoAction };

export default <OwnProps>(
  symbolsExtractor: SymbolsExtractor<OwnProps>,
): ComponentEnhancer<Props, OwnProps> => compose<Props, OwnProps>(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle<OwnProps & StateProps & DispatchProps, Record<string, never>>({

    componentDidMount() {
      const { fetchLogo } = this.props;
      const symbols = symbolsExtractor(this.props);

      symbols.forEach(symbol => fetchLogo(symbol));
    },

    componentDidUpdate(prevProps) {
      const { fetchLogo } = this.props;
      const symbols = symbolsExtractor(this.props);

      if (!areArraysEqual(symbols, symbolsExtractor(prevProps))) {
        symbols.forEach(symbol => fetchLogo(symbol));
      }
    },

  }),
  mapProps<Props, OwnProps & StateProps & DispatchProps>(props => {
    const { fetchLogo, logos, ...returnedProps } = props; // eslint-disable-line @typescript-eslint/no-unused-vars
    const logosBySymbols: LogosBySymbols = {};
    const symbols = symbolsExtractor(props);

    symbols.forEach(symbol => {
      const resource = getResourceById(logos, symbol);

      logosBySymbols[symbol] = {
        logo: extractData(resource),
        progress: isRequested(resource),
      };
    });

    return {
      logosBySymbols,
      ...returnedProps,
    };
  }),
);
