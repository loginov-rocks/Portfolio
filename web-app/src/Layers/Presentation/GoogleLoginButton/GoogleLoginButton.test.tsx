/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { GoogleLoginButton } from './GoogleLoginButton';

it('matches snapshot', () => {
  const wrapper = shallow(<GoogleLoginButton />);

  expect(wrapper).toMatchSnapshot();
});
