import express, { Request, Response } from 'express';
import { AddItemToBagController } from './infra/controllers/add-item-bag/add-item-bag';
import { CreateUserController } from './infra/controllers/create-user/create-user';
import { GetUserController } from './infra/controllers/get-users/get-users';
import { UpdateUserController } from './infra/controllers/update-user/update-user';

const app = express();

app.use(express.json());

app.get('/users', async (_req, res: Response) => {
  const getUsersController = new GetUserController();
  const { statusCode, body } = await getUsersController.execute();
  return res.status(statusCode).json({ users: body });
});

app.post('/users', async (req: Request, res: Response) => {
  const createUsers = new CreateUserController();
  const { statusCode, body } = await createUsers.execute({ body: req.body });
  res.status(statusCode).json(body);
});

app.patch('/users/:id', async (req: Request, res: Response) => {
  const updateUserController = new UpdateUserController();
  const { statusCode, body } = await updateUserController.execute({
    body: req.body,
    params: req.params
  });

  return res.status(statusCode).json(body);
});

app.patch('/users/add-item-bag/:id', async (req: Request, res: Response) => {
  const addItemToBagController = new AddItemToBagController();
  const { statusCode, body } = await addItemToBagController.execute({
    body: req.body,
    params: req.params
  });

  return res.status(statusCode).json(body);
});

export default app;
