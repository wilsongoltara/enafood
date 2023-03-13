import { Product } from "~/appplication/interfaces/product";

export interface IGetProductByIdRepository {
  getProductById(id: string): Promise<Product>;
}