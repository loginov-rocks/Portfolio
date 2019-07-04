import * as React from 'react';

import { Position } from '../../lib';

export interface RenderProps {
  handleClick: () => void;
  isClickable: boolean;
  position: Position;
}

export interface Props extends RenderProps {
  children: React.FunctionComponent<RenderProps>;
}

const PositionItem: React.FunctionComponent<Props> = ({
  children, handleClick, isClickable, position,
}) => children({ handleClick, isClickable, position });

export default PositionItem;
