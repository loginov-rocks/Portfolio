import { Quote } from '../../lib/IEX/IEX';

interface RenderProps {
  logo: string | undefined;
  logoProgress: boolean;
  price: number;
  quote: Quote | undefined;
  quoteProgress: boolean;
  symbol: string;
}

interface Props extends RenderProps {
  children: (renderProps: RenderProps) => JSX.Element;
}

const Stock = ({
  children, logo, logoProgress, price, quote, quoteProgress, symbol,
}: Props) => children({
  logo, logoProgress, price, quote, quoteProgress, symbol,
});

export default Stock;
