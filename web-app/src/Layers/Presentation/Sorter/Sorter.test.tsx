/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { Sorter } from './Sorter';

it('matches snapshot', () => {
  const wrapper = shallow(
    <Sorter
      anchor={null}
      keyLabel="Open Price"
      keys={[
        { key: 'openPrice', label: 'Open Price' },
        { key: 'closePrice', label: 'Close Price' },
        { key: 'marketPrice', label: 'Market Price' },
      ]}
      onKeyChange={() => undefined}
      onOrderChange={() => undefined}
      sorterKey="openPrice"
      sorterOrder="asc"
      updateAnchor={() => undefined}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
