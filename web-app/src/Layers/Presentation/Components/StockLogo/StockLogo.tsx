import classNames from 'classnames';
import * as React from 'react';

import {
  StockLogoEnhancerInputProps, StockLogoEnhancerProps,
} from 'Layers/Behavior/Enhancers/StockLogoEnhancer/StockLogoEnhancer';
import { Progress } from 'Layers/Presentation/Components/Progress';

export interface StockLogoProps extends StockLogoEnhancerInputProps {
  classes: { [key: string]: string };
  className?: string;
  size?: number;
}

type Props = StockLogoProps & StockLogoEnhancerProps;

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
