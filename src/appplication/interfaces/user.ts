export interface BagItem {
  nameProduct: string;
  price: number;
  quantity: number;
}

export interface User {
  id?: string;
  name: string;
  email: string;
  adress: string;
  bag: Array<BagItem>;
}
