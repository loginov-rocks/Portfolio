import {
  IconButton, Menu, MenuItem, Typography,
} from '@material-ui/core';
import { AccountBalanceWalletOutlined } from '@material-ui/icons';
import * as React from 'react';

import * as C from 'Constants';
// TODO: Should be unnecessary.
import {
  ChangeCurrencyAction,
} from 'Layers/Application/ActionCreators/CurrenciesActionCreators/CurrenciesActionCreators';
import { Money } from 'Layers/Presentation/Components/Money';
import { Percent } from 'Layers/Presentation/Components/Percent';

export interface Props {
  anchor: HTMLElement | null;
  changeCurrency: ChangeCurrencyAction;
  classes: { [key: string]: string };
  currency: string;
  currencyMultiplier: number | null;
  showClosed?: boolean;
  totalClosePL: number;
  totalClosePLPercent: number;
  totalCloseSum: number;
  totalDailyPL: number;
  totalDailyPLPercent: number;
  totalMarketPL: number;
  totalMarketPLPercent: number;
  totalMarketSum: number;
  updateAnchor: (anchor: HTMLElement | null) => void;
}

const Totals: React.FunctionComponent<Props> = ({
  anchor, changeCurrency, classes, currency, currencyMultiplier, showClosed, totalClosePL, totalClosePLPercent,
  totalCloseSum, totalDailyPL, totalDailyPLPercent, totalMarketPL, totalMarketPLPercent, totalMarketSum, updateAnchor,
}: Props) => {
  const sum = showClosed ? totalCloseSum : totalMarketSum;

  const groups = showClosed ? [
    <div className={classes.group} key="closed">
      <Money currency={currency} multiplier={currencyMultiplier} pl value={totalClosePL} />
      <Percent pl value={totalClosePLPercent} />
    </div>,
  ] : [
    <div className={classes.group} key="daily">
      <Money currency={currency} multiplier={currencyMultiplier} pl value={totalDailyPL} />
      <Percent pl value={totalDailyPLPercent} />
    </div>,
    <div className={classes.group} key="market">
      <Money currency={currency} multiplier={currencyMultiplier} pl value={totalMarketPL} />
      <Percent pl value={totalMarketPLPercent} />
    </div>,
  ];

  return (
    <div className={classes.root}>

      <Typography className={classes.sum} variant="h5">
        <Money currency={currency} multiplier={currencyMultiplier} value={sum} />
      </Typography>

      <div className={classes.secondary}>{groups}</div>

      <IconButton className={classes.currencyButton} onClick={(event) => updateAnchor(event.currentTarget)}>
        <AccountBalanceWalletOutlined />
      </IconButton>

      <Menu anchorEl={anchor} onClose={() => updateAnchor(null)} open={Boolean(anchor)}>
        {C.AVAILABLE_CURRENCIES.map(({ key, label }) => (
          <MenuItem
            disabled={key === currency}
            key={key}
            onClick={() => {
              changeCurrency(key);
              updateAnchor(null);
            }}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>

    </div>
  );
};

export default Totals;
