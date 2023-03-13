export interface HttpResponse<T> {
  statusCode: HttpStatusCode,
  body: T;
}

export interface HttpRequest<B> {
  body?: B,
  params?: any,
  headers?: any, 
}

export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  CREATED = 201,
  INTERNAL_ERROR = 500
}

export interface IController {
  execute(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>; 
}