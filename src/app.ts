import express from 'express';
import usersRouter from './infra/routes/users';

const app = express();

app.use(express.json());

app.use('/users', usersRouter);

export default app;
