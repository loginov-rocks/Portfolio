import { connect } from 'react-redux';

import State from 'State';
import { fetchQuote, FetchQuoteAction } from 'Stocks/actions';
import { QuotesState } from 'Stocks/State';

interface StateProps {
  quotes: QuotesState;
}

export interface StockQuotesConnectorProps extends StateProps {
  fetchQuote: FetchQuoteAction;
}

const mapStateToProps = ({ stocks: { quotes } }: State): StateProps => ({ quotes });

const mapDispatchToProps = { fetchQuote };

export const StockQuotesConnector = connect(mapStateToProps, mapDispatchToProps);
