import * as React from 'react';

export interface Props {
  children: React.ReactNode;
  handleClick: () => void;
}

const LogoutButton: React.FunctionComponent<Props> = ({ children, handleClick }: Props) => (
  <button onClick={handleClick} type="button">{children}</button>
);

export default LogoutButton;
