/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import classes from 'identity-obj-proxy';
import * as React from 'react';

import { PositionForm } from './PositionForm';

it('matches snapshot', () => {
  const wrapper = shallow(
    <PositionForm
      amount={1}
      classes={classes}
      closeCommission={1}
      closeDate="2019-07-25"
      closePrice={100}
      displayedFields={[
        'symbol', 'amount', 'openPrice', 'openCommission', 'openDate', 'closePrice', 'closeCommission', 'closeDate',
      ]}
      handleAmountChange={() => undefined}
      handleCloseCommissionChange={() => undefined}
      handleCloseDateChange={() => undefined}
      handleClosePriceChange={() => undefined}
      handleOpenCommissionChange={() => undefined}
      handleOpenDateChange={() => undefined}
      handleOpenPriceChange={() => undefined}
      handleSubmit={() => undefined}
      handleSymbolChange={() => undefined}
      initialData={{
        amount: 1,
        closeCommission: 1,
        closeDate: '2019-07-25',
        closePrice: 100,
        openCommission: 1,
        openDate: '2019-07-02',
        openPrice: 100,
        symbol: 'AAPL',
      }}
      onSubmit={() => undefined}
      openCommission={1}
      openDate="2019-07-02"
      openPrice={100}
      requiredFields={[
        'symbol', 'amount', 'openPrice', 'openCommission', 'openDate',
      ]}
      submitButtonTitle="Submit"
      symbol="AAPL"
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
