import { BagItem } from "./user";

export interface Order {
  createdAt?: Date;
  paymentMethod: string;
  deliveryAdress: string;
  itemsOrder: BagItem[];
  total: number;
};
