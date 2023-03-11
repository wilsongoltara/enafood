import { User } from "~/appplication/interfaces/user";
import { UserODM } from "~/appplication/models/user-odm";
import { IUpdateUserRepository, UpdadeUserProps } from "~/infra/controllers/update-user/protocols";

export class MongoUpdateUserRepository implements IUpdateUserRepository {
  constructor(private _model: UserODM = new UserODM()) {}

  async updateUser(id: string, props: UpdadeUserProps): Promise<User> {
    const userUpdated = await this._model.updateById(id, props);
  
    if (!userUpdated) {
      throw new Error('Internal Error');
    }

    return userUpdated; 
  }

}