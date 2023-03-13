export interface HttpResponse<T> {
  statusCode: number,
  body: T;
}

export interface HttpRequest<B> {
  body?: B,
  params?: any,
  headers?: any, 
}

export interface IController {
  execute(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>; 
}