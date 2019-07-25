import classNames from 'classnames';
import { Button, TextField } from '@material-ui/core';
import * as React from 'react';

// TODO: Refactor to universal form for Position control.

export interface Props {
  amount: number | '';
  backButton?: React.ReactNode;
  classes: { [key: string]: string };
  closeCommission: number | '';
  closeDate: string;
  closePrice: number | '';
  handleAmountChange: (event: React.SyntheticEvent) => void;
  handleCloseCommissionChange: (event: React.SyntheticEvent) => void;
  handleCloseDateChange: (event: React.SyntheticEvent) => void;
  handleClosePriceChange: (event: React.SyntheticEvent) => void;
  handleOpenCommissionChange: (event: React.SyntheticEvent) => void;
  handleOpenDateChange: (event: React.SyntheticEvent) => void;
  handleOpenPriceChange: (event: React.SyntheticEvent) => void;
  handleSubmit: (event: React.SyntheticEvent) => void;
  handleSymbolChange: (event: React.SyntheticEvent) => void;
  openCommission: number | '';
  openDate: string;
  openPrice: number | '';
  symbol: string;
}

const UpdatePositionForm: React.FunctionComponent<Props> = ({
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

export default UpdatePositionForm;
