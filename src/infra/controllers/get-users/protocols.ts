import { User } from '~/appplication/interfaces/user';
import { HttpResponse } from '../protocols';

export interface IGetUsersRepository {
  getUsers(): Promise<User[]>;
}

export interface IGetUserController {
  execute(): Promise<HttpResponse<User[]>>
}