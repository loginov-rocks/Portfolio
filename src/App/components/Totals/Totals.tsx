import { Typography } from '@material-ui/core';
import * as React from 'react';

import Money from 'Shared/components/Money';
import Percent from 'Shared/components/Percent';

export interface Props {
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
}

const Totals: React.FunctionComponent<Props> = ({
  classes, currency, currencyMultiplier, showClosed, totalClosePL, totalClosePLPercent, totalCloseSum, totalDailyPL,
  totalDailyPLPercent, totalMarketPL, totalMarketPLPercent, totalMarketSum,
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
      <div className={classes.secondary}>
        {groups}
      </div>
    </div>
  );
};

export default Totals;
