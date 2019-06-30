import { shallow } from 'enzyme';
import * as React from 'react';

import App from './App';

it('renders without crashing and matches snapshot', () => {
  const wrapper = shallow(<App isAuthenticated={false} progress={false} />);

  expect(wrapper).toMatchSnapshot();
});
