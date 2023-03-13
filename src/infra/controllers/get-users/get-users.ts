import { User } from '~/appplication/interfaces/user';
import { IGetUsersRepository } from '~/infra/controllers/get-users/protocols';
import { MongoGetUsersRepository } from '~/infra/repositories/get-users/mongo-get-users';
import { internalError, ok } from '../helpers';
import { HttpResponse, IController } from '../protocols';

export class GetUserController implements IController {
  constructor(
    private readonly getUsersRepository: IGetUsersRepository = new MongoGetUsersRepository()
  ) {}

  async execute(): Promise<HttpResponse<User[] | string>> {
    try {
      const users = await this.getUsersRepository.getUsers();

      return ok<User[]>(users);
    } catch {
      return internalError();
    }
  }
}
