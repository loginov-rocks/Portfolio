import * as React from 'react';

import Quote from '../../lib/IEX/Quote';

export interface RenderProps {
  logo: string | null;
  logoProgress: boolean;
  price: number | null;
  quote: Quote | null;
  quoteProgress: boolean;
  symbol: string;
}

export interface Props extends RenderProps {
  children: React.FunctionComponent<RenderProps>;
}

const Stock: React.FunctionComponent<Props> = ({
  children, logo, logoProgress, price, quote, quoteProgress, symbol,
}) => children({
  logo, logoProgress, price, quote, quoteProgress, symbol,
});

export default Stock;
