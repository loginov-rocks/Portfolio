import {
  IconButton, Menu, MenuItem, Typography,
} from '@material-ui/core';
import { AccountBalanceWalletOutlined } from '@material-ui/icons';
import * as React from 'react';

import { TotalsEnhancerInputProps, TotalsEnhancerProps } from 'App/components/Totals/TotalsEnhancer';
import { Money } from 'Layers/Presentation/Components/Money';
import { Percent } from 'Layers/Presentation/Components/Percent';

export interface TotalsProps extends TotalsEnhancerInputProps {
  classes: { [key: string]: string };
  showClosed?: boolean;
}

type Props = TotalsProps & TotalsEnhancerProps;

export const Totals: React.FunctionComponent<Props> = ({
  anchor, availableCurrencies, changeCurrency, classes, currency, showClosed, totalClosePL,
  totalClosePLPercent, totalCloseSum, totalDailyPL, totalDailyPLPercent, totalMarketPL, totalMarketPLPercent,
  totalMarketSum, updateAnchor,
}: Props) => {
  const sum = showClosed ? totalCloseSum : totalMarketSum;

  const groups = showClosed ? [
    <div className={classes.group} key="closed">
      <Money pl value={totalClosePL} />
      <Percent pl value={totalClosePLPercent} />
    </div>,
  ] : [
    <div className={classes.group} key="daily">
      <Money pl value={totalDailyPL} />
      <Percent pl value={totalDailyPLPercent} />
    </div>,
    <div className={classes.group} key="market">
      <Money pl value={totalMarketPL} />
      <Percent pl value={totalMarketPLPercent} />
    </div>,
  ];

  return (
    <div className={classes.root}>

      <Typography className={classes.sum} variant="h5">
        <Money value={sum} />
      </Typography>

      <div className={classes.secondary}>{groups}</div>

      <IconButton className={classes.currencyButton} onClick={(event) => updateAnchor(event.currentTarget)}>
        <AccountBalanceWalletOutlined />
      </IconButton>

      <Menu anchorEl={anchor} onClose={() => updateAnchor(null)} open={Boolean(anchor)}>
        {availableCurrencies.map(({ key, label }) => (
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
