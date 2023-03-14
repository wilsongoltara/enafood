import { Order } from '~/appplication/interfaces/order';
import { MongoFinalizeOrderRepository } from '~/infra/repositories/user/finalize-order/mongo-finalize-order';
import { badRequest, created, internalError } from '../../helpers';
import { HttpRequest, HttpResponse, IController } from '../../protocols';
import { FinalizeOrderProps, IFinalizeOrderRepository } from './protocols';

export class FinalizeOrderController implements IController {
  constructor(
    private readonly finalizeOrderRepository: IFinalizeOrderRepository = new MongoFinalizeOrderRepository()
  ) {}

  async execute(
    httpRequest: HttpRequest<FinalizeOrderProps>
  ): Promise<HttpResponse<Order | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) badRequest('Missing user id');

      if (!body?.['paymentMethod']) {
        return badRequest('Field paymentMethod is required');
      }

      const orderFinished = await this.finalizeOrderRepository.finalizeOrder(
        id,
        body!
      );

      return created<Order>(orderFinished);
    } catch (err) {
      const e = err as Error;
      return internalError(e.message);
    }
  }
}
