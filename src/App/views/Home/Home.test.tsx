import { shallow } from 'enzyme';
import * as React from 'react';

import Home from './Home';

it('matches snapshot', () => {
  const wrapper = shallow(
    <Home
      handleCreatePositionClick={() => undefined}
      handlePositionClick={() => undefined}
      handleProfileClick={() => undefined}
      positions={[]}
      positionsLoading={false}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot when positions are loading', () => {
  const wrapper = shallow(
    <Home
      handleCreatePositionClick={() => undefined}
      handlePositionClick={() => undefined}
      handleProfileClick={() => undefined}
      positions={[]}
      positionsLoading
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
