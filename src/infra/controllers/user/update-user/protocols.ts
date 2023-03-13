import { User } from '~/appplication/interfaces/user';

export interface UpdateUserProps {
  name?: string;
  email?: string;
  adress?: string;
}

export interface IUpdateUserRepository {
  updateUser(id: string, props: UpdateUserProps): Promise<User>;
}
