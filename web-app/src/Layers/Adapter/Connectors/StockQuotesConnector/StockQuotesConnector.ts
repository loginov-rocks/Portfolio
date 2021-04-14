import { connect, ConnectedProps } from 'react-redux';

import State from 'State';
import { fetchQuote } from 'Stocks/actions';
import { QuotesState } from 'Stocks/State';

interface StateProps {
  quotes: QuotesState;
}

const mapStateToProps = ({ stocks: { quotes } }: State): StateProps => ({ quotes });

const mapDispatchToProps = { fetchQuote };

export const StockQuotesConnector = connect(mapStateToProps, mapDispatchToProps);

export type StockQuotesConnectorProps = ConnectedProps<typeof StockQuotesConnector>;
