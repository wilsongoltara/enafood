import { User } from '~/appplication/interfaces/user';
import { HttpRequest, HttpResponse } from '../protocols';

export interface CreateUserProps {
  name: string;
  email: string;
  adress: string;
}

export interface ICreateUserRepository {
  createUser(user: CreateUserProps): Promise<User>;
}

export interface ICreateUserController {
  execute(httpRequest: HttpRequest<CreateUserProps>): Promise<HttpResponse<User>>
}
