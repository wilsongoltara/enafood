import { Product } from "~/appplication/interfaces/product";
import { ProductODM } from "~/appplication/models/product-odm";
import { IUpdateProductRepository, UpdateProductProps } from "~/infra/controllers/product/update-product/protocols";

export class MongoUpdateProductRepository implements IUpdateProductRepository {
  constructor(private _model: ProductODM = new ProductODM()) {}

  async updateProduct(id: string, props: UpdateProductProps): Promise<Product> {
    try {
      const product = await this._model.updateById(id, props);

      if (!product) {
        throw new Error('Product not found');
      }

      return product;
    } catch {
      throw new Error('Internal Error');
    }
  }
}