import * as R from './routes';

export interface RouteParamsState {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default interface State {
  homeTab: 'closed' | 'open' | 'summary';
  route: R.Route;
  routeParams: RouteParamsState;
  sorters: {
    [key: string]: {
      key?: string;
      order?: 'asc' | 'desc';
    };
  };
} // eslint-disable-line semi
