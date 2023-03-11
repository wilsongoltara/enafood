import { ICreateUserRepository } from '~/infra/controllers/create-user/protocols';
import { User } from '~/appplication/interfaces/user';
import { UserODM } from '~/appplication/models/user-odm';

export class MongoCreateUserRepository implements ICreateUserRepository {
  constructor(private _model: UserODM = new UserODM()) {}

  async createUser(user: User): Promise<User> {
    try {
      const newUser = await this._model.insert(user);
      return newUser;
    } catch {
      throw new Error('Internal Error');
    }
  }
}
