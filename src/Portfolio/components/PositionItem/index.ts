import PositionItem, { RenderProps } from './PositionItem';
import enhance, { EnhancedProps } from './PositionItem.enhancer';

export default enhance(PositionItem);

export type EnhancedProps = EnhancedProps;
export type RenderProps = RenderProps;
