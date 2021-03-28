/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import ProviderLoginButton from './ProviderLoginButton';

it('matches snapshot', () => {
  const wrapper = shallow(<ProviderLoginButton handleClick={() => undefined}>Login</ProviderLoginButton>);

  expect(wrapper).toMatchSnapshot();
});
