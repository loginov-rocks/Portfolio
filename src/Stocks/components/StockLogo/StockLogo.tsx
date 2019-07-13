import * as React from 'react';

import Progress from 'Shared/components/Progress';

// TODO: Tests.

export interface Props {
  className?: string;
  logo: string | null;
  logoProgress: boolean;
  size?: number;
}

const StockLogo: React.FunctionComponent<Props> = ({
  className, logo, logoProgress, size,
}: Props) => {
  if (logoProgress) {
    return <Progress className={className} />;
  }

  if (!logo) {
    return null;
  }

  return (
    <div className={className}>
      <img
        alt=""
        src={logo}
        style={{
          height: size,
          objectFit: 'contain',
          verticalAlign: 'top',
          width: size,
        }}
      />
    </div>
  );
};

StockLogo.defaultProps = {
  size: 40,
};

export default StockLogo;
