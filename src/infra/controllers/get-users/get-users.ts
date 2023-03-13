import { User } from '~/appplication/interfaces/user';
import { IGetUsersRepository } from '~/infra/controllers/get-users/protocols';
import { MongoGetUsersRepository } from '~/infra/repositories/get-users/mongo-get-users';
import { HttpResponse, IController } from '../protocols';

export class GetUserController implements IController {
  constructor(
    private readonly getUsersRepository: IGetUsersRepository = new MongoGetUsersRepository()
  ) {}

  async execute(): Promise<HttpResponse<User[]>> {
    try {
      const users = await this.getUsersRepository.getUsers();

      return {
        statusCode: 200,
        body: users,
      };
    } catch (e: unknown) {
      const err = e as Error;
      return {
        statusCode: 500,
        body: err.message,
      };
    }
  }
}
