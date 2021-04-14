import { Tab, Tabs } from '@material-ui/core';
import * as React from 'react';

import { Progress } from 'Layers/Presentation/Components/Progress';

import ClosedPositionsList from '../../components/ClosedPositionsList';
import OpenPositionsList from '../../components/OpenPositionsList';
import OpenPositionsSummariesList from '../../components/OpenPositionsSummariesList';
import Totals from '../../components/Totals';
import { StockPosition } from '../../lib';

export interface Props {
  classes: { [key: string]: string };
  handlePositionClick: (positionId: string) => void;
  handleTabChange: (tab: 'closed' | 'open' | 'summary') => void;
  positionsLoading: boolean;
  stockPositions: StockPosition[];
  tab: 'closed' | 'open' | 'summary';
}

const Home: React.FunctionComponent<Props> = ({
  classes, handlePositionClick, handleTabChange, positionsLoading, stockPositions, tab,
}: Props) => (
  <>

    {!positionsLoading && (
      <div className={classes.bar}>

        <Totals showClosed={tab === 'closed'} stockPositions={stockPositions} />

        <Tabs
          indicatorColor="primary"
          onChange={(event, newTab) => handleTabChange(newTab)}
          value={tab}
          variant="fullWidth"
        >
          <Tab label="Summary" value="summary" />
          <Tab label="Open" value="open" />
          <Tab label="Closed" value="closed" />
        </Tabs>

      </div>
    )}

    <div className={classes.root}>
      {positionsLoading ? <Progress /> : (
        <>
          {tab === 'closed' && (
            <ClosedPositionsList onPositionClick={handlePositionClick} stockPositions={stockPositions} />
          )}
          {tab === 'open' && (
            <OpenPositionsList onPositionClick={handlePositionClick} stockPositions={stockPositions} />
          )}
          {tab === 'summary' && (
            <OpenPositionsSummariesList stockPositions={stockPositions} />
          )}
        </>
      )}
    </div>

  </>
);

export default Home;
