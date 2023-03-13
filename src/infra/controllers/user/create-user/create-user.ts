import { User } from '~/appplication/interfaces/user';
import { MongoCreateUserRepository } from '~/infra/repositories/user/create-user/mongo-create-user';
import { badRequest, created, internalError } from '../../helpers';
import { HttpRequest, HttpResponse, IController } from '../../protocols';
import { CreateUserProps, ICreateUserRepository } from './protocols';

export class CreateUserController implements IController {
  constructor(
    private readonly createUserRepository: ICreateUserRepository = new MongoCreateUserRepository()
  ) {}

  async execute(
    httpRequest: HttpRequest<CreateUserProps>
  ): Promise<HttpResponse<User | string>> {
    try {
      const requiredFields = ['name', 'email', 'adress'];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserProps]?.length) {
          return badRequest(`Field ${field} is required`);
        }
      }

      const newUser: User = {
        ...httpRequest.body!,
        bag: [],
      };

      const userAdded = await this.createUserRepository.createUser(newUser);

      return created<User>(userAdded);
    } catch (err) {
      const e = err as Error;
      return internalError(e.message);
    }
  }
}
