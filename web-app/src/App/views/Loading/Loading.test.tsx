/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import classes from 'identity-obj-proxy';
import * as React from 'react';

import Loading from './Loading';

it('matches snapshot', () => {
  const wrapper = shallow(<Loading classes={classes} />);

  expect(wrapper).toMatchSnapshot();
});
