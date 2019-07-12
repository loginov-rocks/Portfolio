import * as React from 'react';

import Progress from 'Shared/components/Progress';

// TODO: Tests.

interface Props {
  logo: string | null;
  logoProgress: boolean;
}

const StockLogo: React.FunctionComponent<Props> = ({ logo, logoProgress }: Props) => {
  if (logoProgress) {
    return <Progress />;
  }

  if (!logo) {
    return null;
  }

  return <img alt="" src={logo} style={{ height: 32, objectFit: 'contain', width: 32 }} />;
};

export default StockLogo;
