import { CircularProgress } from '@material-ui/core';
import * as React from 'react';

interface Props {
  size?: 'large';
}

const Progress: React.FunctionComponent<Props> = ({ size }: Props) => {
  let sizeProp;

  if (size === 'large') {
    sizeProp = 64;
  }

  return <CircularProgress size={sizeProp} />;
};

export default Progress;
