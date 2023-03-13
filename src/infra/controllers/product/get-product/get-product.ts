import { Product } from '~/appplication/interfaces/product';
import { MongoGetProductByIdRepository } from '~/infra/repositories/product/get-product/mongo-get-product';
import { badRequest, internalError, ok } from '../../helpers';
import { HttpRequest, HttpResponse, IController } from '../../protocols';
import { IGetProductByIdRepository } from './protocols';

export class GetProductByIdController implements IController {
  constructor(
    private readonly getProductRepository: IGetProductByIdRepository = new MongoGetProductByIdRepository()
  ) {}

  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<Product | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest('Missing product id');
      }

      const product = await this.getProductRepository.getProductById(id);

      return ok<Product>(product);
    } catch (err) {
      const e = err as Error;
      return internalError(e.message);
    }
  }
}
