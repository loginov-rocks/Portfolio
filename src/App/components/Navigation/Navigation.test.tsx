/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import classes from 'identity-obj-proxy';
import * as React from 'react';

import Navigation from './Navigation';
import * as R from '../../routes';

it('matches snapshot if on the home page', () => {
  const wrapper = shallow(<Navigation classes={classes} navigate={() => undefined} route={R.HOME} />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot if on the close position page', () => {
  const wrapper = shallow(<Navigation classes={classes} navigate={() => undefined} route={R.CLOSE_POSITION} />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot if on the create position page', () => {
  const wrapper = shallow(<Navigation classes={classes} navigate={() => undefined} route={R.CREATE_POSITION} />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot if on the position page', () => {
  const wrapper = shallow(<Navigation classes={classes} navigate={() => undefined} route={R.POSITION} />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot if on the profile page', () => {
  const wrapper = shallow(<Navigation classes={classes} navigate={() => undefined} route={R.PROFILE} />);

  expect(wrapper).toMatchSnapshot();
});
