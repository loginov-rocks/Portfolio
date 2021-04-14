import { connect, ConnectedProps } from 'react-redux';

import State from 'State';
import { fetchLogo } from 'Stocks/actions';
import { LogosState } from 'Stocks/State';

interface StateProps {
  logos: LogosState;
}

const mapStateToProps = ({ stocks: { logos } }: State): StateProps => ({ logos });

const mapDispatchToProps = { fetchLogo };

export const StockLogosConnector = connect(mapStateToProps, mapDispatchToProps);

export type StockLogosConnectorProps = ConnectedProps<typeof StockLogosConnector>;
