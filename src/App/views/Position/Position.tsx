import {
  IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, ListSubheader, Typography,
} from '@material-ui/core';
import { MonetizationOnOutlined, DeleteForeverOutlined, DeleteOutlined } from '@material-ui/icons';
import * as React from 'react';

import PositionDate from 'Portfolio/components/PositionDate';
import Money from 'Shared/components/Money';
import Percent from 'Shared/components/Percent';
import Progress from 'Shared/components/Progress';
import StockLogo from 'Stocks/components/StockLogo';

import { StockPosition } from '../../lib';

export interface Props {
  classes: { [key: string]: string };
  handleCloseClick: () => void;
  handleDeleteClick: () => void;
  handleWantToDelete: () => void;
  positionLoading: boolean;
  stockPosition: StockPosition | null;
  wantToDelete: boolean;
}

const Position: React.FunctionComponent<Props> = ({
  classes, handleCloseClick, handleDeleteClick, handleWantToDelete, positionLoading, stockPosition, wantToDelete,
}: Props) => (
  <React.Fragment>

    {!positionLoading && stockPosition && (
      <div className={classes.bar}>

        <StockLogo className={classes.logo} size={48} symbol={stockPosition.symbol} />

        {stockPosition.quote && (
          <Typography className={classes.companyName}>{stockPosition.quote.companyName}</Typography>
        )}

        {stockPosition.closeDate === null && (
          <IconButton onClick={handleCloseClick}>
            <MonetizationOnOutlined />
          </IconButton>
        )}

        {wantToDelete
          ? <IconButton onClick={handleDeleteClick}><DeleteForeverOutlined /></IconButton>
          : <IconButton onClick={handleWantToDelete}><DeleteOutlined /></IconButton>}

      </div>
    )}

    <div className={classes.root}>

      {positionLoading && <Progress />}

      {!positionLoading && stockPosition && (
        <List className={classes.list} dense>

          <ListItem>
            <ListItemText>Symbol</ListItemText>
            <ListItemSecondaryAction>{stockPosition.symbol}</ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText>Amount</ListItemText>
            <ListItemSecondaryAction>{stockPosition.amount}</ListItemSecondaryAction>
          </ListItem>

          <ListSubheader disableSticky>Open</ListSubheader>
          <ListItem>
            <ListItemText>Date</ListItemText>
            <ListItemSecondaryAction>
              <PositionDate date={stockPosition.openDate} />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText>Price</ListItemText>
            <ListItemSecondaryAction>
              <Money value={stockPosition.openPrice} />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText>Commission</ListItemText>
            <ListItemSecondaryAction>
              <Money value={stockPosition.openCommission} />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText>Sum</ListItemText>
            <ListItemSecondaryAction>
              <Money value={stockPosition.openSum} />
            </ListItemSecondaryAction>
          </ListItem>

          {stockPosition.closeDate !== null && stockPosition.closeCommission !== null
          && stockPosition.closePrice !== null && stockPosition.closeSum !== null && stockPosition.closePL !== null
          && stockPosition.closePLPercent !== null && stockPosition.closePLAnnualPercent !== null && (
            <React.Fragment>

              <ListSubheader disableSticky>Close</ListSubheader>
              <ListItem>
                <ListItemText>Date</ListItemText>
                <ListItemSecondaryAction>
                  <PositionDate date={stockPosition.closeDate} />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText>Price</ListItemText>
                <ListItemSecondaryAction>
                  <Money value={stockPosition.closePrice} />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText>Commission</ListItemText>
                <ListItemSecondaryAction>
                  <Money value={stockPosition.closeCommission} />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText>Sum</ListItemText>
                <ListItemSecondaryAction>
                  <Money value={stockPosition.closeSum} />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText>PL</ListItemText>
                <ListItemSecondaryAction>
                  <Money pl value={stockPosition.closePL} />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText>PL%</ListItemText>
                <ListItemSecondaryAction>
                  <Percent pl value={stockPosition.closePLPercent} />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText>Annual PL%</ListItemText>
                <ListItemSecondaryAction>
                  <Percent pl value={stockPosition.closePLAnnualPercent} />
                </ListItemSecondaryAction>
              </ListItem>

            </React.Fragment>
          )}

          {stockPosition.dailyPL !== null && stockPosition.dailyPLPercent !== null && (
            <React.Fragment>

              <ListSubheader disableSticky>Daily</ListSubheader>
              <ListItem>
                <ListItemText>PL</ListItemText>
                <ListItemSecondaryAction>
                  <Money pl value={stockPosition.dailyPL} />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText>PL%</ListItemText>
                <ListItemSecondaryAction>
                  <Percent pl value={stockPosition.dailyPLPercent} />
                </ListItemSecondaryAction>
              </ListItem>

            </React.Fragment>
          )}

          {stockPosition.marketPrice !== null && stockPosition.marketSum !== null
          && stockPosition.marketPL !== null && stockPosition.marketPLPercent !== null
          && stockPosition.marketPLAnnualPercent !== null && (
            <React.Fragment>

              <ListSubheader disableSticky>Market</ListSubheader>
              <ListItem>
                <ListItemText>Price</ListItemText>
                <ListItemSecondaryAction>
                  <Money value={stockPosition.marketPrice} />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText>Sum</ListItemText>
                <ListItemSecondaryAction>
                  <Money value={stockPosition.marketSum} />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText>PL</ListItemText>
                <ListItemSecondaryAction>
                  <Money pl value={stockPosition.marketPL} />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText>PL%</ListItemText>
                <ListItemSecondaryAction>
                  <Percent pl value={stockPosition.marketPLPercent} />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText>Annual PL%</ListItemText>
                <ListItemSecondaryAction>
                  <Percent pl value={stockPosition.marketPLAnnualPercent} />
                </ListItemSecondaryAction>
              </ListItem>

            </React.Fragment>
          )}

        </List>
      )}

    </div>

  </React.Fragment>
);

export default Position;
