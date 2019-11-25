/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import classes from 'identity-obj-proxy';
import * as React from 'react';

import Analytics from './Analytics';

it('matches snapshot', () => {
  const wrapper = shallow(
    <Analytics
      classes={classes}
      positionsLoading={false}
      summaries={[]}
      totalMarketSum={1000}
      vibrantPalettesBySymbols={{}}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot when positions are loading', () => {
  const wrapper = shallow(
    <Analytics
      classes={classes}
      positionsLoading
      summaries={[]}
      totalMarketSum={1000}
      vibrantPalettesBySymbols={{}}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
