import { shallow } from 'enzyme';
import * as React from 'react';

import quoteFixture from '../../lib/IEX/__fixtures__/quote';
import Stock from './Stock';

it('renders children with render props', () => {
  const componentMock = jest.fn();

  shallow(
    <Stock logo="logoUrl" logoProgress={false} price={100} quote={quoteFixture} quoteProgress={false} symbol="AAPL">
      {componentMock}
    </Stock>,
  );

  expect(componentMock).toBeCalledWith({
    logo: 'logoUrl',
    logoProgress: false,
    price: 100,
    quote: quoteFixture,
    quoteProgress: false,
    symbol: 'AAPL',
  });
});
