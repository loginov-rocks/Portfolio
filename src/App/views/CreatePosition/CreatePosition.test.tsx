import { shallow } from 'enzyme';
import classes from 'identity-obj-proxy';
import * as React from 'react';

import CreatePosition from './CreatePosition';

it('matches snapshot', () => {
  const wrapper = shallow(
    <CreatePosition classes={classes} handleCreate={() => undefined} />,
  );

  expect(wrapper).toMatchSnapshot();
});
