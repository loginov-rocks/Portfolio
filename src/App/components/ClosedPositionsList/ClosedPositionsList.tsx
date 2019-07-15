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
  totalClosePL: number;
  totalClosePLPercent: number;
  totalCloseSum: number;
}

const ClosedPositionsList: React.FunctionComponent<Props> = ({
  classes, handleSorterKeyChange, handleSorterOrderChange, onPositionClick, stockPositions, sorterKey, sorterOrder,
  totalClosePL, totalClosePLPercent, totalCloseSum,
}: Props) => (
  <React.Fragment>

    <Money value={totalCloseSum} />
    <Money pl value={totalClosePL} />
    <Percent pl value={totalClosePLPercent} />

    <Sorter
      keys={C.CLOSED_POSITIONS_LIST_SORTER_KEYS}
      onKeyChange={handleSorterKeyChange}
      onOrderChange={handleSorterOrderChange}
      sorterKey={sorterKey}
      sorterOrder={sorterOrder}
    />

    <List className={classes.list} dense disablePadding>
      {stockPositions.map(({
        amount, closeDate, closePL, closePLAnnualPercent, closePLPercent, companyName, id, openDate, symbol,
      }) => (
        <ListItem button key={id} onClick={() => onPositionClick && onPositionClick(id)}>

          <ListItemIcon><StockLogo symbol={symbol} /></ListItemIcon>

          <ListItemText
            primary={companyName === null ? symbol : companyName}
            secondary={(
              <React.Fragment>
                {amount}
                {' @ '}
                {sorterKey === 'openDate' || closeDate === null
                  ? <PositionDate highlighted={sorterKey === 'openDate'} date={openDate} />
                  : <PositionDate highlighted={sorterKey === 'closeDate'} date={closeDate} />}
              </React.Fragment>
            )}
          />

          {sorterKey === 'closePLAnnualPercent'
            ? (
              <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
                {closePLAnnualPercent !== null && <Percent pl value={closePLAnnualPercent} />}
              </ListItemSecondaryAction>
            ) : (
              <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
                {closePL !== null && <Money highlighted={sorterKey === 'closePL'} pl value={closePL} />}
                <br />
                {closePLPercent !== null && (
                  <Percent highlighted={sorterKey === 'closePLPercent'} pl value={closePLPercent} />
                )}
              </ListItemSecondaryAction>
            )}

        </ListItem>
      ))}
    </List>

  </React.Fragment>
);

export default ClosedPositionsList;
