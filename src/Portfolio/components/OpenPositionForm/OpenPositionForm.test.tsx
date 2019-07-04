import { shallow } from 'enzyme';
import * as React from 'react';

import OpenPositionForm from './OpenPositionForm';

import { formatDate } from '../../lib';

it('matches snapshot', () => {
  const wrapper = shallow(
    <OpenPositionForm
      amount={1}
      commission={1}
      date={formatDate(new Date('2019-07-02'))}
      handleAmountChange={() => undefined}
      handleCommissionChange={() => undefined}
      handleDateChange={() => undefined}
      handlePriceChange={() => undefined}
      handleSymbolChange={() => undefined}
      handleSubmit={() => undefined}
      price={100}
      symbol="AAPL"
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
