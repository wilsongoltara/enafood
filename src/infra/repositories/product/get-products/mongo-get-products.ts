import { Product } from '~/appplication/interfaces/product';
import { ProductODM } from '~/appplication/models/product-odm';
import { IGetProductsRepository } from '~/infra/controllers/product/get-products/protocols';

export class MongoGetProductsRepository implements IGetProductsRepository {
  constructor(private readonly _model: ProductODM = new ProductODM()) {}

  async getProducts(): Promise<Product[]> {
    try {
      const products = await this._model.getAll();

      return products;
    } catch {
      throw new Error('Internal Error');
    }
  }
}
