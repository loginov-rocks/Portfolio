import { Typography } from '@material-ui/core';
import * as React from 'react';
import {
  Cell, Pie, PieChart, ResponsiveContainer,
} from 'recharts';

import { getVibrantColor } from 'Firebase/lib';
import VibrantPalette from 'Firebase/lib/Functions/VibrantPalette';
import { Percent } from 'Layers/Presentation/Percent';
import { Progress } from 'Layers/Presentation/Progress';

import { OpenPositionsSummary } from '../../lib';

export interface Props {
  classes: { [key: string]: string };
  positionsLoading: boolean;
  summaries: OpenPositionsSummary[];
  totalMarketSum: number;
  vibrantPalettesBySymbols: { [key: string]: VibrantPalette | null };
}

const Analytics: React.FunctionComponent<Props> = ({
  classes, positionsLoading, summaries, totalMarketSum, vibrantPalettesBySymbols,
}: Props) => {
  if (positionsLoading || summaries.length === 0 || summaries[0].marketSum === null) {
    return (
      <div className={classes.root}>
        <Progress />
      </div>
    );
  }

  const maxShare = summaries[0].marketSum / totalMarketSum;
  const data: { value: number }[] = [];

  summaries.forEach((summary) => {
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
            <Pie
              dataKey="value"
              data={data}
              endAngle={-270}
              innerRadius="70%"
              isAnimationActive={false}
              startAngle={90}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  fill={getVibrantColor(vibrantPalettesBySymbols[summaries[index].symbol])}
                  key={index} // eslint-disable-line react/no-array-index-key
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className={classes.rowsWrapper}>
        {summaries.map((summary) => {
          if (summary.marketSum === null) {
            return null;
          }

          const color = getVibrantColor(vibrantPalettesBySymbols[summary.symbol]);
          const percent = summary.marketSum / totalMarketSum;
          const share = (percent / maxShare) * 100;

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
