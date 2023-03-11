import express, { Request, Response } from 'express';
import { GetUserController } from './infra/controllers/get-users/get-users';

const app = express();

app.use(express.json());

app.get('/users', async (_req, res: Response) => {
  const getusersController = new GetUserController();
  const { statusCode, body } = await getusersController.execute();
  return res.status(statusCode).json({ users: body });
});

app.post('/users', async (req: Request, res: Response) => {
  return res.status(200).json({ data: req.body })
});

export default app;
