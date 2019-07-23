import { shallow } from 'enzyme';
import classes from 'identity-obj-proxy';
import * as React from 'react';

import { formatDate } from 'Shared/lib';

import UpdatePositionForm from './UpdatePositionForm';

it('matches snapshot', () => {
  const wrapper = shallow(
    <UpdatePositionForm
      classes={classes}
      commission={1}
      date={formatDate(new Date('2019-07-02'))}
      handleCommissionChange={() => undefined}
      handleDateChange={() => undefined}
      handlePriceChange={() => undefined}
      handleSubmit={() => undefined}
      price={100}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
