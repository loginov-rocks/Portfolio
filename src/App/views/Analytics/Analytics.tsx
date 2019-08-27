import { Typography } from '@material-ui/core';
import * as React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

import Money from 'Shared/components/Money';
import Percent from 'Shared/components/Percent';
import Progress from 'Shared/components/Progress';
import getUniqueColor from 'Styles/getUniqueColor';

import { OpenPositionsSummary } from '../../lib';

export interface Props {
  classes: { [key: string]: string };
  positionsLoading: boolean;
  summaries: OpenPositionsSummary[];
  totalMarketSum: number;
}

const Analytics: React.FunctionComponent<Props> = ({
  classes, positionsLoading, summaries, totalMarketSum,
}: Props) => {
  if (positionsLoading || summaries.length === 0 || summaries[0].marketSum === null) {
    return (
      <div className={classes.root}>
        <Progress />
      </div>
    );
  }

  const maxShare = summaries[0].marketSum / totalMarketSum;

  const data = [];

  summaries.forEach(summary => {
    if (summary.marketSum === null) {
      return;
    }

    data.push({ value: summary.marketSum });
  });

  return (
    <div className={classes.root}>

      <div className={classes.chartWrapper}>
        <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="value" data={data} label innerRadius="70%">
              {data.map((entry, index) => (
                <Cell key={index} fill={getUniqueColor(summaries[index].symbol)} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div><Money value={totalMarketSum} /></div>

      <div className={classes.rowsWrapper}>
        {summaries.map(summary => {
          if (summary.marketSum === null) {
            return null;
          }

          const color = getUniqueColor(summary.symbol);
          const percent = summary.marketSum / totalMarketSum;
          const share = percent / maxShare * 100;

          // TODO: Extract share bar to Shared components.
          return (
            <div className={classes.row} key={summary.symbol}>
              <Typography className={classes.rowCompanyName} noWrap variant="body2">{summary.companyName}</Typography>
              <div className={classes.rowShare}>
                <div className={classes.shareBar} style={{ backgroundColor: color, width: `${share}%` }} />
              </div>
              <div className={classes.rowPercent}>
                <Percent value={percent} />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Analytics;
