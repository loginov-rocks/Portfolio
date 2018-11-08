/* @flow */

import axios from 'axios';

export default class ZenMoney {
  constructor(consumerKey, consumerSecret, redirectUrl) {
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this.redirectUrl = redirectUrl;
  }

  setToken(token) {
    this.token = token;

    return this;
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

  getAuthorizationHeaders() {
    return { Authorization: `Bearer ${this.token}` };
  }

  getDiff(currentClientTimestamp = Date.now() / 1000, serverTimestamp = 0,
          payload = {}) {
    return axios.post(
      'https://api.zenmoney.ru/v8/diff',
      {
        currentClientTimestamp,
        serverTimestamp,
        ...payload,
      },
      {
        headers: this.getAuthorizationHeaders(),
      },
    )
      .then(({ data }) => data);
  }
}
