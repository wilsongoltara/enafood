import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get('/users', async (_req, res: Response) => {
  return res.status(200).json({ users: [] });
});

app.post('/users', async (req: Request, res: Response) => {
  return res.status(200).json({ data: req.body })
});

export default app;
