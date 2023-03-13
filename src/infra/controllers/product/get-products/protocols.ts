import { Product } from "~/appplication/interfaces/product";

export interface IGetProductsRepository {
  getProducts(): Promise<Product[]>
}