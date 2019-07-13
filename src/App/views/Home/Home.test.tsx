import { shallow } from 'enzyme';
import classes from 'identity-obj-proxy';
import * as React from 'react';

import Home from './Home';

it('matches snapshot with the Closed tab', () => {
  const wrapper = shallow(
    <Home
      classes={classes}
      handlePositionClick={() => undefined}
      handleTabChange={() => undefined}
      positions={[]}
      positionsLoading={false}
      tab="closed"
    />,
  );

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot with the Open tab', () => {
  const wrapper = shallow(
    <Home
      classes={classes}
      handlePositionClick={() => undefined}
      handleTabChange={() => undefined}
      positions={[]}
      positionsLoading={false}
      tab="open"
    />,
  );

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot with the Summary tab', () => {
  const wrapper = shallow(
    <Home
      classes={classes}
      handlePositionClick={() => undefined}
      handleTabChange={() => undefined}
      positions={[]}
      positionsLoading={false}
      tab="summary"
    />,
  );

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot when positions are loading', () => {
  const wrapper = shallow(
    <Home
      classes={classes}
      handlePositionClick={() => undefined}
      handleTabChange={() => undefined}
      positions={[]}
      positionsLoading
      tab="summary"
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
