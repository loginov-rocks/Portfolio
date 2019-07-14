import { shallow } from 'enzyme';
import * as React from 'react';

import StockLogo from './StockLogo';

it('matches snapshot', () => {
  const wrapper = shallow(<StockLogo logo="https://example.com/stock/logo.png" logoProgress={false} />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot when loading', () => {
  const wrapper = shallow(<StockLogo logo={null} logoProgress />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot when logo is null', () => {
  const wrapper = shallow(<StockLogo logo={null} logoProgress={false} />);

  expect(wrapper).toMatchSnapshot();
});
