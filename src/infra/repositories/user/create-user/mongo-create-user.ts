import { User } from '~/appplication/interfaces/user';
import { UserODM } from '~/appplication/models/user-odm';
import { ICreateUserRepository } from '~/infra/controllers/user/create-user/protocols';

export class MongoCreateUserRepository implements ICreateUserRepository {
  constructor(private _model: UserODM = new UserODM()) {}

  async createUser(user: User): Promise<User> {
    try {
      const newUser = await this._model.insert(user);
      return newUser;
    } catch(err) {
      const e = err as Error
      throw new Error(e.message);
    }
  }
}
