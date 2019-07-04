import { shallow } from 'enzyme';
import * as React from 'react';

import PositionItem from './PositionItem';

it('renders children with render props', () => {
  const componentMock = jest.fn();
  const handleClick = jest.fn();
  const position = {
    amount: 1,
    closeCommission: null,
    closeDate: null,
    closePrice: null,
    id: 'id',
    openCommission: 1,
    openDate: '2019-07-02',
    openPrice: 100,
    symbol: 'AAPL',
  };

  shallow(<PositionItem handleClick={handleClick} isClickable position={position}>{componentMock}</PositionItem>);

  expect(componentMock).toBeCalledWith({ handleClick, isClickable: true, position });
});
