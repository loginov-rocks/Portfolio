/* @flow */

import * as React from 'react';

import type { Quote } from '../../lib/IEX/IEX';

type Props = {
  children: React.Node,
  logo: ?string,
  logoProgress: boolean,
  price: number,
  quote: ?Quote,
  quoteProgress: boolean,
  symbol: string,
};

const Stock = ({
  children, logo, logoProgress, price, quote, quoteProgress, symbol,
}: Props) => children({
  logo, logoProgress, price, quote, quoteProgress, symbol,
});

export default Stock;
