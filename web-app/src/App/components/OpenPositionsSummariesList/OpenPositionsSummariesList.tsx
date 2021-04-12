import {
  List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText,
} from '@material-ui/core';
import * as React from 'react';

import * as C from 'Constants';
import { Money } from 'Layers/Presentation/Money';
import { Percent } from 'Layers/Presentation/Percent';
import { Sorter } from 'Layers/Presentation/Sorter';
import StockLogo from 'Stocks/components/StockLogo';

import { OpenPositionsSummary } from '../../lib';

export interface Props {
  classes: { [key: string]: string };
  handleSorterKeyChange: (key: string) => void;
  handleSorterOrderChange: (order: 'asc' | 'desc') => void;
  sorterKey: string;
  sorterOrder: 'asc' | 'desc';
  summaries: OpenPositionsSummary[];
}

const OpenPositionsSummariesList: React.FunctionComponent<Props> = ({
  classes, handleSorterKeyChange, handleSorterOrderChange, summaries, sorterKey, sorterOrder,
}: Props) => (
  <>

    <Sorter
      className={classes.sorter}
      keys={C.OPEN_POSITIONS_SUMMARIES_LIST_SORTER_KEYS}
      onKeyChange={handleSorterKeyChange}
      onOrderChange={handleSorterOrderChange}
      sorterKey={sorterKey}
      sorterOrder={sorterOrder}
    />

    <List className={classes.list} dense disablePadding>
      {summaries.map(({
        amount, companyName, dailyPL, dailyPLPercent, marketPL, marketPLPercent, marketPrice, marketSum,
        openPriceAverage, symbol,
      }) => (
        <ListItem key={symbol}>

          <ListItemIcon><StockLogo symbol={symbol} /></ListItemIcon>

          <ListItemText
            primary={companyName === null ? symbol : companyName}
            secondary={(
              sorterKey === 'marketSum' ? (
                marketSum !== null && <Money highlighted value={marketSum} />
              ) : (
                <>
                  <Money value={openPriceAverage} />
                  {marketPrice !== null && (
                    <>
                      {' \u2192 '}
                      <Money value={marketPrice} />
                    </>
                  )}
                  {' '}
                  x
                  {' '}
                  {amount}
                </>
              )
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

  </>
);

export default OpenPositionsSummariesList;
