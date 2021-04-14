import {
  ComponentEnhancer, compose, lifecycle, mapProps,
} from 'recompose';
import { getResourceById } from 'redux-repository/lib/repository';
import { extractData, isRequested } from 'redux-repository/lib/resource';

import {
  StockLogosConnector, StockLogosConnectorProps,
} from 'Layers/Adapter/Connectors/StockLogosConnector/StockLogosConnector';

export interface StockLogoBySymbolEnhancerInputProps {
  symbol: string;
}

export interface StockLogoBySymbolEnhancerProps {
  logo: string | null;
  logoProgress: boolean;
}

// eslint-disable-next-line max-len
export const StockLogoBySymbolEnhancer = <OwnProps extends StockLogoBySymbolEnhancerInputProps>(): ComponentEnhancer<OwnProps & StockLogoBySymbolEnhancerProps, OwnProps> => (
  compose(
    StockLogosConnector,
    lifecycle<OwnProps & StockLogosConnectorProps, Record<string, never>>({

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
    mapProps<StockLogoBySymbolEnhancerProps, OwnProps & StockLogosConnectorProps>(({
      fetchLogo, logos, symbol, ...props // eslint-disable-line @typescript-eslint/no-unused-vars
    }) => {
      const logo = getResourceById(logos, symbol);

      return {
        logo: extractData(logo),
        logoProgress: isRequested(logo),
        symbol,
        ...props,
      };
    }),
  )
);
