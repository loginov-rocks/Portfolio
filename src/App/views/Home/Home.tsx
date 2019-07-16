import { Tab, Tabs } from '@material-ui/core';
import * as React from 'react';

import { Position } from 'Portfolio/lib';
import Progress from 'Shared/components/Progress';

import ClosedPositionsList from '../../components/ClosedPositionsList';
import OpenPositionsList from '../../components/OpenPositionsList';
import OpenPositionsSummariesList from '../../components/OpenPositionsSummariesList';

export interface Props {
  classes: { [key: string]: string };
  handlePositionClick: (positionId: string) => void;
  handleTabChange: (tab: 'closed' | 'open' | 'summary') => void;
  positions: Position[];
  positionsLoading: boolean;
  tab: 'closed' | 'open' | 'summary';
}

const Home: React.FunctionComponent<Props> = ({
  classes, handlePositionClick, handleTabChange, positions, positionsLoading, tab,
}: Props) => (
  <React.Fragment>

    {!positionsLoading && (
      <div className={classes.bar}>

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
      {positionsLoading
        ? <Progress />
        : (
          <React.Fragment>
            {tab === 'closed' && <ClosedPositionsList onPositionClick={handlePositionClick} positions={positions} />}
            {tab === 'open' && <OpenPositionsList onPositionClick={handlePositionClick} positions={positions} />}
            {tab === 'summary' && <OpenPositionsSummariesList positions={positions} />}
          </React.Fragment>
        )}
    </div>

  </React.Fragment>
);

export default Home;
