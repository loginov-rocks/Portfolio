export const HOME_TAB_CHANGED = 'app/HOME_TAB_CHANGED';
export const SORTER_KEY_CHANGED = 'app/SORTER_KEY_CHANGED';
export const SORTER_ORDER_CHANGED = 'app/SORTER_ORDER_CHANGED';

interface HomeTabChanged {
  type: typeof HOME_TAB_CHANGED;
  payload: 'closed' | 'open' | 'summary';
}

interface SorterKeyChanged {
  type: typeof SORTER_KEY_CHANGED;
  payload: {
    name: string;
    key: string;
  };
}

interface SorterOrderChanged {
  type: typeof SORTER_ORDER_CHANGED;
  payload: {
    name: string;
    order: 'asc' | 'desc';
  };
}

export type Action = HomeTabChanged | SorterKeyChanged | SorterOrderChanged;
