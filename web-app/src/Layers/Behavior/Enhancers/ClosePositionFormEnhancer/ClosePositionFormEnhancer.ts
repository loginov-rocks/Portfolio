import { ComponentEnhancer, compose, withHandlers } from 'recompose';

import {
  PositionsOperationsConnector, PositionsOperationsConnectorProps,
} from 'Layers/Adapter/Connectors/PositionsOperationsConnector/PositionsOperationsConnector';
import { PositionFormData } from 'Layers/Behavior/Enhancers/PositionFormEnhancer/Interfaces/PositionFormData';
// TODO: Remove link to Business layer!
import { Position } from 'Layers/Business/Services/PortfolioService/Interfaces/Position';

export interface ClosePositionFormEnhancerInputProps {
  onClose?: (positionId: string) => void;
  position: Position;
}

interface WithHandlersProps {
  handleSubmit: (data: PositionFormData) => void;
}

export type ClosePositionFormEnhancerProps = PositionsOperationsConnectorProps & WithHandlersProps;

// eslint-disable-next-line max-len
export const ClosePositionFormEnhancer = <OwnProps extends ClosePositionFormEnhancerInputProps>(): ComponentEnhancer<OwnProps & ClosePositionFormEnhancerProps, OwnProps> => (
  compose(
    PositionsOperationsConnector,
    withHandlers<OwnProps & PositionsOperationsConnectorProps, WithHandlersProps>({

      handleSubmit: ({ closePosition, position, onClose }) => ({
        closeCommission, closeDate, closePrice,
      }) => {
        if (closeCommission === '' || closePrice === '') {
          // TODO: Display the following error in UI.
          throw new Error('Invalid values');
        }

        closePosition(position.id, closePrice, closeCommission, closeDate)
          .then((closedPositionId) => {
            if (onClose) {
              onClose(closedPositionId);
            }
          });
      },

    }),
  )
);
