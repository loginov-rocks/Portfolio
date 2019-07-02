import * as R from './routes';

export default interface State {
  route: R.Route;
  routeParams: {
    [key: string]: any;
  };
} // eslint-disable-line semi
