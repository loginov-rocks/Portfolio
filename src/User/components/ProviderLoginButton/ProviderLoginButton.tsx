import * as React from 'react';

import { HandlersProps } from './ProviderLoginButton.enhancer';

interface Props extends HandlersProps {
  children?: React.ReactNode;
}

const ProviderLoginButton: React.FunctionComponent<Props> = ({ children, handleClick }: Props) => (
  <button onClick={handleClick} type="button">{children}</button>
);

export default ProviderLoginButton;
