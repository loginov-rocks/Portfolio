import { shallow } from 'enzyme';
import * as React from 'react';

import Loading from './Loading';

it('matches snapshot', () => {
  const wrapper = shallow(<Loading />);

  expect(wrapper).toMatchSnapshot();
});
