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
      <div>
        <Money value={totalCloseSum} />
        <Money pl value={totalClosePL} />
        <Percent pl value={totalClosePLPercent} />
      </div>
    ) : (
      <div>
        <Money value={totalMarketSum} />
        <Money pl value={totalMarketPL} />
        <Percent pl value={totalMarketPLPercent} />
        <Money pl value={totalDailyPL} />
        <Percent pl value={totalDailyPLPercent} />
      </div>
    )}
  </div>
);

export default Totals;
