import {
  ComponentEnhancer, compose, lifecycle, mapProps,
} from 'recompose';
import { getResourceById } from 'redux-repository/lib/repository';
import { isExpired } from 'redux-repository/lib/resource';

// TODO: Move to Infrastructure layer.
import * as C from 'Constants';
import {
  StockQuotesConnector, StockQuotesConnectorProps,
} from 'Layers/Adapter/Connectors/StockQuotesConnector/StockQuotesConnector';

let digest: number;

export const StockQuotesUpdateMiddleware = <OwnProps>(): ComponentEnhancer<OwnProps, OwnProps> => (
  compose(
    StockQuotesConnector,
    lifecycle<OwnProps & StockQuotesConnectorProps, Record<string, never>>({

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
    mapProps<Record<string, unknown>, StockQuotesConnectorProps>(({
      fetchQuote, quotes, ...props // eslint-disable-line @typescript-eslint/no-unused-vars
    }) => ({ ...props })),
  )
);
