import classNames from 'classnames';
import * as React from 'react';

import {
  StockLogoBySymbolEnhancerInputProps, StockLogoBySymbolEnhancerProps,
} from 'Layers/Behavior/Enhancers/StockLogoBySymbolEnhancer/StockLogoBySymbolEnhancer';
import { Progress } from 'Layers/Presentation/Components/Progress';

export interface StockLogoProps extends StockLogoBySymbolEnhancerInputProps {
  classes: { [key: string]: string };
  className?: string;
  size?: number;
}

type Props = StockLogoProps & StockLogoBySymbolEnhancerProps;

export const StockLogo: React.FunctionComponent<Props> = ({
  classes, className, logo, logoProgress, size,
}: Props) => {
  if (logoProgress) {
    return <Progress className={className} />;
  }

  if (!logo) {
    return null;
  }

  return (
    <img alt="" className={classNames(classes.root, className)} src={logo} style={{ height: size, width: size }} />
  );
};

StockLogo.defaultProps = {
  size: 40,
};
