import { User } from '~/appplication/interfaces/user';
import { UserODM } from '~/appplication/models/user-odm';
import { IDeleteUserRepository } from '~/infra/controllers/user/delete-user/protocols';

export class MongoDeleteUserRepository implements IDeleteUserRepository {
  constructor(private _model: UserODM = new UserODM()) {}

  async deleteUser(id: string): Promise<User> {
    try {
      const user = await this._model.getById(id);

      if (!user) {
        throw new Error('User not found');
      }

      const deletedCount = await this._model.deleteOne(id);

      if (!deletedCount) {
        throw new Error('User not deleted');
      }

      return user;
    } catch {
      throw new Error('Internal Error');
    }
  }
}
