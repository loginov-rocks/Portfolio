import { shallow } from 'enzyme';
import * as React from 'react';

import StockPositionsValue from './StockPositionsValue';

it('renders children with render props', () => {
  const componentMock = jest.fn();

  shallow(<StockPositionsValue value={100}>{componentMock}</StockPositionsValue>);

  expect(componentMock).toBeCalledWith({ value: 100 });
});
