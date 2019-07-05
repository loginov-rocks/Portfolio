import { connect } from 'react-redux';
import { compose, withHandlers, withStateHandlers } from 'recompose';

import { Props } from './ClosePositionForm';
import { closePosition as closePositionAction, ClosePositionAction } from '../../actions';
import { formatDate } from '../../lib';

const mapDispatchToProps = { closePosition: closePositionAction };

interface DispatchProps {
  closePosition: ClosePositionAction;
}

interface WithStateHandlersProps {
  commission: number;
  date: string;
  price: number;
}

interface EnhancedProps {
  id: string;
  onClose?: (positionId: string) => void;
}

export default compose<Props & DispatchProps & WithStateHandlersProps, EnhancedProps>(
  connect(null, mapDispatchToProps),
  withStateHandlers(
    {
      commission: 0,
      date: formatDate(new Date()),
      price: 0,
    },
    {
      handleCommissionChange: () => event => {
        const price = parseFloat(event.target.value);

        return {
          commission: price >= 0 ? price : 0,
        };
      },
      handleDateChange: () => event => {
        const date = new Date(event.target.value);

        return {
          date: formatDate(date || new Date()),
        };
      },
      handlePriceChange: () => event => {
        const price = parseFloat(event.target.value);

        return {
          price: price >= 0 ? price : 0,
        };
      },
    },
  ),
  withHandlers<EnhancedProps & DispatchProps & WithStateHandlersProps, {}>({

    handleSubmit: ({
      closePosition, commission, date, id, onClose, price,
    }) => (event: React.SyntheticEvent) => {
      event.preventDefault();

      closePosition(id, price, commission, date)
        .then(positionId => {
          if (onClose) {
            onClose(positionId);
          }
        });
    },

  }),
);
