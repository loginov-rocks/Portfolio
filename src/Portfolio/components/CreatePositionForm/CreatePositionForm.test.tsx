import { shallow } from 'enzyme';
import classes from 'identity-obj-proxy';
import * as React from 'react';

import { formatDate } from 'Shared/lib';

import CreatePositionForm from './CreatePositionForm';

it('matches snapshot', () => {
  const wrapper = shallow(
    <CreatePositionForm
      amount={1}
      classes={classes}
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
