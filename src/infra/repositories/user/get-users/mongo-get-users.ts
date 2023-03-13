import { User } from '~/appplication/interfaces/user';
import { UserODM } from '~/appplication/models/user-odm';
import { IGetUsersRepository } from '~/infra/controllers/user/get-users/protocols';

export class MongoGetUsersRepository implements IGetUsersRepository {
  constructor(private _model: UserODM = new UserODM()) {}

  async getUsers(): Promise<User[]> {
    try {
      const users = await this._model.getAll();
      return users;
    } catch(err) {
      const e = err as Error
      throw new Error(e.message);
    }
  }
}
