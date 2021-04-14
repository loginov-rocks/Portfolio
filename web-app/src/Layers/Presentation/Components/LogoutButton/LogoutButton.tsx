import { Button } from '@material-ui/core';
import * as React from 'react';

import {
  LogoutButtonEnhancerInputProps, LogoutButtonEnhancerProps,
} from 'Layers/Behavior/Enhancers/LogoutButtonEnhancer/LogoutButtonEnhancer';

export interface LogoutButtonProps extends LogoutButtonEnhancerInputProps {
  children: React.ReactNode;
  className?: string;
}

type Props = LogoutButtonProps & LogoutButtonEnhancerProps;

export const LogoutButton: React.FunctionComponent<Props> = ({ children, className, handleClick }: Props) => (
  <Button className={className} onClick={handleClick} variant="outlined">{children}</Button>
);
