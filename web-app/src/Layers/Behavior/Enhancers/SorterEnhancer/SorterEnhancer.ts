import {
  ComponentEnhancer, compose, withProps, withState,
} from 'recompose';

export interface SorterEnhancerInputProps {
  keys: { key: string; label: string }[];
  sorterKey: string;
}

interface WithStateProps {
  anchor: HTMLElement | null;
  updateAnchor: (anchor: HTMLElement | null) => void;
}

export interface SorterEnhancerProps extends WithStateProps {
  keyLabel: string;
}

// eslint-disable-next-line max-len
export const SorterEnhancer = <OwnProps extends SorterEnhancerInputProps>(): ComponentEnhancer<OwnProps & SorterEnhancerProps, OwnProps> => (
  compose(
    withState<WithStateProps, HTMLElement | null, 'anchor', 'updateAnchor'>('anchor', 'updateAnchor', null),
    withProps<Partial<SorterEnhancerProps>, OwnProps & WithStateProps>(({ keys, sorterKey }) => {
      const selectedKey = keys.find(({ key }) => key === sorterKey);

      return {
        keyLabel: selectedKey ? selectedKey.label : sorterKey,
      };
    }),
  )
);
