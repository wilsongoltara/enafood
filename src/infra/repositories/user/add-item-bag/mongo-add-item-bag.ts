import { ProductODM } from '~/appplication/models/product-odm';
import { UserODM } from '~/appplication/models/user-odm';
import {
  AddItemToBagProps,
  AddItemToBagResponse,
  IAddItemToBagRepository,
} from '~/infra/controllers/user/add-item-bag/protocols';

export class MongoAddItemBagRepository implements IAddItemToBagRepository {
  constructor(
    private _model: UserODM = new UserODM(),
    private _productModel: ProductODM = new ProductODM()
  ) {}

  async addItemToBag(
    id: string,
    props: AddItemToBagProps
  ): Promise<AddItemToBagResponse> {
    try {
      const userWithBag = await this._model.getById(id);

      if (!userWithBag) {
        throw new Error('User not found');
      }

      const product = await this._productModel.getById(props.productId);

      if (!product) throw new Error('Product not found');

      const positionItem = userWithBag.bag.findIndex(
        (itemBag) => itemBag.nameProduct === product.name,
      );
      
      if (positionItem !== -1) {
        userWithBag.bag[positionItem].quantity += props.quantity;
      } else {
        const productAdded = {
          nameProduct: product.name,
          price: product.price,
          quantity: props.quantity,
        };
        userWithBag.bag.push(productAdded);
      }

      const userUpdated = await this._model.updateById(id, userWithBag);

      if (!userUpdated) {
        throw new Error('User not updated');
      }

      return { bag: userUpdated.bag };
    } catch (err) {
      const e = err as Error;
      throw new Error(e.message);
    }
  }
}
