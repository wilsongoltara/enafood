import { MongoAddItemBagRepository } from '~/infra/repositories/add-item-bag/mongo-add-item-bag';
import { HttpRequest } from '../protocols';
import {
  AddItemToBagProps,
  IAddItemToBagController,
  IAddItemToBagRepository,
} from './protocols';

export class AddItemToBagController implements IAddItemToBagController {
  constructor(
    private readonly addItemBagRepository: IAddItemToBagRepository = new MongoAddItemBagRepository()
  ) {}

  async execute(httpRequest: HttpRequest<any>) {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return {
          statusCode: 400,
          body: 'Missing user id',
        };
      }

      const requiredFields = ['item', 'quantity'];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof AddItemToBagProps]) {
          return {
            statusCode: 400,
            body: `Field ${field} is required`,
          };
        }
      }

      const bagUpdated = await this.addItemBagRepository.addItemToBag(id, body);

      return {
        statusCode: 200,
        body: bagUpdated,
      };
    } catch (e: unknown) {
      const err = e as Error;
      return {
        statusCode: 500,
        body: err.message,
      };
    }
  }
}
