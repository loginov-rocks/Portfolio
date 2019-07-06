import { shallow } from 'enzyme';
import * as React from 'react';

import CreatePosition from './CreatePosition';

it('matches snapshot', () => {
  const wrapper = shallow(
    <CreatePosition handleCreate={() => undefined} handleHomeClick={() => undefined} />,
  );

  expect(wrapper).toMatchSnapshot();
});
