import { BagItem } from '~/appplication/interfaces/user';

export interface RemoveItemToBagResponse {
  bag: Array<BagItem>;
}

export interface RemoveItemToBagProps {
  productId: string;
}

export interface IRemoveItemToBagRepository {
  removeItem(id: string, props: RemoveItemToBagProps): Promise<RemoveItemToBagResponse>;
}
