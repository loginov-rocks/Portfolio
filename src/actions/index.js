/* @flow */

import zenMoney from '../lib/ZenMoney/instance';
import * as T from './types';

export const fetchTokens = code => dispatch => {
  dispatch({ type: T.TOKENS_REQUESTED });

  zenMoney.getTokens(code)
    .then(tokens => dispatch({ payload: tokens, type: T.TOKENS_RECEIVED }));
};
