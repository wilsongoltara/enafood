import { User } from "~/appplication/interfaces/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface UpdadeUserProps {
  name?: string;
  email?: string;
  adress?: string;
}

export interface IUpdateUserRepository {
  updateUser(id:string, props: UpdadeUserProps): Promise<User>;
}

export interface IUpdateUserController {
  execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>>;
}