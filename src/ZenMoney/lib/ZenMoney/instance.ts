import * as C from '../../../constants';
import ZenMoney from './ZenMoney';

const instance = new ZenMoney(
  C.ZENMONEY_CONSUMER_KEY,
  C.ZENMONEY_CONSUMER_SECRET,
  C.ZENMONEY_REDIRECT_URL,
);

export default instance;
