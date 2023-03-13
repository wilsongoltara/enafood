import { Product } from '~/appplication/interfaces/product';
import { MongoDeleteProductRepository } from '~/infra/repositories/product/delete-product/mongo-delete-product';
import { badRequest, internalError, ok } from '../../helpers';
import { HttpRequest, HttpResponse, IController } from '../../protocols';
import { IDeleteProductRepository } from './protocols';

export class DeleteProductController implements IController {
  constructor(
    private readonly deleteProductRepository: IDeleteProductRepository = new MongoDeleteProductRepository()
  ) {}

  async execute(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<Product | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest('Missing product id');
      }

      const product = await this.deleteProductRepository.deleteProduct(id);

      return ok<Product>(product);
    } catch (err) {
      const e = err as Error;
      return internalError(e.message);
    }
  }
}
