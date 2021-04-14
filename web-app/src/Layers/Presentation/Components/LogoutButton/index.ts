import { LogoutButtonEnhancer } from 'Layers/Behavior/Enhancers/LogoutButtonEnhancer/LogoutButtonEnhancer';

import { LogoutButton as LogoutButtonComponent, LogoutButtonProps } from './LogoutButton';

export const LogoutButton = LogoutButtonEnhancer<LogoutButtonProps>()(LogoutButtonComponent);
