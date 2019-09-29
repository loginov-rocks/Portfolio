/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import Progress from './Progress';

it('matches snapshot', () => {
  const wrapper = shallow(<Progress />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot when size is large', () => {
  const wrapper = shallow(<Progress size="large" />);

  expect(wrapper).toMatchSnapshot();
});
