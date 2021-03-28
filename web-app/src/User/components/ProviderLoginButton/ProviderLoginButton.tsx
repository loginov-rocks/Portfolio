import { Button } from '@material-ui/core';
import * as React from 'react';

export interface Props {
  children: React.ReactNode;
  handleClick: () => void;
}

const ProviderLoginButton: React.FunctionComponent<Props> = ({ children, handleClick }: Props) => (
  <Button color="primary" onClick={handleClick} variant="contained">{children}</Button>
);

export default ProviderLoginButton;
