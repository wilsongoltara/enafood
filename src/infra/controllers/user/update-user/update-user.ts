import { User } from '~/appplication/interfaces/user';
import { MongoUpdateUserRepository } from '~/infra/repositories/user/update-user/mongo-update-user';
import { badRequest, internalError, ok } from '../../helpers';
import { HttpRequest, HttpResponse, IController } from '../../protocols';
import { IUpdateUserRepository, UpdateUserProps } from './protocols';

export class UpdateUserController implements IController {
  constructor(
    private readonly updateUserRepository: IUpdateUserRepository = new MongoUpdateUserRepository()
  ) {}

  async execute(
    httpRequest: HttpRequest<UpdateUserProps>
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return badRequest('Missing user id');
      }

      if (!body) {
        return badRequest('Missing fields');
      }

      const allowedFieldsToUpdate = ['name', 'email', 'adress'];
      const somefiledIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key)
      );

      if (somefiledIsNotAllowedToUpdate) {
        return badRequest('Some received field is not allowed');
      }

      const userUpdated = await this.updateUserRepository.updateUser(id, body);

      return ok<User>(userUpdated);
    } catch {
      return internalError();
    }
  }
}
