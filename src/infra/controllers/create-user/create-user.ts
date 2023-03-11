import { User } from '~/appplication/interfaces/user';
import { MongoCreateUserRepository } from '~/infra/repositories/create-user/mongo-create-user';
import { HttpRequest, HttpResponse } from '../protocols';
import {
  CreateUserProps,
  ICreateUserController,
  ICreateUserRepository,
} from './protocols';

export class CreateUserController implements ICreateUserController {
  constructor(
    private readonly createUserRepository: ICreateUserRepository = new MongoCreateUserRepository()
  ) {}

  async execute(
    httpRequest: HttpRequest<CreateUserProps>
  ): Promise<HttpResponse<User>> {
    try {
      if (!httpRequest.body) {
        return {
          statusCode: 400,
          body: 'Please specify a body',
        };
      }
      const newUser: User = {
        ...httpRequest.body,
        bag: {
          items: [],
        }
      };

      const userAdded = await this.createUserRepository.createUser(newUser);
      return {
        statusCode: 201,
        body: userAdded,
      };
    } catch (e) {
      return {
        statusCode: 500,
        body: 'Something went wrong.',
      };
    }
  }
}
