import { combineReducers } from 'redux';

import { CurrenciesReducer } from 'Layers/Application/Reducers/CurrenciesReducer/CurrenciesReducer';
import { FirebaseReducer } from 'Layers/Application/Reducers/FirebaseReducer/FirebaseReducer';
import { HomeReducer } from 'Layers/Application/Reducers/HomeReducer/HomeReducer';
import { StocksReducer } from 'Layers/Application/Reducers/StocksReducer/StocksReducer';

export default combineReducers({
  currencies: CurrenciesReducer,
  firebase: FirebaseReducer,
  home: HomeReducer,
  stocks: StocksReducer,
});
