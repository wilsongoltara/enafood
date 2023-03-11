import { Schema } from 'mongoose';
import { AbstractODM } from './asbract-odm';
import { User } from '../interfaces/user';

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
        items: {
          type: Array,
        },
      },
    });

    super('User', userSchema);
  }
}
