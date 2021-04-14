import { Typography } from '@material-ui/core';
import { BusinessCenterOutlined } from '@material-ui/icons';
import * as React from 'react';

interface Props {
  className?: string;
}

export const Logo: React.FunctionComponent<Props> = ({ className }: Props) => (
  <Typography className={className} variant="h4">
    <BusinessCenterOutlined />
    {' '}
    Portfolio
  </Typography>
);

Logo.defaultProps = {
  className: undefined,
};
