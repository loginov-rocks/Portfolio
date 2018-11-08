/* @flow */

import ZenMoney from './ZenMoney';

const instance = new ZenMoney(
  process.env.REACT_APP_ZENMONEY_CONSUMER_KEY,
  process.env.REACT_APP_ZENMONEY_CONSUMER_SECRET,
  process.env.REACT_APP_ZENMONEY_REDIRECT_URL,
);

export default instance;
