import * as T from './types';

export const homeTabChanged = (tab: 'closed' | 'open' | 'summary'): T.Action => ({
  payload: tab,
  type: T.HOME_TAB_CHANGED,
});

export const sorterKeyChanged = (name: string, key: string): T.Action => ({
  payload: { key, name },
  type: T.SORTER_KEY_CHANGED,
});

export const sorterOrderChanged = (name: string, order: 'asc' | 'desc'): T.Action => ({
  payload: { name, order },
  type: T.SORTER_ORDER_CHANGED,
});
