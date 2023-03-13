import { User } from "~/appplication/interfaces/user";
import { UserODM } from "~/appplication/models/user-odm";
import { IUpdateUserRepository, UpdateUserProps } from "~/infra/controllers/update-user/protocols";

export class MongoUpdateUserRepository implements IUpdateUserRepository {
  constructor(private _model: UserODM = new UserODM()) {}

  async updateUser(id: string, props: UpdateUserProps): Promise<User> {
    const userUpdated = await this._model.updateById(id, props);
  
    if (!userUpdated) {
      throw new Error('UserId not exist');
    }

    return userUpdated; 
  }

}