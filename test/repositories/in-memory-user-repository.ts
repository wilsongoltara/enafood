import { User } from '~/appplication/interfaces/user';
import { IGetUsersRepository } from '~/infra/controllers/get-users/protocols';

export class InMemoryGetUsersRepository implements IGetUsersRepository {
  public users: User[] = [];

  async getUsers(): Promise<User[]> {
    return this.users;
  }

  // async findById(userId: string): Promise<User | null> {
  //   const user = this.users.find((user) => user.value.id === userId);

  //   if (!user) return null;

  //   return user;
  // }

  // async create(user: User): Promise<void> {
  //   this.users.push(user);
  // }

  // async save(user: User): Promise<void> {
  //   const userIndex = this.users.findIndex(
  //     (_user) => _user.value.id === user.value.id
  //   );

  //   if (userIndex >= 0) {
  //     this.users[userIndex] = user;
  //   }
  // }
}
