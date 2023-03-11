import { InMemoryGetUsersRepository } from 'test/repositories/in-memory-user-repository';
import { expect, test } from 'vitest';
import { GetUserController } from './get-users';
import { User } from '~/appplication/interfaces/user';

test('get all users', async () => {
  const inMemoryGetUsersRepository = new InMemoryGetUsersRepository();
  const getUsersController = new GetUserController(inMemoryGetUsersRepository);

  const user1: User = {
    id: 'user-id-1',
    name: 'user test',
    email: 'test@test.com',
    adress: 'brazil',
    bag: {
      items: ['x-tudo'],
    }
  }
  inMemoryGetUsersRepository.users.push(user1);

  const user2: User = {
    id: 'user-id-2',
    name: 'user test',
    email: 'test@test.com',
    adress: 'germany',
    bag: {
      items: ['pizza'],
    }
  }
  inMemoryGetUsersRepository.users.push(user2);

  const { statusCode, body } = await getUsersController.execute();
  
  expect(statusCode).toEqual(200);
  expect(body.length).toEqual(2);
  expect(body[0]).toBeTypeOf(typeof user1);
});