import StockPositionsValue, { RenderProps } from './StockPositionsValue';
import enhance, { EnhancedProps } from './StockPositionsValue.enhancer';

export default enhance(StockPositionsValue);

export type EnhancedProps = EnhancedProps;
export type RenderProps = RenderProps;
