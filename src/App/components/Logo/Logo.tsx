import { Typography } from '@material-ui/core';
import { BusinessCenterOutlined } from '@material-ui/icons';
import * as React from 'react';

const Logo: React.FunctionComponent = () => (
  <Typography variant="h4">
    <BusinessCenterOutlined />
    {' '}
    Portfolio
  </Typography>
);

export default Logo;
