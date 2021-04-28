/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import classes from 'identity-obj-proxy';
import * as React from 'react';

import { Money } from './Money';

it('matches snapshot', () => {
  const wrapper = shallow(
    <Money
      availableCurrencies={[]}
      classes={classes}
      changeCurrency={() => undefined}
      currency="USD"
      currencyMultiplier={1}
      fetchRates={() => undefined}
      initialize={() => undefined}
      value={12.3}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot when highlighted', () => {
  const wrapper = shallow(
    <Money
      availableCurrencies={[]}
      classes={classes}
      changeCurrency={() => undefined}
      currency="USD"
      currencyMultiplier={1}
      fetchRates={() => undefined}
      highlighted
      initialize={() => undefined}
      value={12.3}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot with PL when neutral', () => {
  const wrapper = shallow(
    <Money
      availableCurrencies={[]}
      classes={classes}
      changeCurrency={() => undefined}
      currency="USD"
      currencyMultiplier={1}
      fetchRates={() => undefined}
      initialize={() => undefined}
      pl
      value={0}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot with PL when profit', () => {
  const wrapper = shallow(
    <Money
      availableCurrencies={[]}
      classes={classes}
      changeCurrency={() => undefined}
      currency="USD"
      currencyMultiplier={1}
      fetchRates={() => undefined}
      initialize={() => undefined}
      pl
      value={10}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot with PL when loss', () => {
  const wrapper = shallow(
    <Money
      availableCurrencies={[]}
      classes={classes}
      changeCurrency={() => undefined}
      currency="USD"
      currencyMultiplier={1}
      fetchRates={() => undefined}
      initialize={() => undefined}
      pl
      value={-10}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
