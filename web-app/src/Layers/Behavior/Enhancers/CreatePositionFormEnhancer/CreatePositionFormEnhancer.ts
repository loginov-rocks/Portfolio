import { ComponentEnhancer, compose, withHandlers } from 'recompose';

import {
  PositionsOperationsConnector, PositionsOperationsConnectorProps,
} from 'Layers/Adapter/Connectors/PositionsOperationsConnector/PositionsOperationsConnector';
import { PositionFormData } from 'Layers/Behavior/Enhancers/PositionFormEnhancer/Interfaces/PositionFormData';
// TODO: Remove link to Business layer!
import { Position } from 'Layers/Business/Services/PortfolioService/Interfaces/Position';

export interface CreatePositionFormEnhancerInputProps {
  onCreate?: (position: Position) => void;
}

interface WithHandlersProps {
  handleSubmit: (data: PositionFormData) => void;
}

export type CreatePositionFormEnhancerProps = PositionsOperationsConnectorProps & WithHandlersProps;

// eslint-disable-next-line max-len
export const CreatePositionFormEnhancer = <OwnProps extends CreatePositionFormEnhancerInputProps>(): ComponentEnhancer<OwnProps & CreatePositionFormEnhancerProps, OwnProps> => (
  compose(
    PositionsOperationsConnector,
    withHandlers<OwnProps & PositionsOperationsConnectorProps, WithHandlersProps>({

      handleSubmit: ({ createPosition, onCreate }) => ({
        amount, openCommission, openDate, openPrice, symbol,
      }) => {
        if (amount === '' || openCommission === '' || openPrice === '' || symbol === '') {
          // TODO: Display the following error in UI.
          throw new Error('Invalid values');
        }

        createPosition(symbol, amount, openPrice, openCommission, openDate)
          .then((createdPosition) => {
            if (onCreate) {
              onCreate(createdPosition);
            }
          });
      },

    }),
  )
);
