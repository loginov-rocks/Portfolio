export const HOME_TAB_CHANGED = 'home/HOME_TAB_CHANGED';
export const SORTER_KEY_CHANGED = 'home/SORTER_KEY_CHANGED';
export const SORTER_ORDER_CHANGED = 'home/SORTER_ORDER_CHANGED';

export interface HomeTabChangedAction {
  type: typeof HOME_TAB_CHANGED;
  payload: 'closed' | 'open' | 'summary';
}

export interface SorterKeyChangedAction {
  type: typeof SORTER_KEY_CHANGED;
  payload: {
    name: string;
    key: string;
  };
}

export interface SorterOrderChangedAction {
  type: typeof SORTER_ORDER_CHANGED;
  payload: {
    name: string;
    order: 'asc' | 'desc';
  };
}

export const homeTabChanged = (tab: 'closed' | 'open' | 'summary'): HomeTabChangedAction => ({
  payload: tab,
  type: HOME_TAB_CHANGED,
});

export const sorterKeyChanged = (name: string, key: string): SorterKeyChangedAction => ({
  payload: { key, name },
  type: SORTER_KEY_CHANGED,
});

export const sorterOrderChanged = (name: string, order: 'asc' | 'desc'): SorterOrderChangedAction => ({
  payload: { name, order },
  type: SORTER_ORDER_CHANGED,
});
