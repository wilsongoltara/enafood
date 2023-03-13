import { MongoAddItemBagRepository } from '~/infra/repositories/user/add-item-bag/mongo-add-item-bag';
import { badRequest, internalError, ok } from '../../helpers';
import { HttpRequest, HttpResponse, IController } from '../../protocols';
import {
  AddItemToBagProps,
  AddItemToBagResponse,
  IAddItemToBagRepository,
} from './protocols';

export class AddItemToBagController implements IController {
  constructor(
    private readonly addItemBagRepository: IAddItemToBagRepository = new MongoAddItemBagRepository()
  ) {}

  async execute(
    httpRequest: HttpRequest<AddItemToBagProps>
  ): Promise<HttpResponse<AddItemToBagResponse | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return badRequest('Missing user id');
      }

      if (!body) {
        return badRequest('Missing fields');
      }

      const requiredFields = ['item', 'quantity'];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof AddItemToBagProps]) {
          return badRequest(`Field ${field} is required`);
        }
      }

      const bagUpdated = await this.addItemBagRepository.addItemToBag(id, body);

      return ok<AddItemToBagResponse>(bagUpdated);
    } catch (err) {
      const e = err as Error;
      return internalError(e.message);
    }
  }
}
