import { Schema } from 'mongoose';
import { Order } from '../interfaces/order';
import { AbstractODM } from './asbract-odm';

export class OrderODM extends AbstractODM<Order> {
  constructor() {
    const orderSchema = new Schema({
      createdAt: {
        type: Date,
      },
      paymentMethod: {
        type: String,
        required: true,
      },
      deliveryAdress: {
        type: String,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
      itemsOrder: {
        type: [{ nameProduct: String, price: Number, quantity: Number }],
        required: true,
      },
    });

    super('Order', orderSchema);
  }
}
