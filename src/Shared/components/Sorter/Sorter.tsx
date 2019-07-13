import {
  Button, ButtonGroup, Menu, MenuItem,
} from '@material-ui/core';
import { SortOutlined } from '@material-ui/icons';
import * as React from 'react';

// TODO: Tests.

export interface Props {
  anchor: HTMLElement | null;
  keyLabel: string;
  keys: { key: string; label: string }[];
  onKeyChange: (key: string) => void;
  onOrderChange: (order: 'asc' | 'desc') => void;
  sorterKey: string;
  sorterOrder: 'asc' | 'desc';
  updateAnchor: (anchor: HTMLElement | null) => void;
}

const Sorter: React.FunctionComponent<Props> = ({
  anchor, keyLabel, keys, onKeyChange, onOrderChange, sorterKey, sorterOrder, updateAnchor,
}: Props) => (
  <React.Fragment>

    <ButtonGroup>
      <Button onClick={event => updateAnchor(event.currentTarget)}>
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
          key={key}
          onClick={() => {
            onKeyChange(key);
            updateAnchor(null);
          }}
        >
          {key === sorterKey ? <strong>{label}</strong> : label}
        </MenuItem>
      ))}
    </Menu>

  </React.Fragment>
);

export default Sorter;
