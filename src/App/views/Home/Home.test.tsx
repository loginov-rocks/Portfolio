import { shallow } from 'enzyme';
import * as React from 'react';

import Home from './Home';

it('matches snapshot with the first tab', () => {
  const wrapper = shallow(
    <Home
      handlePositionClick={() => undefined}
      handleTabChange={() => undefined}
      positions={[]}
      positionsLoading={false}
      tab={0}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot with the second tab', () => {
  const wrapper = shallow(
    <Home
      handlePositionClick={() => undefined}
      handleTabChange={() => undefined}
      positions={[]}
      positionsLoading={false}
      tab={1}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot when positions are loading', () => {
  const wrapper = shallow(
    <Home
      handlePositionClick={() => undefined}
      handleTabChange={() => undefined}
      positions={[]}
      positionsLoading
      tab={0}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
