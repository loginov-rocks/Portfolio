import {
  ComponentEnhancer, compose, lifecycle, mapProps,
} from 'recompose';
import { getResourceById } from 'redux-repository/lib/repository';
import { extractData, isRequested } from 'redux-repository/lib/resource';

import {
  StockLogoData, StocksLogosConnector, StocksLogosConnectorProps,
} from 'Layers/Adapter/Connectors/StocksLogosConnector/StocksLogosConnector';
// TODO: Move to Infrastructure layer.
import { areArraysEqual } from 'Shared/lib';

interface LogosBySymbols {
  [key: string]: {
    logo: StockLogoData;
    progress: boolean;
  };
}

export interface StocksLogosBySymbolsMiddlewareProps {
  logosBySymbols: LogosBySymbols;
}

interface SymbolsExtractor<OwnProps> {
  (ownProps: OwnProps): string[];
}

// eslint-disable-next-line max-len
export const StocksLogosBySymbolsMiddleware = <OwnProps>(symbolsExtractor: SymbolsExtractor<OwnProps>): ComponentEnhancer<OwnProps & StocksLogosBySymbolsMiddlewareProps, OwnProps> => (
  compose(
    StocksLogosConnector,
    lifecycle<OwnProps & StocksLogosConnectorProps, Record<string, never>>({

      componentDidMount() {
        const { fetchLogo } = this.props;
        const symbols = symbolsExtractor(this.props);

        symbols.forEach((symbol) => fetchLogo(symbol));
      },

      componentDidUpdate(prevProps) {
        const { fetchLogo } = this.props;
        const symbols = symbolsExtractor(this.props);

        if (!areArraysEqual(symbols, symbolsExtractor(prevProps))) {
          symbols.forEach((symbol) => fetchLogo(symbol));
        }
      },

    }),
    mapProps<StocksLogosBySymbolsMiddlewareProps, OwnProps & StocksLogosConnectorProps>((props) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { fetchLogo, logos, ...returnedProps } = props;
      const logosBySymbols: LogosBySymbols = {};
      const symbols = symbolsExtractor(props);

      symbols.forEach((symbol) => {
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
  )
);
