import { shallow } from 'enzyme';
import * as React from 'react';

import Progress from './Progress';

it('renders without crashing and matches snapshot', () => {
  const wrapper = shallow(<Progress />);

  expect(wrapper).toMatchSnapshot();
});
