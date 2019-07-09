import { shallow } from 'enzyme';
import * as React from 'react';

import Logo from './Logo';

it('matches snapshot', () => {
  const wrapper = shallow(<Logo />);

  expect(wrapper).toMatchSnapshot();
});
