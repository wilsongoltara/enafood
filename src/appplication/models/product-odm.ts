import { Schema } from 'mongoose';
import { Product } from '../interfaces/product';
import { AbstractODM } from './asbract-odm';

export class ProductODM extends AbstractODM<Product> {
  constructor() {
    const productSchema = new Schema({
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    });

    super('Product', productSchema);
  }
}
