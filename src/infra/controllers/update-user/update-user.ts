import { MongoUpdateUserRepository } from '~/infra/repositories/update-user/mongo-update-user';
import { HttpRequest } from '../protocols';
import { IUpdateUserController, IUpdateUserRepository } from './protocols';

export class UpdateUserController implements IUpdateUserController {
  constructor(
    private readonly updateUserRepository: IUpdateUserRepository = new MongoUpdateUserRepository()
  ) {}

  async execute(httpRequest: HttpRequest<any>) {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return {
          statusCode: 400,
          body: 'Missing user id',
        };
      }

      const allowedFieldsToUpdate = ['name', 'email', 'adress'];
      const somefiledIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key)
      );

      if (somefiledIsNotAllowedToUpdate) {
        return {
          statusCode: 400,
          body: 'Bad request',
        };
      }

      const userUpdated = await this.updateUserRepository.updateUser(id, body);

      return {
        statusCode: 200,
        body: userUpdated,
      }
    } catch (e: unknown) {
      const err = e as Error;
      return {
        statusCode: 400,
        body: err.message,
      };
    }
  }
}
