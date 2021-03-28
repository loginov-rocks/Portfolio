import { compose, withProps, withState } from 'recompose';

import { Props } from './Sorter';

interface EnhancedProps {
  className?: string;
  keys: { key: string; label: string }[];
  onKeyChange: (key: string) => void;
  onOrderChange: (order: 'asc' | 'desc') => void;
  sorterKey: string;
  sorterOrder: 'asc' | 'desc';
}

export default compose<Props, EnhancedProps>(
  withState<EnhancedProps, HTMLElement | null, 'anchor', 'updateAnchor'>('anchor', 'updateAnchor', null),
  withProps<Partial<Props>, EnhancedProps>(({ keys, sorterKey }) => {
    const selectedKey = keys.find(({ key }) => key === sorterKey);

    return {
      keyLabel: selectedKey ? selectedKey.label : sorterKey,
    };
  }),
);
