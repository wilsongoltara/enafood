import { MongoRemoveItemToBagRepository } from '~/infra/repositories/user/remove-item-bag/mongo-remove-item-bag';
import { badRequest, internalError, ok } from '../../helpers';
import { HttpRequest, HttpResponse, IController } from '../../protocols';
import {
  IRemoveItemToBagRepository,
  RemoveItemToBagProps,
  RemoveItemToBagResponse,
} from './protocols';

export class RemoveItemToBagController implements IController {
  constructor(
    private readonly removeItemBagRepository: IRemoveItemToBagRepository = new MongoRemoveItemToBagRepository()
  ) {}

  async execute(
    httpRequest: HttpRequest<RemoveItemToBagProps>
  ): Promise<HttpResponse<RemoveItemToBagResponse | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) return badRequest('Missing user id');

      if (!body) return badRequest('Missing product id');

      const { bag } = await this.removeItemBagRepository.removeItem(id, {
        productId: body.productId,
      });

      return ok<RemoveItemToBagResponse>({ bag });
    } catch (err) {
      const e = err as Error;
      return internalError(e.message);
    }
  }
}
