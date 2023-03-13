import { HttpRequest, HttpResponse } from "../protocols";

export interface AddItemToBagProps {
  item: any;
  quantity: number;
}

export interface AddItemToBagResponse {
  bag: Array<AddItemToBagProps>
}

export interface IAddItemToBagRepository {
  addItemToBag(userId: string, props: AddItemToBagProps): Promise<AddItemToBagResponse>;
}

export interface IAddItemToBagController {
  execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<AddItemToBagResponse>>;
}