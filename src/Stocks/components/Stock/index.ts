import Stock, { RenderProps } from './Stock';
import enhance, { EnhancedProps } from './Stock.enhancer';

export default enhance(Stock);

export type EnhancedProps = EnhancedProps;
export type RenderProps = RenderProps;
