import axios from 'axios';

export default class ZenMoney {
  url = 'https://api.zenmoney.ru';

  consumerKey: string;

  consumerSecret: string;

  redirectUrl: string;

  accessToken: string | undefined;

  constructor(consumerKey, consumerSecret, redirectUrl) {
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this.redirectUrl = redirectUrl;
  }

  setAccessToken(token) {
    this.accessToken = token;

    return this;
  }

  getAuthorizeUrl() {
    return `${this.url}/oauth2/authorize?client_id=${this.consumerKey}&redirect_uri=${this.redirectUrl}&response_type=code`;
  }

  static extractAuthorizeCode(location) {
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

    return axios.post(`${this.url}/oauth2/token`, params)
      .then(({ data }) => data);
  }

  getAuthorizationHeader() {
    return { Authorization: `Bearer ${this.accessToken}` };
  }

  getDiff(currentClientTimestamp, serverTimestamp, payload = {}) {
    return axios.post(
      `${this.url}/v8/diff`,
      {
        currentClientTimestamp,
        serverTimestamp,
        ...payload,
      },
      {
        headers: { ...this.getAuthorizationHeader() },
      },
    )
      .then(({ data }) => data);
  }
}
