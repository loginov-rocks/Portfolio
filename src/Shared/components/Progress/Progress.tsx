import { CircularProgress } from '@material-ui/core';
import * as React from 'react';

interface Props {
  className?: string;
  size?: 'large';
}

const Progress: React.FunctionComponent<Props> = ({ className, size }: Props) => {
  let sizeProp;

  if (size === 'large') {
    sizeProp = 64;
  }

  return <CircularProgress className={className} size={sizeProp} />;
};

export default Progress;
