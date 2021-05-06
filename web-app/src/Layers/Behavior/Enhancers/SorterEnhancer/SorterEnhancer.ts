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

interface WithProps {
  keyLabel: string;
}

export type SorterEnhancerProps = WithStateProps & WithProps;

// eslint-disable-next-line max-len
export const SorterEnhancer = <OwnProps extends SorterEnhancerInputProps>(): ComponentEnhancer<OwnProps & SorterEnhancerProps, OwnProps> => (
  compose(
    withState<WithStateProps, HTMLElement | null, 'anchor', 'updateAnchor'>('anchor', 'updateAnchor', null),
    withProps<WithProps, OwnProps & WithStateProps>(({ keys, sorterKey }) => {
      const selectedKey = keys.find(({ key }) => key === sorterKey);

      return {
        keyLabel: selectedKey ? selectedKey.label : sorterKey,
      };
    }),
  )
);
