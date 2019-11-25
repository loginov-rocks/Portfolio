/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';
import configureStore from 'redux-mock-store';

import withRouteParams from './withRouteParams';

const mockStore = configureStore();
const BaseComponent: React.FunctionComponent = () => <div>BaseComponent</div>;
const EnhancedComponent = withRouteParams(BaseComponent);

it('adds prop with route params', () => {
  const wrapper = shallow(
    // @ts-ignore
    <EnhancedComponent store={mockStore({ app: { routeParams: { param: 'value' } } })} />,
  );

  expect(wrapper.find(BaseComponent).prop('routeParams')).toStrictEqual({
    param: 'value',
  });
});
