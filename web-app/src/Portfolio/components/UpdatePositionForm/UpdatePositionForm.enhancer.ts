import * as React from 'react';
import { connect } from 'react-redux';
import {
  compose, StateHandler, withHandlers, withStateHandlers,
} from 'recompose';

import {
  updatePosition as updatePositionAction, UpdatePositionAction,
} from 'Layers/Application/ActionCreators/PortfolioActionCreators/PortfolioActionCreators';
import { Position } from 'Layers/Business/Services/PortfolioService/PortfolioService';
import { formatDate } from 'Shared/lib';

import { Props } from './UpdatePositionForm';

const mapDispatchToProps = { updatePosition: updatePositionAction };

interface DispatchProps {
  updatePosition: UpdatePositionAction;
}

interface WithStateHandlersState {
  symbol: string;
  amount: number | '';

  openPrice: number | '';
  openCommission: number | '';
  openDate: string;

  closePrice: number | '';
  closeCommission: number | '';
  closeDate: string;
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

interface WithHandlersProps {
  handleSubmit: (event: React.SyntheticEvent) => void;
}

export default compose<Props & DispatchProps & WithStateHandlersState, EnhancedProps>(
  connect(null, mapDispatchToProps),
  withStateHandlers<WithStateHandlersState, WithStateHandlersUpdaters, EnhancedProps>(
    ({ position }) => ({
      amount: position.amount,
      closeCommission: position.closeCommission === null ? '' : position.closeCommission,
      closeDate: position.closeDate === null ? formatDate(new Date()) : position.closeDate,
      closePrice: position.closePrice === null ? '' : position.closePrice,
      openCommission: position.openCommission,
      openDate: position.openDate,
      openPrice: position.openPrice,
      symbol: position.symbol,
    }),
    {
      handleAmountChange: () => (event) => {
        const amount = parseInt(event.target.value, 10);

        return {
          amount: amount > 0 ? amount : '',
        };
      },
      handleCloseCommissionChange: () => (event) => {
        const commission = parseFloat(event.target.value);

        return {
          closeCommission: commission >= 0 ? commission : '',
        };
      },
      handleCloseDateChange: () => (event) => {
        let date;

        try {
          date = formatDate(new Date(event.target.value));
        } catch (error) {
          //
        }

        if (!date) {
          date = formatDate(new Date());
        }

        return { closeDate: date };
      },
      handleClosePriceChange: () => (event) => {
        const price = parseFloat(event.target.value);

        return {
          closePrice: price >= 0 ? price : '',
        };
      },
      handleOpenCommissionChange: () => (event) => {
        const commission = parseFloat(event.target.value);

        return {
          openCommission: commission >= 0 ? commission : '',
        };
      },
      handleOpenDateChange: () => (event) => {
        let date;

        try {
          date = formatDate(new Date(event.target.value));
        } catch (error) {
          //
        }

        if (!date) {
          date = formatDate(new Date());
        }

        return { openDate: date };
      },
      handleOpenPriceChange: () => (event) => {
        const price = parseFloat(event.target.value);

        return {
          openPrice: price >= 0 ? price : '',
        };
      },
      handleSymbolChange: () => (event) => ({
        symbol: event.target.value.toUpperCase(),
      }),
    },
  ),
  withHandlers<EnhancedProps & DispatchProps & WithStateHandlersState & WithStateHandlersUpdaters, WithHandlersProps>({

    handleSubmit: ({
      amount, closeCommission, closeDate, closePrice, onClose, openCommission, openDate, openPrice, position, symbol,
      updatePosition,
    }) => (event: React.SyntheticEvent) => {
      event.preventDefault();

      if (amount === '' || openCommission === '' || openPrice === '' || symbol === '') {
        // TODO: Display the following error in UI.
        throw new Error('Invalid values');
      }

      updatePosition({
        ...position,
        amount,
        closeCommission: closeCommission === '' || closePrice === '' ? null : closeCommission,
        closeDate: closeCommission === '' || closePrice === '' ? null : closeDate,
        closePrice: closeCommission === '' || closePrice === '' ? null : closePrice,
        openCommission,
        openDate,
        openPrice,
        symbol,
      })
        .then(() => {
          if (onClose) {
            onClose();
          }
        });
    },

  }),
);
