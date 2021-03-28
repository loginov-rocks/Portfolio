export default interface State {
  homeTab: 'closed' | 'open' | 'summary';
  sorters: {
    [key: string]: {
      key?: string;
      order?: 'asc' | 'desc';
    };
  };
} // eslint-disable-line semi
