/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import PositionDate from './PositionDate';

it('matches snapshot', () => {
  const wrapper = shallow(<PositionDate date="2017-07-14" />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot when highlighted', () => {
  const wrapper = shallow(<PositionDate date="2017-07-14" highlighted />);

  expect(wrapper).toMatchSnapshot();
});
