export const ANALYTICS = '/analytics';
export const PROFILE = '/profile';

export const CLOSE_POSITION = '/position/:id/close';
export const DELETE_POSITION = '/position/:id/delete';
export const UPDATE_POSITION = '/position/:id/update';
export const POSITION = '/position/:id';
export const CREATE_POSITION = '/position';

export const HOME = '/';

// With path params.
export const toClosePosition = (id: string): string => `/position/${id}/close`;
export const toDeletePosition = (id: string): string => `/position/${id}/delete`;
export const toUpdatePosition = (id: string): string => `/position/${id}/update`;
export const toPosition = (id: string): string => `/position/${id}`;

export type Route =
  | typeof ANALYTICS
  | typeof PROFILE
  | typeof CLOSE_POSITION
  | typeof DELETE_POSITION
  | typeof UPDATE_POSITION
  | typeof POSITION
  | typeof CREATE_POSITION
  | typeof HOME;
