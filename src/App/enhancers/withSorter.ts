import { withStateHandlers } from 'recompose';

// TODO: Tests.

export interface Props {
  sorterKey: string;
  sorterOrder: 'asc' | 'desc';
  handleSorterKeyChange: (key: string) => void;
  handleSorterOrderChange: (order: 'asc' | 'desc') => void;
}

export default (initialKey: string, initialOrder: 'asc' | 'desc' = 'asc') => withStateHandlers(
  {
    sorterKey: initialKey,
    sorterOrder: initialOrder,
  },
  {
    handleSorterKeyChange: () => sorterKey => ({ sorterKey }),
    handleSorterOrderChange: () => sorterOrder => ({ sorterOrder }),
  },
);
