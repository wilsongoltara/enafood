import { AddItemToBagProps } from "~/infra/controllers/add-item-bag/protocols";

export interface User {
  name: string;
  email: string;
  adress: string;
  bag: Array<AddItemToBagProps>;
}
