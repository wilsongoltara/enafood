export interface AddItemToBagProps {
  item: any;
  quantity: number;
}

export interface AddItemToBagResponse {
  bag: Array<AddItemToBagProps>;
}

export interface IAddItemToBagRepository {
  addItemToBag(
    userId: string,
    props: AddItemToBagProps
  ): Promise<AddItemToBagResponse>;
}
