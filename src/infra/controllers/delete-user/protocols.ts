import { User } from "~/appplication/interfaces/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IDeleteUserRepository {
  deleteUser(id: string): Promise<User>;
}

export interface IDeleteUserController {
  execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>>;
}