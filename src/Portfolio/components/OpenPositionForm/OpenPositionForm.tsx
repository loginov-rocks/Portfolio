import { Button, TextField } from '@material-ui/core';
import * as React from 'react';

export interface Props {
  amount: number;
  classes: { [key: string]: string };
  commission: number;
  date: string;
  handleAmountChange: (event: React.SyntheticEvent) => void;
  handleCommissionChange: (event: React.SyntheticEvent) => void;
  handleDateChange: (event: React.SyntheticEvent) => void;
  handlePriceChange: (event: React.SyntheticEvent) => void;
  handleSymbolChange: (event: React.SyntheticEvent) => void;
  handleSubmit: (event: React.SyntheticEvent) => void;
  price: number;
  symbol: string;
}

const OpenPositionForm: React.FunctionComponent<Props> = ({
  amount, classes, commission, date, handleAmountChange, handleCommissionChange, handleDateChange, handlePriceChange,
  handleSymbolChange, handleSubmit, price, symbol,
}: Props) => (
  <form className={classes.root} onSubmit={handleSubmit}>

    <div className={classes.row}>
      <TextField
        fullWidth
        label="Symbol"
        onChange={handleSymbolChange}
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
        type="number"
        value={amount}
        variant="outlined"
      />
    </div>

    <div className={classes.row}>
      <TextField
        fullWidth
        inputProps={{ min: 0, step: 0.01 }}
        label="Price"
        onChange={handlePriceChange}
        type="number"
        value={price}
        variant="outlined"
      />
    </div>

    <div className={classes.row}>
      <TextField
        fullWidth
        inputProps={{ min: 0, step: 0.01 }}
        label="Commission"
        onChange={handleCommissionChange}
        type="number"
        value={commission}
        variant="outlined"
      />
    </div>

    <div className={classes.row}>
      <TextField
        fullWidth
        label="Date"
        onChange={handleDateChange}
        type="date"
        value={date}
        variant="outlined"
      />
    </div>

    <div className={classes.row}>
      <Button color="primary" variant="contained" type="submit">Open</Button>
    </div>

  </form>
);

export default OpenPositionForm;
