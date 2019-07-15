import { shallow } from 'enzyme';
import classes from 'identity-obj-proxy';
import * as React from 'react';

import ClosedPositionsList from './ClosedPositionsList';

it('matches snapshot', () => {
  const wrapper = shallow(
    <ClosedPositionsList
      classes={classes}
      handleSorterKeyChange={() => undefined}
      handleSorterOrderChange={() => undefined}
      sorterKey="openPrice"
      sorterOrder="asc"
      stockPositions={[]}
      totalClosePL={100}
      totalClosePLPercent={1}
      totalCloseSum={1000}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
