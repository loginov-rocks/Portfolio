import * as React from 'react';

interface Props {
  children: React.ReactNode;
  handleClick: () => void;
}

const ProviderLoginButton: React.FunctionComponent<Props> = ({ children, handleClick }: Props) => (
  <button onClick={handleClick} type="button">{children}</button>
);

export default ProviderLoginButton;
