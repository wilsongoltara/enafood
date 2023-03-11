import { MongoGetUsersRepository } from '~/infra/repositories/get-users/mongo-get-users';
import { IGetUserController, IGetUsersRepository } from '~/infra/controllers/get-users/protocols';

export class GetUserController implements IGetUserController {
  constructor(
    private readonly getUsersRepository: IGetUsersRepository = new MongoGetUsersRepository()
  ) {}

  async execute() {
    try {
      const users = await this.getUsersRepository.getUsers();

      return {
        statusCode: 200,
        body: users,
      };
    } catch (e) {
      console.log(e);
      return {
        statusCode: 500,
        body: 'Something went wrong',
      };
    }
  }
}
