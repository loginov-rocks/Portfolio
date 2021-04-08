export interface HttpRequest<TBody> {
  body: TBody;
  method: string;
}
