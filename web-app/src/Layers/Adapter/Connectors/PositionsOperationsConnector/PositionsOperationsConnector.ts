import { connect, ConnectedProps } from 'react-redux';

import {
  closePosition, createPosition, deletePosition, updatePosition,
} from 'Layers/Application/ActionCreators/PositionsActionCreators/PositionsActionCreators';

const mapDispatchToProps = {
  closePosition, createPosition, deletePosition, updatePosition,
};

export const PositionsOperationsConnector = connect(null, mapDispatchToProps);

export type PositionsOperationsConnectorProps = ConnectedProps<typeof PositionsOperationsConnector>;
