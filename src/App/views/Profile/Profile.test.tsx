import { shallow } from 'enzyme';
import * as React from 'react';

import Profile from './Profile';

it('matches snapshot', () => {
  const wrapper = shallow(
    <Profile
      profile={{
        avatarUrl: 'http://example.com/avatar.png',
        displayName: 'Dolph',
        email: 'dolph@example.com',
        isEmpty: false,
        isLoaded: true,
      }}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
