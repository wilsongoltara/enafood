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
    const requiredFields = ['name','email', 'adress'];

    // if fields is valid
    for (const field of requiredFields) {
      if (!httpRequest?.body?.[field as keyof CreateUserProps]?.length) {
        return {
          statusCode: 400,
          body: `Field ${field} is required`,
        };
      } 
    }

    try {
      const newUser: User = {
        ...httpRequest.body!,
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
