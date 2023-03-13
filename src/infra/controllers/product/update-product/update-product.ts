import { Product } from '~/appplication/interfaces/product';
import { MongoUpdateProductRepository } from '~/infra/repositories/product/update-product/mongo-update-product';
import { badRequest, internalError, ok } from '../../helpers';
import { HttpRequest, HttpResponse, IController } from '../../protocols';
import { IUpdateProductRepository, UpdateProductProps } from './protocols';

export class UpdateProductController implements IController {
  constructor(
    private readonly updateProductRepository: IUpdateProductRepository = new MongoUpdateProductRepository()
  ) {}

  async execute(
    httpRequest: HttpRequest<UpdateProductProps>
  ): Promise<HttpResponse<Product | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return badRequest('Missing product id');
      }

      if (!body) {
        return badRequest('Missing fields');
      }

      const allowedFieldsToUpdate = ['name', 'description', 'price'];
      const somefiledIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key)
      );

      if (somefiledIsNotAllowedToUpdate) {
        return badRequest('Some received field is not allowed');
      }

      const productUpdated = await this.updateProductRepository.updateProduct(
        id,
        body
      );

      return ok<Product>(productUpdated);
    } catch {
      return internalError();
    }
  }
}
