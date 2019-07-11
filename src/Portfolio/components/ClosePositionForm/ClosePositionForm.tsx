import { Button, TextField } from '@material-ui/core';
import * as React from 'react';

export interface Props {
  classes: { [key: string]: string };
  commission: number;
  date: string;
  handleCommissionChange: (event: React.SyntheticEvent) => void;
  handleDateChange: (event: React.SyntheticEvent) => void;
  handlePriceChange: (event: React.SyntheticEvent) => void;
  handleSubmit: (event: React.SyntheticEvent) => void;
  price: number;
}

const ClosePositionForm: React.FunctionComponent<Props> = ({
  classes, commission, date, handleCommissionChange, handleDateChange, handlePriceChange, handleSubmit, price,
}: Props) => (
  <form className={classes.root} onSubmit={handleSubmit}>

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
      <Button color="primary" variant="contained" type="submit">Close</Button>
    </div>

  </form>
);

export default ClosePositionForm;
