import { Product } from '~/appplication/interfaces/product';

export interface UpdateProductProps {
  name?: string;
  description?: string;
  price?: number;
}

export interface IUpdateProductRepository {
  updateProduct(id: string, props: UpdateProductProps): Promise<Product>;
}
