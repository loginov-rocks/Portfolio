import {
  List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText,
} from '@material-ui/core';
import * as React from 'react';

import * as C from 'Constants';
import { Money } from 'Layers/Presentation/Components/Money';
import { Percent } from 'Layers/Presentation/Components/Percent';
import { PositionDate } from 'Layers/Presentation/Components/PositionDate';
import { Sorter } from 'Layers/Presentation/Components/Sorter';
import { StockLogo } from 'Layers/Presentation/Components/StockLogo';

import { StockPosition } from '../../lib';

export interface Props {
  classes: { [key: string]: string };
  handleSorterKeyChange: (key: string) => void;
  handleSorterOrderChange: (order: 'asc' | 'desc') => void;
  onPositionClick?: (positionId: string) => void;
  sorterKey: string;
  sorterOrder: 'asc' | 'desc';
  stockPositions: StockPosition[];
}

const OpenPositionsList: React.FunctionComponent<Props> = ({
  classes, handleSorterKeyChange, handleSorterOrderChange, onPositionClick, stockPositions, sorterKey, sorterOrder,
}: Props) => (
  <>

    <Sorter
      className={classes.sorter}
      keys={C.OPEN_POSITIONS_LIST_SORTER_KEYS}
      onKeyChange={handleSorterKeyChange}
      onOrderChange={handleSorterOrderChange}
      sorterKey={sorterKey}
      sorterOrder={sorterOrder}
    />

    <List className={classes.list} dense disablePadding>
      {stockPositions.map(({
        amount, companyName, dailyPL, dailyPLPercent, id, marketPL, marketPLAnnualPercent, marketPLPercent, openDate,
        symbol,
      }) => (
        <ListItem button key={id} onClick={() => onPositionClick && onPositionClick(id)}>

          <ListItemIcon><StockLogo symbol={symbol} /></ListItemIcon>

          <ListItemText
            primary={companyName === null ? symbol : companyName}
            secondary={(
              <>
                {amount}
                {' '}
                @
                {' '}
                <PositionDate highlighted={sorterKey === 'openDate'} date={openDate} />
              </>
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

  </>
);

export default OpenPositionsList;
