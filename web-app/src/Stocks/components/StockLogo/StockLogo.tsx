import classNames from 'classnames';
import * as React from 'react';

import { Progress } from 'Layers/Presentation/Progress';

export interface Props {
  classes: { [key: string]: string };
  className?: string;
  logo: string | null;
  logoProgress: boolean;
  size?: number;
}

const StockLogo: React.FunctionComponent<Props> = ({
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

export default StockLogo;
