import { UserODM } from '~/appplication/models/user-odm';
import {
  AddItemToBagProps,
  IAddItemToBagRepository,
} from '~/infra/controllers/add-item-bag/protocols';
import { AddItemToBagResponse } from '../../controllers/add-item-bag/protocols';

export class MongoAddItemBagRepository implements IAddItemToBagRepository {
  constructor(private _model: UserODM = new UserODM()) {}

  async addItemToBag(
    userId: string,
    props: AddItemToBagProps
  ): Promise<AddItemToBagResponse> {
    try {
      const userWithBag = await this._model.getById(userId);

      if (!userWithBag) {
        throw new Error('Missing user id');
      }

      const positionItem = userWithBag.bag.findIndex((itemBag) => itemBag.item === props.item);
      if (positionItem !== -1) {
        userWithBag.bag[positionItem].quantity += props.quantity;
      } else {
        userWithBag.bag.push(props);
      }
  
      const userUpdated = await this._model.updateById(userId, userWithBag);
  
      if (!userUpdated) {
        throw new Error('Internal Error');
      }
  
      return { bag: userUpdated.bag };
    } catch {
      throw new Error('Internal Error')
    }
  }
}
