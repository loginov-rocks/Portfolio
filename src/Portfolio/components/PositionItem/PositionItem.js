/* @flow */

import * as React from 'react';

import type { Position } from '../../lib/flow';

type Props = {
  children: React.Node,
  handleClick: () => void,
  isClickable: boolean,
  position: Position,
};

const PositionItem = ({
  children, handleClick, isClickable, position,
}: Props) => children({ handleClick, isClickable, position });

export default PositionItem;
