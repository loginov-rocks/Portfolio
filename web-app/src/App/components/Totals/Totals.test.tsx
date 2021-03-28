/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import classes from 'identity-obj-proxy';
import * as React from 'react';

import Totals from './Totals';

it('matches snapshot', () => {
  const wrapper = shallow(
    <Totals
      anchor={null}
      changeCurrency={() => undefined}
      classes={classes}
      currency="USD"
      currencyMultiplier={1}
      totalClosePL={100}
      totalClosePLPercent={1}
      totalCloseSum={1000}
      totalDailyPL={10}
      totalDailyPLPercent={0.1}
      totalMarketPL={100}
      totalMarketPLPercent={1}
      totalMarketSum={1000}
      updateAnchor={() => undefined}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot when showing closed', () => {
  const wrapper = shallow(
    <Totals
      anchor={null}
      changeCurrency={() => undefined}
      classes={classes}
      currency="USD"
      currencyMultiplier={1}
      showClosed
      totalClosePL={100}
      totalClosePLPercent={1}
      totalCloseSum={1000}
      totalDailyPL={10}
      totalDailyPLPercent={0.1}
      totalMarketPL={100}
      totalMarketPLPercent={1}
      totalMarketSum={1000}
      updateAnchor={() => undefined}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
