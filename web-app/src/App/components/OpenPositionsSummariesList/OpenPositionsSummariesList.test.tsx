/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import classes from 'identity-obj-proxy';
import * as React from 'react';

import OpenPositionsSummariesList from './OpenPositionsSummariesList';

it('matches snapshot', () => {
  const wrapper = shallow(
    <OpenPositionsSummariesList
      classes={classes}
      handleSorterKeyChange={() => undefined}
      handleSorterOrderChange={() => undefined}
      sorterKey="companyName"
      sorterOrder="asc"
      summaries={[]}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
