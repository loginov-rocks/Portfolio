import classNames from 'classnames';
import { Button, TextField } from '@material-ui/core';
import * as React from 'react';

import {
  PositionFormEnhancerInputProps, PositionFormEnhancerProps,
} from 'Layers/Behavior/Enhancers/PositionFormEnhancer/PositionFormEnhancer';

export interface PositionFormProps extends PositionFormEnhancerInputProps {
  backButton?: React.ReactNode;
  classes: { [key: string]: string };
}

type Props = PositionFormProps & PositionFormEnhancerProps;

export const PositionForm: React.FunctionComponent<Props> = ({
  amount, backButton, classes, closeCommission, closeDate, closePrice, handleAmountChange, handleCloseCommissionChange,
  handleCloseDateChange, handleClosePriceChange, handleOpenCommissionChange, handleOpenDateChange,
  handleOpenPriceChange, handleSubmit, handleSymbolChange, openCommission, openDate, openPrice, symbol,
}: Props) => (
  <form className={classes.root} onSubmit={handleSubmit}>

    <div className={classes.row}>
      <TextField
        fullWidth
        label="Symbol"
        onChange={handleSymbolChange}
        required
        type="text"
        value={symbol}
        variant="outlined"
      />
    </div>

    <div className={classes.row}>
      <TextField
        fullWidth
        inputProps={{ min: 1 }}
        label="Amount"
        onChange={handleAmountChange}
        required
        type="number"
        value={amount}
        variant="outlined"
      />
    </div>

    <div className={classes.row}>
      <TextField
        fullWidth
        inputProps={{ min: 0, step: 0.01 }}
        label="Open Price"
        onChange={handleOpenPriceChange}
        required
        type="number"
        value={openPrice}
        variant="outlined"
      />
    </div>

    <div className={classes.row}>
      <TextField
        fullWidth
        inputProps={{ min: 0, step: 0.01 }}
        label="Open Commission"
        onChange={handleOpenCommissionChange}
        required
        type="number"
        value={openCommission}
        variant="outlined"
      />
    </div>

    <div className={classes.row}>
      <TextField
        fullWidth
        label="Open Date"
        onChange={handleOpenDateChange}
        required
        type="date"
        value={openDate}
        variant="outlined"
      />
    </div>

    <div className={classes.row}>
      <TextField
        fullWidth
        inputProps={{ min: 0, step: 0.01 }}
        label="Close Price"
        onChange={handleClosePriceChange}
        type="number"
        value={closePrice}
        variant="outlined"
      />
    </div>

    <div className={classes.row}>
      <TextField
        fullWidth
        inputProps={{ min: 0, step: 0.01 }}
        label="Close Commission"
        onChange={handleCloseCommissionChange}
        type="number"
        value={closeCommission}
        variant="outlined"
      />
    </div>

    <div className={classes.row}>
      <TextField
        fullWidth
        label="Close Date"
        onChange={handleCloseDateChange}
        type="date"
        value={closeDate}
        variant="outlined"
      />
    </div>

    <div className={classNames(classes.row, backButton && classes.buttons)}>
      {backButton}
      <Button color="primary" variant="contained" type="submit">Update</Button>
    </div>

  </form>
);
