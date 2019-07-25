export const CLOSE_POSITION = 'CLOSE_POSITION';
export const CREATE_POSITION = 'CREATE_POSITION';
export const HOME = 'HOME';
export const POSITION = 'POSITION';
export const PROFILE = 'PROFILE';
export const UPDATE_POSITION = 'UPDATE_POSITION';

export type Route =
  | typeof CLOSE_POSITION
  | typeof CREATE_POSITION
  | typeof HOME
  | typeof POSITION
  | typeof PROFILE
  | typeof UPDATE_POSITION;
