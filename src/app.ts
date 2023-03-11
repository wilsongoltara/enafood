import express, { Request, Response } from 'express';
import { CreateUserController } from './infra/controllers/create-user/create-user';
import { GetUserController } from './infra/controllers/get-users/get-users';

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

export default app;
