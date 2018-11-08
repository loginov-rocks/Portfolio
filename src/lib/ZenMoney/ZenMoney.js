/* @flow */

import axios from 'axios';

export default class ZenMoney {
  constructor(consumerKey, consumerSecret, redirectUrl) {
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this.redirectUrl = redirectUrl;
  }

  getAuthorizeUrl() {
    return `https://api.zenmoney.ru/oauth2/authorize?client_id=${this.consumerKey}&redirect_uri=${this.redirectUrl}&response_type=code`;
  }

  extractAuthorizeCode(location) {
    const url = new URL(location);
    const params = new URLSearchParams(url.search);

    return params.get('code');
  }

  getTokens(code) {
    const params = new URLSearchParams();

    params.append('client_id', this.consumerKey);
    params.append('client_secret', this.consumerSecret);
    params.append('code', code);
    params.append('grant_type', 'authorization_code');
    params.append('redirect_uri', this.redirectUrl);

    return axios.post('https://api.zenmoney.ru/oauth2/token', params)
      .then(({ data }) => data);
  }
}
