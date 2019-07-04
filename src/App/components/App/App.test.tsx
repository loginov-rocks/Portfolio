import { shallow } from 'enzyme';
import * as React from 'react';

import App from './App';

it('matches snapshot if loading', () => {
  const wrapper = shallow(<App isAuthenticated={false} progress />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot if unauthenticated', () => {
  const wrapper = shallow(<App isAuthenticated={false} progress={false} />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot if authenticated', () => {
  const wrapper = shallow(<App isAuthenticated progress={false} />);

  expect(wrapper).toMatchSnapshot();
});
