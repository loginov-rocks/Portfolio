import { shallow } from 'enzyme';
import * as React from 'react';

import App from './App';

it('matches snapshot if loading', () => {
  const wrapper = shallow(
    // @ts-ignore
    <App isAuthenticated={false} persistor={{}} progress />,
  );

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot if unauthenticated', () => {
  const wrapper = shallow(
    // @ts-ignore
    <App isAuthenticated={false} persistor={{}} progress={false} />,
  );

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot if authenticated', () => {
  const wrapper = shallow(
    // @ts-ignore
    <App isAuthenticated persistor={{}} progress={false} />,
  );

  expect(wrapper).toMatchSnapshot();
});
