import * as React from 'react';

// TODO: Tests.

interface Props {
  url: string | null;
}

const Logo: React.FunctionComponent<Props> = ({ url }: Props) => {
  if (!url) {
    return null;
  }

  return <img alt="" src={url} style={{ height: 32, objectFit: 'contain', width: 32 }} />;
};

export default Logo;
