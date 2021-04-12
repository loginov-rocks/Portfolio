import {
  Button, ButtonGroup, Menu, MenuItem,
} from '@material-ui/core';
import { SortOutlined } from '@material-ui/icons';
import * as React from 'react';

import { SorterEnhancerInputProps, SorterEnhancerProps } from 'Layers/Behavior/SorterEnhancer/SorterEnhancer';

export interface SorterProps extends SorterEnhancerInputProps {
  className?: string;
  onKeyChange: (key: string) => void;
  onOrderChange: (order: 'asc' | 'desc') => void;
  sorterOrder: 'asc' | 'desc';
}

type Props = SorterProps & SorterEnhancerProps;

export const Sorter: React.FunctionComponent<Props> = ({
  anchor, className, keyLabel, keys, onKeyChange, onOrderChange, sorterKey, sorterOrder, updateAnchor,
}: Props) => (
  <>

    <ButtonGroup className={className}>
      <Button onClick={(event) => updateAnchor(event.currentTarget)}>
        {keyLabel}
      </Button>
      <Button onClick={() => onOrderChange(sorterOrder === 'asc' ? 'desc' : 'asc')} size="small">
        <SortOutlined style={sorterOrder === 'asc' ? { transform: 'scaleY(-1)' } : {}} />
      </Button>
    </ButtonGroup>

    <Menu
      anchorEl={anchor}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      getContentAnchorEl={null}
      onClose={() => updateAnchor(null)}
      open={Boolean(anchor)}
    >
      {keys.map(({ key, label }) => (
        <MenuItem
          disabled={key === sorterKey}
          key={key}
          onClick={() => {
            onKeyChange(key);
            updateAnchor(null);
          }}
        >
          {label}
        </MenuItem>
      ))}
    </Menu>

  </>
);
