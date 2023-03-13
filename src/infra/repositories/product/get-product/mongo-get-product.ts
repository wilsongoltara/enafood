import { Product } from '~/appplication/interfaces/product';
import { ProductODM } from '~/appplication/models/product-odm';
import { IGetProductByIdRepository } from '~/infra/controllers/product/get-product/protocols';

export class MongoGetProductByIdRepository
  implements IGetProductByIdRepository
{
  constructor(private _model: ProductODM = new ProductODM()) {}

  async getProductById(id: string): Promise<Product> {
    try {
      const product = await this._model.getById(id);

      if (!product) throw new Error('Product not found');

      return product;
    } catch {
      throw new Error('Internal Error');
    }
  }
}
