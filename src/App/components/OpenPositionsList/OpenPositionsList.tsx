import {
  List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText,
} from '@material-ui/core';
import * as React from 'react';

import * as C from 'Constants';
import PositionDate from 'Portfolio/components/PositionDate';
import Money from 'Shared/components/Money';
import Percent from 'Shared/components/Percent';
import Sorter from 'Shared/components/Sorter';
import StockLogo from 'Stocks/components/StockLogo';

import { StockPosition } from '../../lib';

// TODO: Tests.

export interface Props {
  classes: { [key: string]: string };
  handleSorterKeyChange: (key: string) => void;
  handleSorterOrderChange: (order: 'asc' | 'desc') => void;
  onPositionClick?: (positionId: string) => void;
  sorterKey: string;
  sorterOrder: 'asc' | 'desc';
  stockPositions: StockPosition[];
  totalDailyPL: number;
  totalDailyPLPercent: number;
  totalMarketPL: number;
  totalMarketPLPercent: number;
  totalMarketSum: number;
}

const OpenPositionsList: React.FunctionComponent<Props> = ({
  classes, handleSorterKeyChange, handleSorterOrderChange, onPositionClick, stockPositions, sorterKey, sorterOrder,
  totalDailyPL, totalDailyPLPercent, totalMarketPL, totalMarketPLPercent, totalMarketSum,
}: Props) => (
  <React.Fragment>

    <Money value={totalMarketSum} />
    <Money pl value={totalMarketPL} />
    <Percent pl value={totalMarketPLPercent} />
    <Money pl value={totalDailyPL} />
    <Percent pl value={totalDailyPLPercent} />

    <Sorter
      keys={C.OPEN_POSITIONS_LIST_SORTER_KEYS}
      onKeyChange={handleSorterKeyChange}
      onOrderChange={handleSorterOrderChange}
      sorterKey={sorterKey}
      sorterOrder={sorterOrder}
    />

    <List dense className={classes.list}>
      {stockPositions.map(({
        amount, companyName, dailyPL, dailyPLPercent, id, marketPL, marketPLAnnualPercent, marketPLPercent, openDate,
        symbol,
      }) => (
        <ListItem button key={id} onClick={() => onPositionClick && onPositionClick(id)}>

          <ListItemIcon><StockLogo symbol={symbol} /></ListItemIcon>

          <ListItemText
            primary={companyName === null ? symbol : companyName}
            secondary={(
              <React.Fragment>
                {amount}
                {' @ '}
                <PositionDate highlighted={sorterKey === 'openDate'} date={openDate} />
              </React.Fragment>
            )}
          />

          {(sorterKey === 'dailyPL' || sorterKey === 'dailyPLPercent') && (
            <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
              {dailyPL !== null && <Money highlighted={sorterKey === 'dailyPL'} pl value={dailyPL} />}
              <br />
              {dailyPLPercent !== null && (
                <Percent highlighted={sorterKey === 'dailyPLPercent'} pl value={dailyPLPercent} />
              )}
            </ListItemSecondaryAction>
          )}

          {sorterKey === 'marketPLAnnualPercent' && (
            <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
              {marketPLAnnualPercent !== null && <Percent pl value={marketPLAnnualPercent} />}
            </ListItemSecondaryAction>
          )}

          {sorterKey !== 'dailyPL' && sorterKey !== 'dailyPLPercent' && sorterKey !== 'marketPLAnnualPercent' && (
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

export default OpenPositionsList;
