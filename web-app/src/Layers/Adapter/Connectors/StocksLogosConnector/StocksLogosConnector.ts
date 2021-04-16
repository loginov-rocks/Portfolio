import { connect, ConnectedProps } from 'react-redux';

import State from 'State';
import { fetchLogo } from 'Layers/Application/ActionCreators/StocksActionCreators/StocksActionCreators';
import { LogosState } from 'Layers/Application/States/StocksState/StocksState';

interface StateProps {
  logos: LogosState;
}

const mapStateToProps = ({ stocks: { logos } }: State): StateProps => ({ logos });

const mapDispatchToProps = { fetchLogo };

export const StocksLogosConnector = connect(mapStateToProps, mapDispatchToProps);

export type StocksLogosConnectorProps = ConnectedProps<typeof StocksLogosConnector>;
