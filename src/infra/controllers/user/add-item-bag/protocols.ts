import { BagItem } from '~/appplication/interfaces/user';

export interface AddItemToBagProps {
  productId: string;
  quantity: number;
}

export interface AddItemToBagResponse {
  bag: Array<BagItem>;
}

export interface IAddItemToBagRepository {
  addItemToBag(
    userId: string,
    props: AddItemToBagProps
  ): Promise<AddItemToBagResponse>;
}
