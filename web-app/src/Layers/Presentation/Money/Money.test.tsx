/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import classes from 'identity-obj-proxy';
import * as React from 'react';

import { Money } from './Money';

it('matches snapshot', () => {
  const wrapper = shallow(<Money classes={classes} value={12.3} />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot using non default currency', () => {
  const wrapper = shallow(<Money classes={classes} currency="RUB" multiplier={63.1532265282} value={12.3} />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot when highlighted', () => {
  const wrapper = shallow(<Money classes={classes} highlighted value={12.3} />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot with PL when neutral', () => {
  const wrapper = shallow(<Money classes={classes} pl value={0} />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot with PL when profit', () => {
  const wrapper = shallow(<Money classes={classes} pl value={10} />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot with PL when loss', () => {
  const wrapper = shallow(<Money classes={classes} pl value={-10} />);

  expect(wrapper).toMatchSnapshot();
});
