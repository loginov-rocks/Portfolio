import { shallow } from 'enzyme';
import * as React from 'react';

import CreatePosition from './CreatePosition';

it('matches snapshot', () => {
  const wrapper = shallow(
    <CreatePosition handleHomeClick={() => undefined} handleOnCreate={() => undefined} />,
  );

  expect(wrapper).toMatchSnapshot();
});
