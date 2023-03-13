import { User } from '~/appplication/interfaces/user';
import { MongoDeleteUserRepository } from '~/infra/repositories/delete-user/mongo-delete-user';
import { badRequest, internalError, ok } from '../helpers';
import { HttpRequest, HttpResponse, IController } from '../protocols';
import { IDeleteUserRepository } from './protocols';

export class DeleteUserController implements IController {
  constructor(
    private readonly deleteUserRepository: IDeleteUserRepository = new MongoDeleteUserRepository()
  ) {}

  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest('Missing user id');
      }

      const user = await this.deleteUserRepository.deleteUser(id);

      return ok<User>(user);
    } catch {
      return internalError();
    }
  }
}
