import { User } from '~/appplication/interfaces/user';

export interface IDeleteUserRepository {
  deleteUser(id: string): Promise<User>;
}
