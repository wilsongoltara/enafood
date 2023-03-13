import { User } from '~/appplication/interfaces/user';
import {
  CreateUserProps,
  ICreateUserRepository
} from '~/infra/controllers/create-user/protocols';
import { IGetUsersRepository } from '~/infra/controllers/get-users/protocols';
import { IUpdateUserRepository, UpdateUserProps } from '~/infra/controllers/update-user/protocols';

export class InMemoryGetUsersRepository implements IGetUsersRepository {
  public users: User[] = [];

  async getUsers(): Promise<User[]> {
    return this.users;
  }
}

export class InMemoryCreateUserRepository implements ICreateUserRepository {
  public users: User[] = [];

  async createUser(props: CreateUserProps): Promise<User> {
    const newUser: User = {
      ...props,
      bag: [],
    };

    this.users.push(newUser);

    return newUser;
  }
}

export class InMemoryUpdateUserRepository implements IUpdateUserRepository {
  public users: User[] = [];

  async save(user: User): Promise<void> {
    const userIndex = this.users.findIndex(
      (_user) => _user.id === user.id
    );
  
    if (userIndex >= 0) {
      this.users[userIndex] = user;
    }
  }

  async updateUser(userId: string, props: UpdateUserProps): Promise<User> {
    const user = this.users.find((user) => user?.id === userId);

    if (!user) throw new Error('UserId not exist');

    const userUpdated = { ...user, ...props };

    this.save(userUpdated);

    return userUpdated;
  }
}

