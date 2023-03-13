import express from 'express';
import productsRouter from './infra/routes/products';
import usersRouter from './infra/routes/users';

const app = express();

app.use(express.json());

app.use('/users', usersRouter);
app.use('/products', productsRouter);

export default app;
