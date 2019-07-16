import { shallow } from 'enzyme';
import classes from 'identity-obj-proxy';
import * as React from 'react';

import OpenPositionsSummariesList from './OpenPositionsSummariesList';

it('matches snapshot', () => {
  const wrapper = shallow(
    <OpenPositionsSummariesList
      classes={classes}
      handleSorterKeyChange={() => undefined}
      handleSorterOrderChange={() => undefined}
      sorterKey="companyName"
      sorterOrder="asc"
      summaries={[]}
      totalDailyPL={10}
      totalDailyPLPercent={0.1}
      totalMarketPL={100}
      totalMarketPLPercent={1}
      totalMarketSum={1000}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
