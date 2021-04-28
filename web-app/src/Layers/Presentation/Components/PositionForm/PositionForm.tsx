import classNames from 'classnames';
import { Button, TextField } from '@material-ui/core';
import * as React from 'react';

import { PositionFormData } from 'Layers/Behavior/Enhancers/PositionFormEnhancer/PositionFormData';
import {
  PositionFormEnhancerInputProps, PositionFormEnhancerProps,
} from 'Layers/Behavior/Enhancers/PositionFormEnhancer/PositionFormEnhancer';

export interface PositionFormProps extends PositionFormEnhancerInputProps {
  cancelButtonTitle?: string;
  classes: { [key: string]: string };
  displayedFields: Array<keyof PositionFormData>;
  onCancelButtonClick?: () => void;
  requiredFields: Array<keyof PositionFormData>;
  submitButtonTitle: string;
}

type Props = PositionFormProps & PositionFormEnhancerProps;

export const PositionForm: React.FunctionComponent<Props> = ({
  amount, cancelButtonTitle, classes, closeCommission, closeDate, closePrice, displayedFields, handleAmountChange,
  handleCloseCommissionChange, handleCloseDateChange, handleClosePriceChange, handleOpenCommissionChange,
  handleOpenDateChange, handleOpenPriceChange, handleSubmit, handleSymbolChange, onCancelButtonClick, openCommission,
  openDate, openPrice, requiredFields, submitButtonTitle, symbol,
}: Props) => (
  <form className={classes.root} onSubmit={handleSubmit}>

    {displayedFields.includes('symbol') && (
      <div className={classes.row}>
        <TextField
          fullWidth
          label="Symbol"
          onChange={handleSymbolChange}
          required={requiredFields.includes('symbol')}
          type="text"
          value={symbol}
          variant="outlined"
        />
      </div>
    )}

    {displayedFields.includes('amount') && (
      <div className={classes.row}>
        <TextField
          fullWidth
          inputProps={{ min: 1 }}
          label="Amount"
          onChange={handleAmountChange}
          required={requiredFields.includes('amount')}
          type="number"
          value={amount}
          variant="outlined"
        />
      </div>
    )}

    {displayedFields.includes('openPrice') && (
      <div className={classes.row}>
        <TextField
          fullWidth
          inputProps={{ min: 0, step: 0.01 }}
          label="Open Price"
          onChange={handleOpenPriceChange}
          required={requiredFields.includes('openPrice')}
          type="number"
          value={openPrice}
          variant="outlined"
        />
      </div>
    )}

    {displayedFields.includes('openCommission') && (
      <div className={classes.row}>
        <TextField
          fullWidth
          inputProps={{ min: 0, step: 0.01 }}
          label="Open Commission"
          onChange={handleOpenCommissionChange}
          required={requiredFields.includes('openCommission')}
          type="number"
          value={openCommission}
          variant="outlined"
        />
      </div>
    )}

    {displayedFields.includes('openDate') && (
      <div className={classes.row}>
        <TextField
          fullWidth
          label="Open Date"
          onChange={handleOpenDateChange}
          required={requiredFields.includes('openDate')}
          type="date"
          value={openDate}
          variant="outlined"
        />
      </div>
    )}

    {displayedFields.includes('closePrice') && (
      <div className={classes.row}>
        <TextField
          fullWidth
          inputProps={{ min: 0, step: 0.01 }}
          label="Close Price"
          onChange={handleClosePriceChange}
          required={requiredFields.includes('closePrice')}
          type="number"
          value={closePrice}
          variant="outlined"
        />
      </div>
    )}

    {displayedFields.includes('closeCommission') && (
      <div className={classes.row}>
        <TextField
          fullWidth
          inputProps={{ min: 0, step: 0.01 }}
          label="Close Commission"
          onChange={handleCloseCommissionChange}
          required={requiredFields.includes('closeCommission')}
          type="number"
          value={closeCommission}
          variant="outlined"
        />
      </div>
    )}

    {displayedFields.includes('closeDate') && (
      <div className={classes.row}>
        <TextField
          fullWidth
          label="Close Date"
          onChange={handleCloseDateChange}
          required={requiredFields.includes('closeDate')}
          type="date"
          value={closeDate}
          variant="outlined"
        />
      </div>
    )}

    <div className={classNames(classes.row, cancelButtonTitle && onCancelButtonClick && classes.buttons)}>
      {cancelButtonTitle && onCancelButtonClick && (
        <Button color="primary" onClick={onCancelButtonClick}>{cancelButtonTitle}</Button>
      )}
      <Button color="primary" variant="contained" type="submit">{submitButtonTitle}</Button>
    </div>

  </form>
);
