import {
  ComponentEnhancer, compose, lifecycle, mapProps,
} from 'recompose';
import { getResourceById } from 'redux-repository/lib/repository';
import { extractData, isRequested } from 'redux-repository/lib/resource';

import {
  StockLogoData, StocksLogosConnector, StocksLogosConnectorProps,
} from 'Layers/Adapter/Connectors/StocksLogosConnector/StocksLogosConnector';

export interface StockLogoBySymbolMiddlewareInputProps {
  symbol: string;
}

export interface StockLogoBySymbolMiddlewareProps {
  logo: StockLogoData;
  logoProgress: boolean;
}

// eslint-disable-next-line max-len
export const StockLogoBySymbolMiddleware = <OwnProps extends StockLogoBySymbolMiddlewareInputProps>(): ComponentEnhancer<OwnProps & StockLogoBySymbolMiddlewareProps, OwnProps> => (
  compose(
    StocksLogosConnector,
    lifecycle<OwnProps & StocksLogosConnectorProps, Record<string, never>>({

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
    mapProps<StockLogoBySymbolMiddlewareProps, OwnProps & StocksLogosConnectorProps>(({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      fetchLogo, logos, symbol, ...returnedProps
    }) => {
      const logo = getResourceById(logos, symbol);

      return {
        logo: extractData(logo),
        logoProgress: isRequested(logo),
        symbol,
        ...returnedProps,
      };
    }),
  )
);
