import * as React from 'react';
import { connect } from 'react-redux';
import {
  compose, StateHandler, withHandlers, withStateHandlers,
} from 'recompose';

import { formatDate } from 'Shared/lib';

import { updatePosition as updatePositionAction, UpdatePositionAction } from '../../actions';
import { Position } from '../../lib';
import { Props } from './UpdatePositionForm';

const mapDispatchToProps = { updatePosition: updatePositionAction };

interface DispatchProps {
  updatePosition: UpdatePositionAction;
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
  onClose?: () => void;
  position: Position;
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
      commission, date, onClose, position, price, updatePosition,
    }) => (event: React.SyntheticEvent) => {
      event.preventDefault();

      if (commission === '' || price === '') {
        // TODO: Display the following error in UI.
        throw new Error('Invalid values');
      }

      updatePosition({
        ...position, closeCommission: commission, closeDate: date, closePrice: price,
      })
        .then(() => {
          if (onClose) {
            onClose();
          }
        });
    },

  }),
);
