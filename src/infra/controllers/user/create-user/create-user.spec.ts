import { InMemoryCreateUserRepository } from 'test/repositories/in-memory-user-repository';
import { expect, test } from 'vitest';
import { CreateUserController } from './create-user';
import { CreateUserProps } from './protocols';

test('create user', async () => {
  const inMemoryCreateUserRepository = new InMemoryCreateUserRepository();
  const createUserController = new CreateUserController(
    inMemoryCreateUserRepository
  );

  const user: CreateUserProps = {
    name: 'user test',
    email: 'test@test.com',
    adress: 'brazil',
  };

  const { statusCode, body } = await createUserController.execute({
    body: user,
  });

  expect(statusCode).toEqual(201);
  expect(body).toContain({ name: 'user test' });
});

test('no create user without props', async () => {
  const inMemoryCreateUserRepository = new InMemoryCreateUserRepository();
  const createUserController = new CreateUserController(
    inMemoryCreateUserRepository
  );

  const { statusCode, body } = await createUserController.execute({});

  expect(statusCode).toEqual(400);
  expect(body).toEqual('Field name is required');
});
