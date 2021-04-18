import { connect, ConnectedProps } from 'react-redux';

import { fetchLogo } from 'Layers/Application/ActionCreators/StocksActionCreators/StocksActionCreators';
import { LogoData, LogosState } from 'Layers/Application/States/StocksState/StocksState';
import State from 'State';

interface StateProps {
  logos: LogosState;
}

const mapStateToProps = ({ stocks: { logos } }: State): StateProps => ({ logos });

const mapDispatchToProps = { fetchLogo };

export type StockLogoData = LogoData;

export const StocksLogosConnector = connect(mapStateToProps, mapDispatchToProps);

export type StocksLogosConnectorProps = ConnectedProps<typeof StocksLogosConnector>;
