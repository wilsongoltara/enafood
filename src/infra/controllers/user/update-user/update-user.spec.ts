import { InMemoryUpdateUserRepository } from 'test/repositories/in-memory-user-repository';
import { expect, test } from 'vitest';
import { User } from '~/appplication/interfaces/user';
import { UpdateUserProps } from './protocols';
import { UpdateUserController } from './update-user';

test('update a user', async () => {
  const inMemoryUpdateUserRepository = new InMemoryUpdateUserRepository();
  const updateUserController = new UpdateUserController(
    inMemoryUpdateUserRepository
  );

  const user: User = {
    id: '640e581823c41b27aa35599c',
    name: 'user test',
    email: 'test@test.com',
    adress: 'brazil',
    bag: [],
  };

  inMemoryUpdateUserRepository.users.push(user);

  const update: UpdateUserProps = {
    adress: 'São Mateus, Brazil',
  };

  const { statusCode, body } = await updateUserController.execute({
    params: { id: user.id },
    body: update,
  });

  expect(statusCode).toEqual(200);
  expect(body).toContain({ adress: 'São Mateus, Brazil' });
});

test('No update user without id', async () => {
  const inMemoryUpdateUserRepository = new InMemoryUpdateUserRepository();
  const updateUserController = new UpdateUserController(
    inMemoryUpdateUserRepository
  );

  const user: User = {
    id: '640e581823c41b27aa35599c',
    name: 'user test',
    email: 'test@test.com',
    adress: 'brazil',
    bag: [],
  };

  inMemoryUpdateUserRepository.users.push(user);

  const update: UpdateUserProps = {
    adress: 'São Mateus, Brazil',
  };

  const { statusCode, body } = await updateUserController.execute({
    params: {},
    body: update,
  });

  expect(statusCode).toEqual(400);
  expect(body).toEqual('Missing user id');
});

test('No update user with invalid props', async () => {
  const inMemoryUpdateUserRepository = new InMemoryUpdateUserRepository();
  const updateUserController = new UpdateUserController(
    inMemoryUpdateUserRepository
  );

  const user: User = {
    id: '640e581823c41b27aa35599c',
    name: 'user test',
    email: 'test@test.com',
    adress: 'brazil',
    bag: [],
  };

  inMemoryUpdateUserRepository.users.push(user);

  // props with invalid key
  const update = {
    address: 'São Mateus, Brazil',
  };

  const { statusCode, body } = await updateUserController.execute({
    params: { id: user.id },
    body: update,
  });

  expect(statusCode).toEqual(400);
  expect(body).toEqual('Some received field is not allowed');
});
