import * as React from 'react';

import { Quote } from '../../lib/IEX/IEX';

export interface RenderProps {
  logo: string | undefined;
  logoProgress: boolean;
  price: number;
  quote: Quote | undefined;
  quoteProgress: boolean;
  symbol: string;
}

interface Props extends RenderProps {
  children: React.FunctionComponent<RenderProps>;
}

const Stock: React.FunctionComponent<Props> = ({
  children, logo, logoProgress, price, quote, quoteProgress, symbol,
}) => children({
  logo, logoProgress, price, quote, quoteProgress, symbol,
});

export default Stock;
