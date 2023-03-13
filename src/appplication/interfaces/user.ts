import { AddItemToBagProps } from "~/infra/controllers/add-item-bag/protocols";

export interface User {
  id?: string;
  name: string;
  email: string;
  adress: string;
  bag: Array<AddItemToBagProps>;
}
