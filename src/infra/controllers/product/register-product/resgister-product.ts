import { Product } from '~/appplication/interfaces/product';
import { MongoRegisterProductRepository } from '~/infra/repositories/product/register-product/mongo-register-product';
import { badRequest, created, internalError } from '../../helpers';
import { HttpRequest, HttpResponse, IController } from '../../protocols';
import { IRegisterProductRepository, RegisterProductProps } from './protocols';

export class RegisterProductController implements IController {
  constructor(
    private readonly registerProductRepository: IRegisterProductRepository = new MongoRegisterProductRepository()
  ) {}

  async execute(
    httpRequest: HttpRequest<RegisterProductProps>
  ): Promise<HttpResponse<Product | string>> {
    try {
      const requiredFields = ['name', 'description', 'price'];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof RegisterProductProps]) {
          return badRequest(`Field ${field} is required`);
        }
      }

      const userAdded = await this.registerProductRepository.registerProduct(
        httpRequest.body!
      );

      return created<Product>(userAdded);
    } catch (err) {
      const e = err as Error;
      return internalError(e.message);
    }
  }
}
