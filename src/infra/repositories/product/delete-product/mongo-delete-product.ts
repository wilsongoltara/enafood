import { Product } from '~/appplication/interfaces/product';
import { ProductODM } from '~/appplication/models/product-odm';
import { IDeleteProductRepository } from '~/infra/controllers/product/delete-product/protocols';

export class MongoDeleteProductRepository implements IDeleteProductRepository {
  constructor(private _model: ProductODM = new ProductODM()) {}

  async deleteProduct(id: string): Promise<Product> {
    try {
      const productDeleted = await this._model.getById(id);

      if (!productDeleted) {
        throw new Error('Product not found');
      }

      const deletedCount = await this._model.deleteOne(id);

      if (!deletedCount) {
        throw new Error('Product not deleted');
      }

      return productDeleted;
    } catch {
      throw new Error('Internal Error');
    }
  }
}
