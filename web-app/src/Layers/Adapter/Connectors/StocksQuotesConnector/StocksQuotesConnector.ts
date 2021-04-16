import { connect, ConnectedProps } from 'react-redux';

import State from 'State';
import { fetchQuote } from 'Layers/Application/ActionCreators/StocksActionCreators/StocksActionCreators';
import { QuotesState } from 'Layers/Application/States/StocksState/StocksState';

interface StateProps {
  quotes: QuotesState;
}

const mapStateToProps = ({ stocks: { quotes } }: State): StateProps => ({ quotes });

const mapDispatchToProps = { fetchQuote };

export const StocksQuotesConnector = connect(mapStateToProps, mapDispatchToProps);

export type StocksQuotesConnectorProps = ConnectedProps<typeof StocksQuotesConnector>;
