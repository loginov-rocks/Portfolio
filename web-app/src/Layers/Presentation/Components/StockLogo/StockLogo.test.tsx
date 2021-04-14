/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import classes from 'identity-obj-proxy';
import * as React from 'react';

import { StockLogo } from './StockLogo';

it('matches snapshot', () => {
  const wrapper = shallow(
    <StockLogo classes={classes} logo="https://example.com/stock/logo.png" logoProgress={false} symbol="AAPL" />,
  );

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot when loading', () => {
  const wrapper = shallow(
    <StockLogo classes={classes} logo={null} logoProgress symbol="AAPL" />,
  );

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot when logo is null', () => {
  const wrapper = shallow(
    <StockLogo classes={classes} logo={null} logoProgress={false} symbol="AAPL" />,
  );

  expect(wrapper).toMatchSnapshot();
});
