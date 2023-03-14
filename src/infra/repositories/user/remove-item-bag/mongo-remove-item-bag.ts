import { ProductODM } from '~/appplication/models/product-odm';
import { UserODM } from '~/appplication/models/user-odm';
import {
  IRemoveItemToBagRepository,
  RemoveItemToBagProps,
  RemoveItemToBagResponse,
} from '~/infra/controllers/user/remove-item-bag/protocols';

export class MongoRemoveItemToBagRepository
  implements IRemoveItemToBagRepository
{
  constructor(
    private _model: UserODM = new UserODM(),
    private _productModel: ProductODM = new ProductODM()
  ) {}

  async removeItem(
    id: string,
    props: RemoveItemToBagProps
  ): Promise<RemoveItemToBagResponse> {
    try {
      const userWithBag = await this._model.getById(id);

      if (!userWithBag) throw new Error('User not found');

      const product = await this._productModel.getById(props.productId);

      if (!product) throw new Error('Product not found');

      const indexProductInBag = userWithBag.bag.findIndex((item) => item.nameProduct === product.name);

      if (indexProductInBag < 0) throw new Error('Product not found in bag');

      const itemToRemove = userWithBag.bag[indexProductInBag];

      if (itemToRemove.quantity > 1) {
        itemToRemove.quantity -= 1;
      } else {
        userWithBag.bag.splice(indexProductInBag, 1);
      }

      const userWithouItemInBag = await this._model.updateById(id, {
        bag: userWithBag.bag,
      });

      if (!userWithouItemInBag) throw new Error('Item not removed');

      return { bag: userWithouItemInBag.bag };
    } catch (err) {
      const e = err as Error;
      throw new Error(e.message);
    }
  }
}
