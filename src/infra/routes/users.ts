import { Request, Response, Router } from 'express';
import { AddItemToBagController } from '../controllers/user/add-item-bag/add-item-bag';
import { CreateUserController } from '../controllers/user/create-user/create-user';
import { DeleteUserController } from '../controllers/user/delete-user/delete-user';
import { FinalizeOrderController } from '../controllers/user/finalize-order/finalize-order';
import { GetUserController } from '../controllers/user/get-users/get-users';
import { RemoveItemToBagController } from '../controllers/user/remove-item-bag/remove-item-bag';
import { UpdateUserController } from '../controllers/user/update-user/update-user';

const usersRouter = Router();

usersRouter.get('/', async (_req: Request, res: Response) => {
  const getUsersController = new GetUserController();
  const { statusCode, body } = await getUsersController.execute();
  return res.status(statusCode).json({ users: body });
});

usersRouter.post('/', async (req: Request, res: Response) => {
  const createUsers = new CreateUserController();
  const { statusCode, body } = await createUsers.execute({ body: req.body });
  res.status(statusCode).json(body);
});

usersRouter.post('/:id/finalize-order', async (req: Request, res: Response) => {
  const finalizeOrder = new FinalizeOrderController();
  const { statusCode, body } = await finalizeOrder.execute({
    params: req.params,
    body: req.body,
  });
  res.status(statusCode).json(body);
});

usersRouter.patch('/:id', async (req: Request, res: Response) => {
  const updateUserController = new UpdateUserController();
  const { statusCode, body } = await updateUserController.execute({
    body: req.body,
    params: req.params,
  });

  return res.status(statusCode).json(body);
});

usersRouter.delete('/:id', async (req: Request, res: Response) => {
  const deleteUserController = new DeleteUserController();
  const { statusCode, body } = await deleteUserController.execute({
    params: req.params,
  });

  return res.status(statusCode).json(body);
});

usersRouter.patch('/add-item-bag/:id', async (req: Request, res: Response) => {
  const addItemToBagController = new AddItemToBagController();
  const { statusCode, body } = await addItemToBagController.execute({
    body: req.body,
    params: req.params,
  });

  return res.status(statusCode).json(body);
});

usersRouter.patch(
  '/remove-item-bag/:id',
  async (req: Request, res: Response) => {
    const removeItemToBagController = new RemoveItemToBagController();
    const { statusCode, body } = await removeItemToBagController.execute({
      body: req.body,
      params: req.params,
    });

    return res.status(statusCode).json(body);
  }
);

export default usersRouter;
