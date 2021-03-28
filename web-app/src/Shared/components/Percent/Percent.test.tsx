/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import classes from 'identity-obj-proxy';
import * as React from 'react';

import Percent from './Percent';

it('matches snapshot', () => {
  const wrapper = shallow(<Percent classes={classes} value={1.23} />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot when highlighted', () => {
  const wrapper = shallow(<Percent classes={classes} highlighted value={1.23} />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot with PL when neutral', () => {
  const wrapper = shallow(<Percent classes={classes} pl value={0} />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot with PL when profit', () => {
  const wrapper = shallow(<Percent classes={classes} pl value={0.1} />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot with PL when loss', () => {
  const wrapper = shallow(<Percent classes={classes} pl value={-0.1} />);

  expect(wrapper).toMatchSnapshot();
});
