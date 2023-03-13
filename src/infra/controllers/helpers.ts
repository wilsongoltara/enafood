import { HttpResponse, HttpStatusCode } from "./protocols";

export const badRequest = (message: string): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.BAD_REQUEST,
    body: message,
  };
};

export const ok = <T>(body: T): HttpResponse<T> => {
  return {
    statusCode: HttpStatusCode.OK,
    body,
  };
};

export const created = <T>(body: T): HttpResponse<T> => {
  return {
    statusCode: HttpStatusCode.CREATED,
    body,
  };
};

export const internalError = (): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.INTERNAL_ERROR,
    body: 'Something went wrong',
  };
};
