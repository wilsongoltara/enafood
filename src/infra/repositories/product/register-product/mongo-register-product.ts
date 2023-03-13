import { Product } from "~/appplication/interfaces/product";
import { ProductODM } from "~/appplication/models/product-odm";
import { IRegisterProductRepository, RegisterProductProps } from "~/infra/controllers/product/register-product/protocols";

export class MongoRegisterProductRepository implements IRegisterProductRepository {
  constructor(private _model: ProductODM = new ProductODM()) {}
  
  async registerProduct(product: RegisterProductProps): Promise<Product> {
    try {
      const newProduct = await this._model.insert(product);
      return newProduct;
    } catch {
      throw new Error('Internal Error');
    }
  }
}