import {
  ComponentEnhancer, compose, withProps, withState,
} from 'recompose';

export interface SorterEnhancerInputProps {
  keys: { key: string; label: string }[];
  sorterKey: string;
}

export interface SorterEnhancerProps {
  anchor: HTMLElement | null;
  keyLabel: string;
  updateAnchor: (anchor: HTMLElement | null) => void;
}

// eslint-disable-next-line max-len
export const SorterEnhancer = <OwnProps extends SorterEnhancerInputProps>(): ComponentEnhancer<OwnProps & SorterEnhancerProps, OwnProps> => (
  compose<OwnProps & SorterEnhancerProps, OwnProps>(
    withState<SorterEnhancerProps, HTMLElement | null, 'anchor', 'updateAnchor'>('anchor', 'updateAnchor', null),
    withProps<Partial<SorterEnhancerProps>, SorterEnhancerInputProps>(({ keys, sorterKey }) => {
      const selectedKey = keys.find(({ key }) => key === sorterKey);

      return {
        keyLabel: selectedKey ? selectedKey.label : sorterKey,
      };
    }),
  )
);
