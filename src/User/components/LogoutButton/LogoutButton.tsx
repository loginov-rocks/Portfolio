import * as React from 'react';

import { HandlersProps } from './LogoutButton.enhancer';

interface Props extends HandlersProps {
  children?: React.ReactNode;
}

const LogoutButton: React.FunctionComponent<Props> = ({ children, handleClick }: Props) => (
  <button onClick={handleClick} type="button">{children}</button>
);

export default LogoutButton;
