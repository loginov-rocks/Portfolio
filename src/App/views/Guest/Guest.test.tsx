import { shallow } from 'enzyme';
import * as React from 'react';

import Guest from './Guest';

it('matches snapshot', () => {
  const wrapper = shallow(<Guest />);

  expect(wrapper).toMatchSnapshot();
});
