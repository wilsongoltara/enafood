import { User } from "~/appplication/interfaces/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface UpdateUserProps {
  name?: string;
  email?: string;
  adress?: string;
}

export interface IUpdateUserRepository {
  updateUser(id :string, props: UpdateUserProps): Promise<User>;
}

export interface IUpdateUserController {
  execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>>;
}