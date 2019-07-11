import { Button } from '@material-ui/core';
import * as React from 'react';

export interface Props {
  children: React.ReactNode;
  className?: string;
  handleClick: () => void;
}

const LogoutButton: React.FunctionComponent<Props> = ({ children, className, handleClick }: Props) => (
  <Button className={className} onClick={handleClick} variant="outlined">{children}</Button>
);

export default LogoutButton;
