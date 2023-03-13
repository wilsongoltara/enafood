import { Request, Response, Router } from 'express';
import { RegisterProductController } from '../controllers/product/register-product/resgister-product';

const productsRouter = Router();

productsRouter.post('/', async (req: Request, res: Response) => {
  const registerProductController = new RegisterProductController();
  const { statusCode, body } = await registerProductController.execute({
    params: req.params,
    body: req.body
  });

  return res.status(statusCode).json(body);
});

export default productsRouter;
