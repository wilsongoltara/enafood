import { Request, Response, Router } from 'express';
import { GetProductsController } from '../controllers/product/get-products/get-products';
import { RegisterProductController } from '../controllers/product/register-product/resgister-product';
import { UpdateProductController } from '../controllers/product/update-product/update-product';

const productsRouter = Router();

productsRouter.get('/', async (req: Request, res: Response) => {
  const getProductsConroller = new GetProductsController();
  const { statusCode, body } = await getProductsConroller.execute();

  return res.status(statusCode).json(body);
});

productsRouter.post('/', async (req: Request, res: Response) => {
  const registerProductController = new RegisterProductController();
  const { statusCode, body } = await registerProductController.execute({
    params: req.params,
    body: req.body,
  });

  return res.status(statusCode).json(body);
});

productsRouter.patch('/:id',async (req: Request, res: Response) => {
  const updateProductController = new UpdateProductController();
  const { statusCode, body } = await updateProductController.execute({
    params: req.params,
    body: req.body
  });

  return res.status(statusCode).json(body);
});

export default productsRouter;
