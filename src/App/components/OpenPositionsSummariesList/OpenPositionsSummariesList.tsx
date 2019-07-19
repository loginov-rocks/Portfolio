import {
  List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText,
} from '@material-ui/core';
import * as React from 'react';

import * as C from 'Constants';
import Money from 'Shared/components/Money';
import Percent from 'Shared/components/Percent';
import Sorter from 'Shared/components/Sorter';
import StockLogo from 'Stocks/components/StockLogo';

import { OpenPositionsSummary } from '../../lib';

export interface Props {
  classes: { [key: string]: string };
  handleSorterKeyChange: (key: string) => void;
  handleSorterOrderChange: (order: 'asc' | 'desc') => void;
  sorterKey: string;
  sorterOrder: 'asc' | 'desc';
  summaries: OpenPositionsSummary[];
  totalDailyPL: number;
  totalDailyPLPercent: number;
  totalMarketPL: number;
  totalMarketPLPercent: number;
  totalMarketSum: number;
}

const OpenPositionsSummariesList: React.FunctionComponent<Props> = ({
  classes, handleSorterKeyChange, handleSorterOrderChange, summaries, sorterKey, sorterOrder, totalDailyPL,
  totalDailyPLPercent, totalMarketPL, totalMarketPLPercent, totalMarketSum,
}: Props) => (
  <React.Fragment>

    {/* TODO: Lift the following to the Home component */}
    <Money value={totalMarketSum} />
    <Money pl value={totalMarketPL} />
    <Percent pl value={totalMarketPLPercent} />
    <Money pl value={totalDailyPL} />
    <Percent pl value={totalDailyPLPercent} />

    <Sorter
      keys={C.OPEN_POSITIONS_SUMMARIES_LIST_SORTER_KEYS}
      onKeyChange={handleSorterKeyChange}
      onOrderChange={handleSorterOrderChange}
      sorterKey={sorterKey}
      sorterOrder={sorterOrder}
    />

    <List className={classes.list} dense disablePadding>
      {summaries.map(({
        amount, companyName, dailyPL, dailyPLPercent, marketPL, marketPLPercent, openPriceAverage, symbol,
      }) => (
        <ListItem key={symbol}>

          <ListItemIcon><StockLogo symbol={symbol} /></ListItemIcon>

          <ListItemText
            primary={companyName === null ? symbol : companyName}
            secondary={(
              <React.Fragment>
                <Money value={openPriceAverage} />
                {' x '}
                {amount}
              </React.Fragment>
            )}
          />

          {(sorterKey === 'dailyPL' || sorterKey === 'dailyPLPercent')
            ? (
              <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
                {dailyPL !== null && <Money highlighted={sorterKey === 'dailyPL'} pl value={dailyPL} />}
                <br />
                {dailyPLPercent !== null && (
                  <Percent highlighted={sorterKey === 'dailyPLPercent'} pl value={dailyPLPercent} />
                )}
              </ListItemSecondaryAction>
            ) : (
              <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
                {marketPL !== null && <Money highlighted={sorterKey === 'marketPL'} pl value={marketPL} />}
                <br />
                {marketPLPercent !== null && (
                  <Percent highlighted={sorterKey === 'marketPLPercent'} pl value={marketPLPercent} />
                )}
              </ListItemSecondaryAction>
            )}

        </ListItem>
      ))}
    </List>

  </React.Fragment>
);

export default OpenPositionsSummariesList;
