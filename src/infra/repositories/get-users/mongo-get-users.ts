import { IGetUsersRepository } from '~/infra/controllers/get-users/protocols';
import { User } from '~/appplication/interfaces/user';
import { UserODM } from '~/appplication/models/user-odm';

export class MongoGetUsersRepository implements IGetUsersRepository {
  constructor(private _model: UserODM = new UserODM()) {}

  async getUsers(): Promise<User[]> {
    const users = await this._model.getAll();
    return users;
  }
}
