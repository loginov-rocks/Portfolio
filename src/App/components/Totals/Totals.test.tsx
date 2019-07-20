import { shallow } from 'enzyme';
import classes from 'identity-obj-proxy';
import * as React from 'react';

import Totals from './Totals';

it('matches snapshot', () => {
  const wrapper = shallow(
    <Totals
      classes={classes}
      totalClosePL={100}
      totalClosePLPercent={1}
      totalCloseSum={1000}
      totalDailyPL={10}
      totalDailyPLPercent={0.1}
      totalMarketPL={100}
      totalMarketPLPercent={1}
      totalMarketSum={1000}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot when showing closed', () => {
  const wrapper = shallow(
    <Totals
      classes={classes}
      showClosed
      totalClosePL={100}
      totalClosePLPercent={1}
      totalCloseSum={1000}
      totalDailyPL={10}
      totalDailyPLPercent={0.1}
      totalMarketPL={100}
      totalMarketPLPercent={1}
      totalMarketSum={1000}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
