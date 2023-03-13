import { Product } from '~/appplication/interfaces/product';
import { MongoGetProductsRepository } from '~/infra/repositories/product/get-products/mongo-get-products';
import { internalError, ok } from '../../helpers';
import { HttpResponse, IController } from '../../protocols';
import { IGetProductsRepository } from './protocols';

export class GetProductsController implements IController {
  constructor(
    private readonly getProductsRepository: IGetProductsRepository = new MongoGetProductsRepository()
  ) {}

  async execute(): Promise<HttpResponse<Product[] | string>> {
    try {
      const products = await this.getProductsRepository.getProducts();

      return ok<Product[]>(products);
    } catch (err) {
      const e = err as Error;
      return internalError(e.message);
    }
  }
}
