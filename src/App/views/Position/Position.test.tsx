import { shallow } from 'enzyme';
import * as React from 'react';

import Position from './Position';

it('matches snapshot', () => {
  const wrapper = shallow(
    <Position
      handleDeleteClick={() => undefined}
      handleHomeClick={() => undefined}
      position={{
        amount: 1,
        date: '2019-07-01',
        id: 'id',
        price: 100,
        symbol: 'symbol',
      }}
      positionLoading={false}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
