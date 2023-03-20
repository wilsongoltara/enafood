import { InMemoryAddItemToBagRepository } from 'test/repositories/in-memory-user-repository';
import { expect, test } from 'vitest';
import { User } from '~/appplication/interfaces/user';
import { AddItemToBagController } from './add-item-bag';
import { AddItemToBagProps } from './protocols';

test('add item in bag', async () => {
  const inMemoryAddItemToBagRepository = new InMemoryAddItemToBagRepository();
  const addItemToBagController = new AddItemToBagController(
    inMemoryAddItemToBagRepository
  );

  const user: User = {
    id: '640e581823c41b27aa35599c',
    name: 'user test',
    email: 'test@test.com',
    adress: 'brazil',
    bag: [],
  };

  inMemoryAddItemToBagRepository.users.push(user);

  const item1: AddItemToBagProps = {
    productId: 'productId-1',
    quantity: 2,
  };

  const { statusCode, body } = await addItemToBagController.execute({
    params: { id: user.id },
    body: item1,
  });

  expect(statusCode).toEqual(200);
  expect(body.valueOf()).toEqual({ bag: [item1] });
});

test('No add item without user id', async () => {
  const inMemoryAddItemToBagRepository = new InMemoryAddItemToBagRepository();
  const addItemToBagController = new AddItemToBagController(
    inMemoryAddItemToBagRepository
  );

  const user: User = {
    id: '640e581823c41b27aa35599c',
    name: 'user test',
    email: 'test@test.com',
    adress: 'brazil',
    bag: [],
  };

  inMemoryAddItemToBagRepository.users.push(user);

  const item1: AddItemToBagProps = {
    productId: 'productId-1',
    quantity: 2,
  };

  const { statusCode, body } = await addItemToBagController.execute({
    params: {},
    body: item1,
  });

  expect(statusCode).toEqual(400);
  expect(body).toEqual('Missing user id');
});

test('No add item with invalid props', async () => {
  const inMemoryAddItemToBagRepository = new InMemoryAddItemToBagRepository();
  const addItemToBagController = new AddItemToBagController(
    inMemoryAddItemToBagRepository
  );

  const user: User = {
    id: '640e581823c41b27aa35599c',
    name: 'user test',
    email: 'test@test.com',
    adress: 'brazil',
    bag: [],
  };

  inMemoryAddItemToBagRepository.users.push(user);

  const item1 = {
    product: 'productId-1',
  };

  // props with invalid key
  const { statusCode, body } = await addItemToBagController.execute({
    params: { id: user.id },
    body: item1,
  });

  expect(statusCode).toEqual(400);
  expect(body).toEqual('Field productId is required');
});
