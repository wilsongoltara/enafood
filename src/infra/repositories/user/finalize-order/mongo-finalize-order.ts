import { Order } from '~/appplication/interfaces/order';
import { OrderODM } from '~/appplication/models/order-odm';
import { UserODM } from '~/appplication/models/user-odm';
import {
  FinalizeOrderProps,
  IFinalizeOrderRepository,
} from '~/infra/controllers/user/finalize-order/protocols';

export class MongoFinalizeOrderRepository implements IFinalizeOrderRepository {
  constructor(
    private _model: OrderODM = new OrderODM(),
    private _userModel: UserODM = new UserODM()
  ) {}

  async finalizeOrder(id: string, props: FinalizeOrderProps): Promise<Order> {
    try {
      const user = await this._userModel.getById(id);

      if (!user) throw new Error('User not found');

      const newOrder: Order = {
        deliveryAdress: user.adress,
        paymentMethod: props.paymentMethod,
        createdAt: new Date(),
        itemsOrder: user.bag,
        total: user.bag.reduce(
          (acc, itemCurrent) =>
            (acc += itemCurrent.quantity * itemCurrent.price),
          0
        ),
      };

      const order = await this._model.insert(newOrder);

      return order;
    } catch (err) {
      const e = err as Error;
      throw new Error(e.message);
    }
  }
}
