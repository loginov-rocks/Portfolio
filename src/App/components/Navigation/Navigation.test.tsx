import { shallow } from 'enzyme';
import * as React from 'react';

import Navigation from './Navigation';
import * as R from '../../routes';

it('renders without crashing and matches snapshot', () => {
  const wrapper = shallow(<Navigation route={R.HOME} />);

  expect(wrapper).toMatchSnapshot();
});
