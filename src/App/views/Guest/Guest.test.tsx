import { shallow } from 'enzyme';
import classes from 'identity-obj-proxy';
import * as React from 'react';

import Guest from './Guest';

it('matches snapshot', () => {
  const wrapper = shallow(<Guest classes={classes} />);

  expect(wrapper).toMatchSnapshot();
});
