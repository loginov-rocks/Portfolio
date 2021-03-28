/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import classes from 'identity-obj-proxy';
import * as React from 'react';

import ClosePosition from './ClosePosition';

it('matches snapshot', () => {
  const wrapper = shallow(
    <ClosePosition
      classes={classes}
      handleBackClick={() => undefined}
      position={{
        amount: 1,
        closeCommission: null,
        closeDate: null,
        closePrice: null,
        id: 'id',
        openCommission: 1,
        openDate: '2019-07-01',
        openPrice: 100,
        symbol: 'AAPL',
      }}
      positionLoading={false}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot when loading', () => {
  const wrapper = shallow(
    <ClosePosition
      classes={classes}
      handleBackClick={() => undefined}
      position={null}
      positionLoading
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
