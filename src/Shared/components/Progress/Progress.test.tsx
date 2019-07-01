import { shallow } from 'enzyme';
import * as React from 'react';

import Progress from './Progress';

it('matches snapshot', () => {
  const wrapper = shallow(<Progress />);

  expect(wrapper).toMatchSnapshot();
});
