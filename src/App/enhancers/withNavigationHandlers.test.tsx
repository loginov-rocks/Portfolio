/* eslint-disable import/no-extraneous-dependencies */

import { mount } from 'enzyme';
import * as React from 'react';
import configureStore, { MockStore } from 'redux-mock-store';
import thunk from 'redux-thunk';

import { navigationHappened } from '../actions/creators';
import * as R from '../routes';
import withNavigationHandlers from './withNavigationHandlers';

interface Props {
  handleClickDependentOnEvent: (event: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  handleClickDependentOnProp: () => void;
  handleRouteClick: () => void;
}

const enhance = withNavigationHandlers<Props, {}>({
  handleClickDependentOnEvent: (props, event) => ({ params: { positionEvent: event }, route: R.POSITION }),
  handleClickDependentOnProp: ({ position }) => ({ params: { positionProp: position }, route: R.POSITION }),
  handleRouteClick: R.HOME,
});

const mockStore = configureStore([thunk]);

let store: MockStore;

beforeEach(() => {
  store = mockStore();
});

it('adds handler to navigate to plain route', () => {
  const BaseComponent: React.FunctionComponent<Props> = ({ handleRouteClick }: Props) => (
    <button onClick={handleRouteClick} type="button">BaseComponent</button>
  );
  const EnhancedComponent = enhance(BaseComponent);

  const wrapper = mount(
    // @ts-ignore
    <EnhancedComponent store={store} />,
  );

  wrapper.find('button').simulate('click');

  expect(store.getActions()[0]).toStrictEqual(navigationHappened(R.HOME));
});

it('adds handler to navigate to route depending on prop', () => {
  const BaseComponent: React.FunctionComponent<Props> = ({ handleClickDependentOnProp }: Props) => (
    <button onClick={handleClickDependentOnProp} type="button">BaseComponent</button>
  );
  const EnhancedComponent = enhance(BaseComponent);

  const wrapper = mount(
    // @ts-ignore
    <EnhancedComponent position="positionValue" store={store} />,
  );

  wrapper.find('button').simulate('click');

  expect(store.getActions()[0]).toStrictEqual(navigationHappened(R.POSITION, { positionProp: 'positionValue' }));
});

it('adds handler to navigate to route depending on event', () => {
  const BaseComponent: React.FunctionComponent<Props> = ({ handleClickDependentOnEvent }: Props) => (
    <button onClick={() => handleClickDependentOnEvent('positionValue')} type="button">BaseComponent</button>
  );
  const EnhancedComponent = enhance(BaseComponent);

  const wrapper = mount(
    // @ts-ignore
    <EnhancedComponent store={store} />,
  );

  wrapper.find('button').simulate('click');

  expect(store.getActions()[0]).toStrictEqual(navigationHappened(R.POSITION, { positionEvent: 'positionValue' }));
});
