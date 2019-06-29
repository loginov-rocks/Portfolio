interface Props {
  children: () => JSX.Element,
  value: number,
}

const StockPositionsValue = ({ children, value }: Props) => children({ value });

export default StockPositionsValue;
