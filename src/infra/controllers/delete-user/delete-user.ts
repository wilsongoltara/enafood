import { User } from "~/appplication/interfaces/user";
import { MongoDeleteUserRepository } from "~/infra/repositories/delete-user/mongo-delete-user";
import { HttpRequest, HttpResponse } from "../protocols";
import { IDeleteUserController, IDeleteUserRepository } from "./protocols";

export class DeleteUserController implements IDeleteUserController {
  constructor(
    private readonly deleteUserRepository: IDeleteUserRepository = new MongoDeleteUserRepository()
  ) {}

  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return {
          statusCode: 400,
          body: 'Missing user id',
        }
      }

      const user = await this.deleteUserRepository.deleteUser(id);

      return {
        statusCode: 200,
        body: user,
      }

    } catch(e) {
      const err = e as Error;

      return {
        statusCode: 400,
        body: err.message
      }
    }
  }
}