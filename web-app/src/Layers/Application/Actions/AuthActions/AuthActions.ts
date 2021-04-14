export const SIGN_IN_TRIGGERED = 'auth/SIGN_IN_TRIGGERED';
export const LOGOUT_TRIGGERED = 'auth/LOGOUT_TRIGGERED';

export interface SignInTriggeredAction {
  type: typeof SIGN_IN_TRIGGERED;
  payload: string;
}

export interface LogoutTriggeredAction {
  type: typeof LOGOUT_TRIGGERED;
}

export const signInTriggered = (provider: string): SignInTriggeredAction => ({
  payload: provider,
  type: SIGN_IN_TRIGGERED,
});

export const logoutTriggered = (): LogoutTriggeredAction => ({
  type: LOGOUT_TRIGGERED,
});
