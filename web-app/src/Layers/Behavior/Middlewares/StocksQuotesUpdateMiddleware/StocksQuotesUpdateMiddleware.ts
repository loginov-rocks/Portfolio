import {
  ComponentEnhancer, compose, lifecycle, mapProps,
} from 'recompose';
import { getResourceById } from 'redux-repository/lib/repository';
import { isExpired } from 'redux-repository/lib/resource';

// TODO: Move to Infrastructure layer.
import * as C from 'Constants';
import {
  StocksQuotesConnector, StocksQuotesConnectorProps,
} from 'Layers/Adapter/Connectors/StocksQuotesConnector/StocksQuotesConnector';

let digest: number;

export const StocksQuotesUpdateMiddleware = <OwnProps>(): ComponentEnhancer<OwnProps, OwnProps> => (
  compose(
    StocksQuotesConnector,
    lifecycle<OwnProps & StocksQuotesConnectorProps, Record<string, never>>({

      componentDidMount() {
        digest = window.setInterval(() => {
          const { fetchQuote, quotes } = this.props;
          const expired: string[] = [];

          quotes.allIds.forEach((symbol) => {
            const quote = getResourceById(quotes, symbol);

            if (isExpired(quote, C.STOCKS_QUOTES_TTL)) {
              expired.push(symbol);
              fetchQuote(symbol);
            }
          });

          console.log('Stock quotes updater working, expired:', expired);
        }, C.STOCKS_QUOTES_UPDATER_INTERVAL);
      },

      componentWillUnmount() {
        clearInterval(digest);
      },

    }),
    mapProps<Record<string, unknown>, StocksQuotesConnectorProps>(({
      fetchQuote, quotes, ...props // eslint-disable-line @typescript-eslint/no-unused-vars
    }) => ({ ...props })),
  )
);
