import * as React from 'react';

interface Props {
  children: JSX.Element;
  handleClick: () => void;
}

const ProviderLoginButton = ({ children, handleClick }: Props) => (
  <button onClick={handleClick} type="button">{children}</button>
);

export default ProviderLoginButton;
