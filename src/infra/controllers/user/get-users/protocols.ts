import { User } from '~/appplication/interfaces/user';

export interface IGetUsersRepository {
  getUsers(): Promise<User[]>;
}
