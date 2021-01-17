/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import App from './App';

it('matches snapshot if loading', () => {
  const wrapper = shallow(
    // For test purposes.
    // @ts-ignore
    <App isAuthenticated={false} persistor={{}} progress />,
  );

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot if unauthenticated', () => {
  const wrapper = shallow(
    // For test purposes.
    // @ts-ignore
    <App isAuthenticated={false} persistor={{}} progress={false} />,
  );

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot if authenticated', () => {
  const wrapper = shallow(
    // For test purposes.
    // @ts-ignore
    <App isAuthenticated persistor={{}} progress={false} />,
  );

  expect(wrapper).toMatchSnapshot();
});
