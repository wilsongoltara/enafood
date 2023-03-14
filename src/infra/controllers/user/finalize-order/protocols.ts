import { Order } from '~/appplication/interfaces/order';

export interface FinalizeOrderProps {
  paymentMethod: string;
}

export interface IFinalizeOrderRepository {
  finalizeOrder(id: string, props: FinalizeOrderProps): Promise<Order>;
}
