import {
  IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, ListSubheader, Typography,
} from '@material-ui/core';
import {
  MonetizationOnOutlined, DeleteForeverOutlined, DeleteOutlined, EditOutlined,
} from '@material-ui/icons';
import * as React from 'react';

import { VibrantPalette } from 'Layers/Business/Services/FirebaseFunctionsService/VibrantPalette';
import { getVibrantColor } from 'Layers/Business/Services/FirebaseService/FirebaseService';
import { Money } from 'Layers/Presentation/Components/Money';
import { Percent } from 'Layers/Presentation/Components/Percent';
import { PositionDate } from 'Layers/Presentation/Components/PositionDate';
import { Progress } from 'Layers/Presentation/Components/Progress';
import { StockLogo } from 'Layers/Presentation/Components/StockLogo';

import { StockPosition } from '../../lib';

export interface Props {
  classes: { [key: string]: string };
  handleCloseClick: () => void;
  handleDeleteClick: () => void;
  handleUpdateClick: () => void;
  handleWantToDelete: () => void;
  positionLoading: boolean;
  stockPosition: StockPosition | null;
  vibrantPalette: VibrantPalette | null;
  wantToDelete: boolean;
}

const Position: React.FunctionComponent<Props> = ({
  classes, handleCloseClick, handleDeleteClick, handleUpdateClick, handleWantToDelete, positionLoading, stockPosition,
  vibrantPalette, wantToDelete,
}: Props) => (
  <>

    {!positionLoading && stockPosition && (
      <div className={classes.bar} style={{ backgroundColor: getVibrantColor(vibrantPalette, 'darkMuted') }}>

        <StockLogo className={classes.logo} size={48} symbol={stockPosition.symbol} />

        <Typography className={classes.companyName}>{stockPosition.companyName}</Typography>

        {stockPosition.closeDate === null && (
          <IconButton onClick={handleCloseClick}>
            <MonetizationOnOutlined />
          </IconButton>
        )}

        <IconButton onClick={handleUpdateClick}>
          <EditOutlined />
        </IconButton>

        {wantToDelete
          ? <IconButton onClick={handleDeleteClick}><DeleteForeverOutlined /></IconButton>
          : <IconButton onClick={handleWantToDelete}><DeleteOutlined /></IconButton>}

      </div>
    )}

    <div className={classes.root}>

      {positionLoading && <Progress />}

      {!positionLoading && stockPosition && (
        <List className={classes.list} disablePadding dense>

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
            <>

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

            </>
          )}

          {stockPosition.dailyPL !== null && stockPosition.dailyPLPercent !== null && (
            <>

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

            </>
          )}

          {stockPosition.marketPrice !== null && stockPosition.marketSum !== null
          && stockPosition.marketPL !== null && stockPosition.marketPLPercent !== null
          && stockPosition.marketPLAnnualPercent !== null && (
            <>

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

            </>
          )}

        </List>
      )}

    </div>

  </>
);

export default Position;
