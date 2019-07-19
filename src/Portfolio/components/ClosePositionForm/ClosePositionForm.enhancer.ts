import * as React from 'react';
import { connect } from 'react-redux';
import {
  compose, StateHandler, withHandlers, withStateHandlers,
} from 'recompose';

import { Props } from './ClosePositionForm';
import { closePosition as closePositionAction, ClosePositionAction } from '../../actions';
import { formatDate } from '../../lib';

const mapDispatchToProps = { closePosition: closePositionAction };

interface DispatchProps {
  closePosition: ClosePositionAction;
}

interface WithStateHandlersState {
  commission: number | '';
  date: string;
  price: number | '';
}

interface WithStateHandlersUpdaters {
  [key: string]: StateHandler<WithStateHandlersState>;
}

interface EnhancedProps {
  backButton?: React.ReactNode;
  id: string;
  onClose?: (positionId: string) => void;
}

export default compose<Props & DispatchProps & WithStateHandlersState, EnhancedProps>(
  connect(null, mapDispatchToProps),
  withStateHandlers<WithStateHandlersState, WithStateHandlersUpdaters>(
    {
      commission: '',
      date: formatDate(new Date()),
      price: '',
    },
    {
      handleCommissionChange: () => event => {
        const commission = parseFloat(event.target.value);

        return {
          commission: commission >= 0 ? commission : '',
        };
      },
      handleDateChange: () => event => {
        let date;

        try {
          date = formatDate(new Date(event.target.value));
        } catch (error) {
          //
        }

        if (!date) {
          date = formatDate(new Date());
        }

        return { date };
      },
      handlePriceChange: () => event => {
        const price = parseFloat(event.target.value);

        return {
          price: price >= 0 ? price : '',
        };
      },
    },
  ),
  withHandlers<EnhancedProps & DispatchProps & WithStateHandlersState & WithStateHandlersUpdaters, {}>({

    handleSubmit: ({
      closePosition, commission, date, id, onClose, price,
    }) => (event: React.SyntheticEvent) => {
      event.preventDefault();

      if (commission === '' || price === '') {
        // TODO: Display the following error in UI.
        throw new Error('Invalid values');
      }

      closePosition(id, price, commission, date)
        .then(positionId => {
          if (onClose) {
            onClose(positionId);
          }
        });
    },

  }),
);
