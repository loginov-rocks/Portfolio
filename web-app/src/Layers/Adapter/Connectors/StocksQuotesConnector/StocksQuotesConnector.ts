import { connect, ConnectedProps } from 'react-redux';

import { fetchQuote } from 'Layers/Application/ActionCreators/StocksActionCreators/StocksActionCreators';
import { QuoteData, QuotesState } from 'Layers/Application/States/StocksState/StocksState';
import State from 'State';

interface StateProps {
  quotes: QuotesState;
}

const mapStateToProps = ({ stocks: { quotes } }: State): StateProps => ({ quotes });

const mapDispatchToProps = { fetchQuote };

export type StockQuoteData = QuoteData;

export const StocksQuotesConnector = connect(mapStateToProps, mapDispatchToProps);

export type StocksQuotesConnectorProps = ConnectedProps<typeof StocksQuotesConnector>;
