/* @flow */

export default class ZenMoney {
  constructor(consumerKey, redirectUrl) {
    this.consumerKey = consumerKey;
    this.redirectUrl = redirectUrl;
  }

  getAuthorizeUrl() {
    return `https://api.zenmoney.ru/oauth2/authorize?client_id=${this.consumerKey}&redirect_uri=${this.redirectUrl}&response_type=code`;
  }
}
