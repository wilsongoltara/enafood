import { HttpResponse } from "./protocols";

export const badRequest = (message: string): HttpResponse<string> => {
  return {
    statusCode: 400,
    body: message,
  };
};

export const ok = <T>(body: T): HttpResponse<T> => {
  return {
    statusCode: 200,
    body,
  };
};

export const created = <T>(body: T): HttpResponse<T> => {
  return {
    statusCode: 201,
    body,
  };
};

export const internalError = (): HttpResponse<string> => {
  return {
    statusCode: 201,
    body: 'Something went wrong',
  };
};
