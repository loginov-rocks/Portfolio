/* eslint-disable import/no-extraneous-dependencies */

import { mount } from 'enzyme';
import * as React from 'react';
import configureStore from 'redux-mock-store';

import { AuthGate } from './AuthGate';

const mockStore = configureStore();
const node = <div>BaseComponent</div>;
const BaseComponent: React.FunctionComponent = () => node;
const EnhancedComponent = AuthGate()(BaseComponent);

it('does not render children if unauthenticated', () => {
  const wrapper = mount(
    // For test purposes.
    // @ts-ignore
    <EnhancedComponent store={mockStore({ firebase: { firebase: { auth: { isEmpty: true, isLoaded: false } } } })} />,
  );

  expect(wrapper.contains(node)).toBeFalsy();
});

it('renders children if authenticated', () => {
  const wrapper = mount(
    // For test purposes.
    // @ts-ignore
    <EnhancedComponent store={mockStore({ firebase: { firebase: { auth: { isEmpty: false, isLoaded: true } } } })} />,
  );

  expect(wrapper.contains(node)).toBeTruthy();
});
