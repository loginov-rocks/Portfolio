import { shallow } from 'enzyme';
import * as React from 'react';

import Profile from './Profile';

it('matches snapshot', () => {
  const wrapper = shallow(
    <Profile
      handleHomeClick={() => undefined}
      profile={{
        avatarUrl: 'http://example.com/avatar.png',
        displayName: 'Dolph',
        email: 'dolph@example.com',
      }}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
