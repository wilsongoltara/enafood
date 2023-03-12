import { Schema } from 'mongoose';
import { User } from '../interfaces/user';
import { AbstractODM } from './asbract-odm';

export class UserODM extends AbstractODM<User> {
  constructor() {
    const userSchema = new Schema({
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      adress: {
        type: String,
        required: true,
      },
      bag: {
        type: [{ item: String, quantity: Number }],
      },
    });

    super('User', userSchema);
  }
}
