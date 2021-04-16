export interface HomeState {
  homeTab: 'closed' | 'open' | 'summary';
  sorters: {
    [key: string]: {
      key?: string;
      order?: 'asc' | 'desc';
    };
  };
}
