import { Product } from '~/appplication/interfaces/product';

export interface IDeleteProductRepository {
  deleteProduct(id: string): Promise<Product>;
}
