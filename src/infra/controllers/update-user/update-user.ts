import { User } from '~/appplication/interfaces/user';
import { MongoUpdateUserRepository } from '~/infra/repositories/update-user/mongo-update-user';
import { HttpRequest, HttpResponse, IController } from '../protocols';
import { IUpdateUserRepository, UpdateUserProps } from './protocols';

export class UpdateUserController implements IController {
  constructor(
    private readonly updateUserRepository: IUpdateUserRepository = new MongoUpdateUserRepository()
  ) {}

  async execute(
    httpRequest: HttpRequest<UpdateUserProps>
  ): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return {
          statusCode: 400,
          body: 'Missing user id',
        };
      }

      if (!body) {
        return {
          statusCode: 400,
          body: 'Missing fields',
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
      };
    } catch (e: unknown) {
      const err = e as Error;
      return {
        statusCode: 400,
        body: err.message,
      };
    }
  }
}
