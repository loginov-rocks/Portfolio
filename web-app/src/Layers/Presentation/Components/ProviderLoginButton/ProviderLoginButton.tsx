import { Button } from '@material-ui/core';
import * as React from 'react';

import {
  ProviderLoginButtonEnhancerInputProps, ProviderLoginButtonEnhancerProps,
} from 'Layers/Behavior/Enhancers/ProviderLoginButtonEnhancer/ProviderLoginButtonEnhancer';

export interface ProviderLoginButtonProps extends ProviderLoginButtonEnhancerInputProps {
  children: React.ReactNode;
}

type Props = ProviderLoginButtonProps & ProviderLoginButtonEnhancerProps;

export const ProviderLoginButton: React.FunctionComponent<Props> = ({ children, handleClick }: Props) => (
  <Button color="primary" onClick={handleClick} variant="contained">{children}</Button>
);
