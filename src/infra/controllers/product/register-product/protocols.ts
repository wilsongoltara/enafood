import { Product } from '~/appplication/interfaces/product';

export interface RegisterProductProps {
  name: string;
  description: string;
  price: number;
}

export interface IRegisterProductRepository {
  registerProduct(user: RegisterProductProps): Promise<Product>;
}
