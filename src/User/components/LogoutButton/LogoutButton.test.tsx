import { shallow } from 'enzyme';
import * as React from 'react';

import LogoutButton from './LogoutButton';

it('matches snapshot', () => {
  const wrapper = shallow(<LogoutButton handleClick={() => undefined}>Logout</LogoutButton>);

  expect(wrapper).toMatchSnapshot();
});
