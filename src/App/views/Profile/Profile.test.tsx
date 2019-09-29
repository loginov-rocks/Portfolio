/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import classes from 'identity-obj-proxy';
import * as React from 'react';

import Profile from './Profile';

it('matches snapshot', () => {
  const wrapper = shallow(
    <Profile
      classes={classes}
      profile={{
        avatarUrl: 'http://example.com/avatar.png',
        displayName: 'Dolph',
        email: 'dolph@example.com',
        isEmpty: false,
        isLoaded: true,
      }}
      resetLogos={() => undefined}
      resetQuotes={() => undefined}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
