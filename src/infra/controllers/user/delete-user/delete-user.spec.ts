import { InMemoryDeleteUserRepository } from 'test/repositories/in-memory-user-repository';
import { expect, test } from 'vitest';
import { User } from '~/appplication/interfaces/user';
import { DeleteUserController } from './delete-user';

test('delete user', async () => {
  const inMemoryDeleteUserRepository = new InMemoryDeleteUserRepository();
  const deleteUserController = new DeleteUserController(
    inMemoryDeleteUserRepository
  );

  const user1: User = {
    id: 'user-id-1',
    name: 'user test',
    email: 'test@test.com',
    adress: 'brazil',
    bag: ['x-tudo'],
  };
  inMemoryDeleteUserRepository.users.push(user1);

  const user2: User = {
    id: 'user-id-2',
    name: 'user test',
    email: 'test@test.com',
    adress: 'germany',
    bag: ['pizza'],
  };
  inMemoryDeleteUserRepository.users.push(user2);

  const { statusCode, body } = await deleteUserController.execute({
    params: { id: user1.id },
  });

  console.log(body);

  expect(statusCode).toEqual(200);
  expect(body).toEqual(user1);
  expect(inMemoryDeleteUserRepository.users.length).toEqual(1);
});
