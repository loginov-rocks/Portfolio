import { Typography } from '@material-ui/core';
import * as React from 'react';

import Money from 'Shared/components/Money';
import Percent from 'Shared/components/Percent';

export interface Props {
  classes: { [key: string]: string };
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
  classes, showClosed, totalClosePL, totalClosePLPercent, totalCloseSum, totalDailyPL, totalDailyPLPercent,
  totalMarketPL, totalMarketPLPercent, totalMarketSum,
}: Props) => (
  <div className={classes.root}>
    {showClosed ? (
      <React.Fragment>
        <Typography className={classes.sum} variant="h5"><Money value={totalCloseSum} /></Typography>
        <div className={classes.secondary}>
          <div className={classes.group}>
            <Money pl value={totalClosePL} />
            <Percent pl value={totalClosePLPercent} />
          </div>
        </div>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Typography className={classes.sum} variant="h5"><Money value={totalMarketSum} /></Typography>
        <div className={classes.secondary}>
          <div className={classes.group}>
            <Money pl value={totalMarketPL} />
            <Percent pl value={totalMarketPLPercent} />
          </div>
          <div className={classes.group}>
            <Money pl value={totalDailyPL} />
            <Percent pl value={totalDailyPLPercent} />
          </div>
        </div>
      </React.Fragment>
    )}
  </div>
);

export default Totals;
