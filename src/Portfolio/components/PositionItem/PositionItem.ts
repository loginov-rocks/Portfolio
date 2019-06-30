import { Position } from '../../lib/flow';

export interface RenderProps {
  handleClick: () => void,
  isClickable: boolean,
  position: Position,
}

interface Props extends RenderProps {
  children: (renderProps: RenderProps) => JSX.Element,
}

const PositionItem = ({
  children, handleClick, isClickable, position,
}: Props) => children({ handleClick, isClickable, position });

export default PositionItem;
