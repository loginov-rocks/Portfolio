import axios from 'axios';

export default class ZenMoney {
  protected url = 'https://api.zenmoney.ru';

  protected consumerKey: string;

  protected consumerSecret: string;

  protected redirectUrl: string;

  protected accessToken: string | undefined;

  public static extractAuthorizeCode(location): string {
    const url = new URL(location);
    const params = new URLSearchParams(url.search);

    return params.get('code');
  }

  public constructor(consumerKey, consumerSecret, redirectUrl) {
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this.redirectUrl = redirectUrl;
  }

  public setAccessToken(token): this {
    this.accessToken = token;

    return this;
  }

  public getAuthorizeUrl(): string {
    return `${this.url}/oauth2/authorize?client_id=${this.consumerKey}&redirect_uri=${this.redirectUrl}&response_type=code`;
  }

  public getTokens(code): Promise<{ access_token: string; refresh_token: string }> {
    const params = new URLSearchParams();

    params.append('client_id', this.consumerKey);
    params.append('client_secret', this.consumerSecret);
    params.append('code', code);
    params.append('grant_type', 'authorization_code');
    params.append('redirect_uri', this.redirectUrl);

    return axios.post(`${this.url}/oauth2/token`, params)
      .then(({ data }) => data);
  }

  public getAuthorizationHeader(): { Authorization: string } {
    return { Authorization: `Bearer ${this.accessToken}` };
  }

  public getDiff(currentClientTimestamp, serverTimestamp, payload = {}): Promise<{}> {
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
