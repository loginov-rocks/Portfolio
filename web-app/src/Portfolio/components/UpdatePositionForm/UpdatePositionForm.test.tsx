/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import classes from 'identity-obj-proxy';
import * as React from 'react';

import { formatDate } from 'Shared/lib';

import UpdatePositionForm from './UpdatePositionForm';

it('matches snapshot', () => {
  const wrapper = shallow(
    <UpdatePositionForm
      amount={1}
      classes={classes}
      closeCommission={1}
      closeDate={formatDate(new Date('2019-07-25'))}
      closePrice={100}
      handleAmountChange={() => undefined}
      handleCloseCommissionChange={() => undefined}
      handleCloseDateChange={() => undefined}
      handleClosePriceChange={() => undefined}
      handleOpenCommissionChange={() => undefined}
      handleOpenDateChange={() => undefined}
      handleOpenPriceChange={() => undefined}
      handleSubmit={() => undefined}
      handleSymbolChange={() => undefined}
      openCommission={1}
      openDate={formatDate(new Date('2019-07-02'))}
      openPrice={100}
      symbol="AAPL"
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
