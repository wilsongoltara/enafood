import { User } from '~/appplication/interfaces/user';

export interface CreateUserProps {
  name: string;
  email: string;
  adress: string;
}

export interface ICreateUserRepository {
  createUser(user: CreateUserProps): Promise<User>;
}
