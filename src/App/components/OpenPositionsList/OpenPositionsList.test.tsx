import { shallow } from 'enzyme';
import classes from 'identity-obj-proxy';
import * as React from 'react';

import OpenPositionsList from './OpenPositionsList';

it('matches snapshot', () => {
  const wrapper = shallow(
    <OpenPositionsList
      classes={classes}
      handleSorterKeyChange={() => undefined}
      handleSorterOrderChange={() => undefined}
      sorterKey="openPrice"
      sorterOrder="asc"
      stockPositions={[]}
      totalDailyPL={10}
      totalDailyPLPercent={0.1}
      totalMarketPL={100}
      totalMarketPLPercent={1}
      totalMarketSum={1000}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
